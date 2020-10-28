from flask import Flask, url_for, redirect

#create flask application
app = Flask(__name__)

#serve index.html
@app.route('/')
def index():
    return redirect("static/index.html")

@app.route('/command')
def command():
    return '{"cmd":"hello"}'

app.run()