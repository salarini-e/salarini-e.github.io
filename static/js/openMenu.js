const botaoMenu = document.querySelector('#botaoMenu');
const nav = document.querySelector("#menu");
let isOpen = false;

botaoMenu.addEventListener("click", function() {
    if (!isOpen) {
        nav.classList.add('show');
        isOpen = true;
    } else {
        nav.classList.remove('show');
        isOpen = false;
    }
});
    