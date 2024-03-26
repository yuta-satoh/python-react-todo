from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

# 仮のTodoリストを作成します
todos = ["test0","test1","test2"]

# Todoリストの画面を表示します。
@app.route('/')
def index():
    return jsonify(todos)

# 追加されたTodoをTodoリストに加えます。
@app.route('/add', methods=['POST'])
def add_todo():
    todo = request.form.get('todo')
    todos.append(todo)
    return jsonify(todos)

# Todoの編集画面を表示します。
@app.route('/edit/<int:todo_id>')
def edit_todo(todo_id):
    # Todoがあるときは編集画面に、そうではないときはTodoリストへ画面遷移します。
    return jsonify(todos[todo_id - 1])

# Todoが更新されたときの処理です。
@app.route('/update/<int:todo_id>', methods=['POST'])
def update_todo(todo_id):
    # 変更されたTodoがある場合はTodoリストに追加する。
    if 1 <= todo_id <= len(todos):
        todo = request.form.get('todo')
        todos[todo_id - 1] = todo
        return jsonify({"success": True, "message": "Todo updated successfully."})
    else:
        return jsonify({"success": False, "message": "Todo not found."}), 404

# Todoが削除されたときの処理です。
@app.route('/delete/<int:todo_id>')
def delete_todo(todo_id):
    # Todoがあるときは削除する。
    if 1 <= todo_id <= len(todos):
        del todos[todo_id - 1]
    return jsonify(todos)

# アプリを実行する処理です。
if __name__ == '__main__':
    app.run(debug=True)
