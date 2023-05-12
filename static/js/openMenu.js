const botaoMenu = document.querySelector('#botaoMenu')
const nav = document.querySelector("#menu");
let forOpen=true
botaoMenu.addEventListener("click", function() {
    if (open){
        nav.style.display = "flex"; 
        nav.style.height="auto"
        open=false
    }else{
        nav.style.height="0px"
        nav.style.display = "none"; 
        open=true
    }
  });