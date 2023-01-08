var user_name = document.getElementById("name");
var user_email = document.getElementById("email");
var user_pass = document.getElementById("password");
var registerBtn = document.getElementById("signUp");



function signUp(e){
    e.preventDefault();
  if(user_name.value ===""|| user_email.value == ""||user_pass.value == ""){
    alert("required");
  }else{
    localStorage.setItem('username',user_name.value)
    localStorage.setItem('useremail',user_email.value)
    localStorage.setItem('userpass',user_pass.value)

    setTimeout(()=>{
        window.location = "../login.html";
    },1500)
  }
}


registerBtn.addEventListener("click",signUp);
