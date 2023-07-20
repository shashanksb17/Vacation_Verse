from flask import Flask, request, jsonify
import mysql.connector
import bcrypt
import datetime

app = Flask(__name__)

# Connect to the MySQL database
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='shashank',
    database='hosts'
)

# Create a cursor object to interact with the database
cursor = db.cursor()

# Host Schema
def create_host_table():
    query = """
    CREATE TABLE IF NOT EXISTS hosts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        host_status BOOLEAN DEFAULT TRUE,
        location VARCHAR(255),
        profile_picture VARCHAR(255),
        about TEXT,
        hosting_since DATE
    )
    """
    cursor.execute(query)
    db.commit()

@app.route('/host/signup', methods=['POST'])
def create_host():
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']
    location = data.get('location')
    profile_picture = data.get('profile_picture')
    about = data.get('about')
    hosting_since = data.get('hosting_since')

    if not location:
        location = "Unknown Location"

    if not hosting_since:
        # Set the hosting_since date to the current date when the host signs up
        hosting_since = datetime.date.today()

    create_host_table()  # Create the 'hosts' table if not exists

    try:
        # Hash the password before storing it in the database
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        query = "INSERT INTO hosts (name, email, password_hash, location, profile_picture, about, hosting_since) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (name, email, password_hash, location, profile_picture, about, hosting_since)
        cursor.execute(query, values)
        db.commit()

        return jsonify({'message': 'Host created', 'host_id': cursor.lastrowid}), 201
    except mysql.connector.Error as err:
        return jsonify({'message': 'An error occurred while creating the host', 'error': str(err)}), 500

@app.route('/host/login', methods=['POST'])
def host_login():
    data = request.json
    email = data['email']
    password = data['password']

    query = "SELECT id, password_hash FROM hosts WHERE email = %s AND host_status = TRUE"
    values = (email,)
    cursor.execute(query, values)
    host = cursor.fetchone()

    if host and bcrypt.checkpw(password.encode('utf-8'), host[1].encode('utf-8')):
        return jsonify({'message': 'Login successful', 'host_id': host[0]}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# Host CRUD
@app.route('/hosts', methods=['GET'])
def get_all_hosts():
    query = "SELECT id, name, email, location, profile_picture, about, hosting_since FROM hosts WHERE host_status = TRUE"
    cursor.execute(query)
    hosts = []
    for host_data in cursor.fetchall():
        host = {
            'id': host_data[0],
            'name': host_data[1],
            'email': host_data[2],
            'location': host_data[3],
            'profile_picture': host_data[4],
            'about': host_data[5],
            'hosting_since': host_data[6].isoformat() if host_data[6] else None
        }
        hosts.append(host)
    return jsonify(hosts), 200

@app.route('/hosts/<int:host_id>', methods=['GET'])
def get_host(host_id):
    query = "SELECT id, name, email, location, profile_picture, about, hosting_since FROM hosts WHERE id = %s AND host_status = TRUE"
    values = (host_id,)
    cursor.execute(query, values)
    host_data = cursor.fetchone()
    if host_data:
        host = {
            'id': host_data[0],
            'name': host_data[1],
            'email': host_data[2],
            'location': host_data[3],
            'profile_picture': host_data[4],
            'about': host_data[5],
            'hosting_since': host_data[6].isoformat() if host_data[6] else None
        }
        return jsonify(host), 200
    return jsonify({'message': 'Host not found'}), 404

@app.route('/hosts/<int:host_id>', methods=['PUT'])
def update_host(host_id):
    data = request.json
    name = data.get('name')
    email = data.get('email')
    location = data.get('location')
    profile_picture = data.get('profile_picture')
    about = data.get('about')
    hosting_since = data.get('hosting_since')

    if not any([name, email, location, profile_picture, about, hosting_since]):
        return jsonify({'message': 'No updates provided'}), 400

    query = "UPDATE hosts SET name = %s, email = %s, location = %s, profile_picture = %s, about = %s, hosting_since = %s WHERE id = %s AND host_status = TRUE"
    values = (name, email, location, profile_picture, about, hosting_since, host_id)
    cursor.execute(query, values)
    db.commit()

    if cursor.rowcount > 0:
        return jsonify({'message': 'Host updated'}), 200
    return jsonify({'message': 'Host not found'}), 404

@app.route('/hosts/<int:host_id>', methods=['DELETE'])
def delete_host(host_id):
    query = "UPDATE hosts SET host_status = FALSE WHERE id = %s"
    values = (host_id,)
    cursor.execute(query, values)
    db.commit()

    if cursor.rowcount > 0:
        return jsonify({'message': 'Host deleted'}), 200
    return jsonify({'message': 'Host not found'}), 404




if __name__ == '__main__':
    app.run(debug=True)