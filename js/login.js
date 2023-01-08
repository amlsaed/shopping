var login_name = document.getElementById("usrname");
var login_pass = document.getElementById("password");
var login_btn = document.getElementById("login");


var check_name = localStorage.getItem("username");

var check_email = localStorage.getItem("useremail");
var check_pass = localStorage.getItem("userpass");
console.log(check_name)
console.log(check_pass)
login_btn.addEventListener("click",login);

function login(e){
    e.preventDefault();
    if(login_name.value == "" || login_pass.value == ""){
        alert("empty")
    }else{
        if(check_name && check_name==="aml"&& check_pass && check_pass==="123"){
          setTimeout(()=>{
            window.location = "./index.html"
          },1500)
        }else{
            alert("ff");
        }
    }
}


