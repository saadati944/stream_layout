from flask import Flask, url_for, redirect, request

commands=[]

#create flask application
app = Flask(__name__)

#serve index.html
@app.route('/')
def index():
    return redirect("static/index.html")

@app.route('/getcommand')
def getcommand():
    if len(commands)==0:
        return '{"cmd":"null"}'
    return commands.pop(0)

@app.route('/command')
def command():
    return redirect("static/command.html")

@app.route('/addcommand', methods=['POST'])
def addcommand():
    data=request.form.get('json')
    print(data)
    commands.append(data)
    return redirect('/command')
app.run()