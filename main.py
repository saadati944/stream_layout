from flask import Flask, url_for, redirect, request
import commander



#create flask application
app = Flask(__name__)

#serve index.html
@app.route('/')
def index():
    return redirect("static/index.html")

@app.route('/getcommand')
def getcommand():
    if len(commander.commands)==0:
        return '{"cmd":"null"}'
    return commander.commands.pop(0)

@app.route('/initcommands')
def initcommands():
    if len(commander.initcommands)==0:
        commander.loadinit()
    if len(commander.initcommands)==0:
        return '{"cmd":"null"}'
    return commander.initcommands.pop(0)


@app.route('/command')
def command():
    return redirect("static/command.html")

@app.route('/addcommand', methods=['POST'])
def addcommand():
    data=request.form.get('json')
    commander.commands.append(data)
    return redirect('/command')
app.run()