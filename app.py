from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto permite solicitudes desde cualquier origen

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
    contraseña = generate_password_hash(datos['contraseña'])  # Encriptar la contraseña

    cursor = db.cursor()
    try:
        cursor.execute(
            "INSERT INTO organizaciones (nombre, correo, contraseña) VALUES (%s, %s, %s)",
            (nombre, correo, contraseña)
        )
        db.commit()
        return jsonify({"mensaje": "Organización registrada exitosamente"}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")  # Registrar el error en la consola
        return jsonify({"error": str(err)}), 400
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(debug=True)
