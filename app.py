from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345",
    database="HelpBridge"
)

@app.route('/organizaciones', methods=['POST'])
def registrar_organizacion():
    datos = request.json
    nombre = datos['nombre']
    correo = datos['correo']
    contraseña = generate_password_hash(datos['contraseña']) 
    cursor = db.cursor()
    try:
        cursor.execute(
            "INSERT INTO organizaciones (nombre, correo, contraseña) VALUES (%s, %s, %s)",
            (nombre, correo, contraseña)
        )
        db.commit()
        return jsonify({"mensaje": "Organización registrada exitosamente"}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")  
        return jsonify({"error": str(err)}), 400
    finally:
        cursor.close()


@app.route('/login', methods=['POST'])
def login():
    datos = request.json
    correo = datos['correo']
    contraseña = datos['contraseña']

    cursor = db.cursor(dictionary=True) 
    try:
        cursor.execute("SELECT * FROM organizaciones WHERE correo = %s", (correo,))
        organizacion = cursor.fetchone()
        if organizacion and check_password_hash(organizacion['contraseña'], contraseña):
            return jsonify({"mensaje": "Login exitoso", "id": organizacion['id'], "nombre": organizacion['nombre']}), 200
        else:
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Error interno del servidor"}), 500
    finally:
        cursor.close()

@app.route('/recaudaciones', methods=['POST'])
def registrar_recaudacion():
    datos = request.json
    nombre = datos.get('nombre')
    descripcion = datos.get('descripcion')
    ubicacion = datos.get('ubicacion')
    monto = datos.get('monto')

    if not all([nombre, descripcion, ubicacion, monto]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    cursor = db.cursor()
    try:
        cursor.execute(
            "INSERT INTO recaudaciones (nombre, descripcion, ubicacion, monto) VALUES (%s, %s, %s, %s)",
            (nombre, descripcion, ubicacion, monto)
        )
        db.commit()
        return jsonify({"mensaje": "Recaudación registrada exitosamente"}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Error al registrar la recaudación"}), 500
    finally:
        cursor.close()

@app.route('/organizaciones', methods=['GET'])
def obtener_organizaciones():
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT id, nombre, descripcion, monto AS recaudado, ubicacion AS pais FROM recaudaciones")
        organizaciones = cursor.fetchall()
        return jsonify(organizaciones), 200
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Error al obtener las recaudaciones"}), 500
    finally:
        cursor.close()

@app.route('/donar', methods=['POST'])
def guardar_donacion():
    datos = request.json
    recaudacion_id = datos.get('recaudacion_id')
    monto = datos.get('monto')
    medio_pago = datos.get('medio_pago')

    if not all([recaudacion_id, monto, medio_pago]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    cursor = db.cursor()
    try:
        # Insertar la donación en la tabla `donaciones`
        cursor.execute(
            "INSERT INTO donaciones (recaudacion_id, monto, medio_pago) VALUES (%s, %s, %s)",
            (recaudacion_id, monto, medio_pago)
        )

        # Actualizar el monto recaudado en la tabla `recaudaciones`
        cursor.execute(
            "UPDATE recaudaciones SET monto = monto + %s WHERE id = %s",
            (monto, recaudacion_id)
        )

        db.commit()
        return jsonify({"mensaje": "Donación guardada exitosamente"}), 200
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Error al guardar la donación"}), 500
    finally:
        cursor.close()


if __name__ == '__main__':
    app.run(debug=True)
