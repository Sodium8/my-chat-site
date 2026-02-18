let user = {
    login: null,
    password:null,
    auto:0
}
let message = {
    login:null,
    text:null
}

async function Autorisation() {
    let form = document.forms.autorisationform;
    user.login = form.elements.login.value;
    user.password = form.elements.password.value;
    if (!user.login.includes(" ") && !user.password.includes(" ")){
        let response = await fetch('/Autorisation', {method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(user)});
    let answer = await response.text();
    if (answer === "1"){
        user.auto = 1;
        alert("Logging completed!");
    }else{
        user.auto = 0;
        alert("Not correct login or password!");
    }
    }else{
        alert("You cannot use spaces!!!");
    }
}

async function Registration() {
    let form = document.forms.autorisationform;
    user.login = form.elements.login.value;
    user.password = form.elements.password.value;
    if (!user.login.includes(" ") && !user.password.includes(" ")){
        let response = await fetch('/Registration', {method: 'POST', headers: {
        'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(user)});
    let answer = await response.text();
    if (answer === "1"){
        user.auto = 1;
        alert("Registration completed");
    }else{
        user.auto = 0;
        alert("This login has already been used!");
    }
    }else{
        alert("You cannot use spaces!!!");
    }
}

async function SendMessage() {
    let chatform = document.forms.chatform;
    message.login = user.login;
    message.text = chatform.elements.fieldmessage.value;
    let response = await fetch('/SendMessage', {method:'POST', headers:{
        'Content-Type':'application/json;charset=utf8'
    }, body:
JSON.stringify(message)});
chatform.elements.fieldmessage.value="";
    
}

async function UpdateChat() {
    if(user.auto===1){
        let chatform = document.forms.chatform;
        let response = await fetch('/UpdateChat');
        chatform.elements.fieldchat.value = await response.text();
    }
    setTimeout(UpdateChat, 500);
}

async function checkauto() {
    let chatform = document.forms.chatform;
    let autoform = document.forms.autorisationform;
    let log = autoform.elements.login.value;
    let password = autoform.elements.password.value;
    let mess = chatform.elements.fieldmessage.value;
    if (log!== "" && password !== ""){
        autoform.elements.btnauto.disabled = false;
        autoform.elements.btnreg.disabled = false;}else{
        autoform.elements.btnauto.disabled = true;
        autoform.elements.btnreg.disabled = true;
    }
    if (user.auto === 0){
        autoform.elements.status.placeholder = "Вы не авторизованы!";
        chatform.elements.btnsend.disabled = true;
        chatform.elements.fieldmessage.disabled = true;
        chatform.elements.fieldchat.value = ""
    }
    if (user.auto === 1){
        autoform.elements.status.placeholder = "helllo ${user.login}";
        chatform.elements.fieldmessage.disabled = false;
        if (mess !== ""){
            chatform.elements.btnsend.disabled = false;
        }
        else{
            chatform.elements.btnsend.disabled= true;
        }
    }
    setTimeout(checkauto, 100)
}

document.addEventListener('keydown', function(event) {
    if (event.key == "Enter"){
        let chatform = document.forms.chatform;
        if (chatform.elements.fieldmessage.value !== "" && user.auto === 1){
            SendMessage()
            let textarea = chatform.elements.fieldchat
            textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
        }
  
    }
  });