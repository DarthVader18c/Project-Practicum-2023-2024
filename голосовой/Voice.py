from flask import Flask, render_template
import subprocess

app = Flask(name)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/open_explorer')
def open_explorer():
    try:
        subprocess.Popen(["explorer"])
        return 'Проводник открыт.'
    except Exception as e:
        return f'Ошибка при открытии проводника: {e}'

if name == 'main':
    app.run(debug=True)