from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/Registration', methods=['POST'])
def Registration():
    requestData = request.get_json()
    login = requestData['login']
    password = requestData['password']
    f = open("/opt/render/project/src/Users.txt", "r")
    for line in f:
        l, p = line.split(' ')
        if l == str(login):
            f.close()
            return "0"
    f.close()
    f = open("/opt/render/project/src/Users.txt", "a")
    f.write(str(login) + " " + str(password) + "\n")
    f.close()
    return "1"


@app.route('/Autorisation', methods=['POST'])
def Autorisation():
    requestData = request.get_json()
    login = requestData['login']
    password = requestData['password']
    f = open("/opt/render/project/src/Users.txt", "r")
    for line in f:
        l, p = line.split(' ')
        if l == str(login) and p[:len(p)-1] == str(password):
            f.close()
            return "1"
    f.close()
    return "0"


@app.route('/SendMessage', methods=['POST'])
def SendMessage():
    requestData = request.get_json()
    login = requestData['login']
    text = requestData['text']
    f = open("/opt/render/project/src/Chat.txt", "a")
    f.write(str(login) + " says: " + str(text) + "\n")
    f.close()
    return "1"


@app.route('/UpdateChat')
def UpdateChat():
    f = open("/opt/render/project/src/Chat.txt", "r")
    return f.read()


@app.route('/')
def index():
    return render_template('index.html')
