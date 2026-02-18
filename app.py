from flask import Flask, render_template, request
import json
app = Flask(__name__)
dir_path = "/opt/render/project/src/"

@app.route('/Registration', methods=['POST'])
def Registration():
    requestData = request.get_json()
    login = requestData['login']
    password = requestData['password']
    with open(dir_path+"saves.json", "r") as f:
        data = json.load(f)
        for p in data["Users"]:
            if p["login"] == str(login):
                return "0"
    with open(dir_path+"saves.json", "w") as f:
        data["Users"].append({
            "login": str(login),
            "password": str(password)
        })
        json.dump(data, f, ensure_ascii=False, indent=2)
    return "1"


@app.route('/Autorisation', methods=['POST'])
def Autorisation():
    requestData = request.get_json()
    login = requestData['login']
    password = requestData['password']
    with open(dir_path+"saves.json", "r") as f:
        data = json.load(f)
        for user in data["Users"]:
            if user["login"] == str(login) and user["password"] == str(password):
                return "1"
    return "0"


@app.route('/SendMessage', methods=['POST'])
def SendMessage():
    requestData = request.get_json()
    login = requestData['login']
    text = requestData['text']
    with open(dir_path+"saves.json", "r") as f:
        data = json.load(f)
    with open(dir_path+"saves.json", "w") as f:
        data["Chats"][0]["messages"].append(str(login) + " says: " + str(text))
        json.dump(data, f, ensure_ascii=False, indent=2)
        return "1"


@app.route('/UpdateChat')
def UpdateChat():
    with open(dir_path+"saves.json", "r") as f:
        data = json.load(f)
        total = ""
        for i in data["Chats"][0]["messages"]:
            total += i+"\n"
        return total


@app.route('/')
def index():
    return render_template('index.html')

app.run()