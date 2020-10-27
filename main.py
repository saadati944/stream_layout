from flask import Flask

#create flask application
app = Flask(__name__)

#serve index.html
@app.route('/')
def hello():
    return 'Hello, World!'

app.run()