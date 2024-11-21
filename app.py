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

if __name__ == '__main__':
    app.run(debug=True)
