from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit
import sqlite3
import os
if os.path.exists("tasks.db"):
    print("DB Already Exists.")
else:
    print("DB does not exist, creating DB.")
    conn = sqlite3.connect("tasks.db")
    conn.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'todo',
        name TEXT NOT NULL,
        description TEXT
    )
    """)
    conn.commit()
    conn.close()

conn = sqlite3.connect("tasks.db")
conn.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'todo',
        name TEXT NOT NULL,
        description TEXT
    )
""")
conn.commit()

conn.close()




app = Flask(__name__, static_folder="static")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template('index.html')


@app.route('/api/tasks/archived', methods=['GET'])
def get_archived():
    conn = sqlite3.connect("tasks.db")
    rows = conn.execute("SELECT * FROM tasks WHERE status = 'archived'").fetchall()
    conn.close()
    return jsonify(rows)



@app.route('/api/addtasks', methods=['POST'])
def add_task():
    data = request.json
    category = data.get('category')
    status = data.get('status')
    name = data.get('name')
    description = data.get('description')

    conn = sqlite3.connect("tasks.db")
    conn.execute("INSERT INTO tasks (category, status, name, description) VALUES (?, ?, ?, ?)",
                 (category, status, name, description))
    conn.commit()
    conn.close()

    socketio.emit('task_updated', {'category': category})
    return jsonify({"success": True})



@app.route('/api/tasks/archive/<int:task_id>', methods=['PUT'])
def archive_task(task_id):
    conn = sqlite3.connect("tasks.db")
    category = conn.execute("SELECT category FROM tasks WHERE id = ?", (task_id,)).fetchone()[0]
    conn.execute("UPDATE tasks SET status = ? WHERE id = ?", ("archived", task_id))
    conn.commit()
    conn.close()
    
    socketio.emit('task_updated', {'category': category})
    socketio.emit('archive_updated')
    return jsonify({"success": True})



@app.route('/api/tasks/restore/<int:task_id>', methods=['PUT'])
def restore_task(task_id):
    conn = sqlite3.connect("tasks.db")
    category = conn.execute("SELECT category FROM tasks WHERE id = ?", (task_id,)).fetchone()[0]
    conn.execute("UPDATE tasks SET status = ? WHERE id = ?", ("done", task_id))
    conn.commit()
    conn.close()

    socketio.emit('task_updated', {'category': category})
    socketio.emit('archive_updated')
    return jsonify({"success": True})


@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = sqlite3.connect("tasks.db")
    category_result = conn.execute("SELECT category FROM tasks WHERE id = ?", (task_id,)).fetchone()
    conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    
    if category_result:
        category = category_result[0]
        socketio.emit('task_deleted', {'task_id': task_id, 'category': category})
    
    return jsonify({"success": True})


@app.route('/api/tasks/<category>')
def gettasks(category):

    conn = sqlite3.connect("tasks.db")
    rows = conn.execute("SELECT * FROM tasks WHERE category = ?", (category,)).fetchall()
    conn.close()
    return jsonify(rows)


@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    status = data.get('status')
    
    conn = sqlite3.connect("tasks.db")
    conn.execute("UPDATE tasks SET status = ? WHERE id = ?", (status, task_id))
    conn.commit()
    category = conn.execute("SELECT category FROM tasks WHERE id = ?", (task_id,)).fetchone()[0]
    conn.close()

    socketio.emit('task_updated', {'task_id': task_id, 'status': status, 'category': category})
    
    return jsonify({"success": True})



if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
