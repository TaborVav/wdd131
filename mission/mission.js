let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    console.log(current);
    if (current == 'dark') {
        document.body.className = 'dark';
        logo.setAttribute('src', 'byui-logo_white.png');
    } else if (current == 'light') {
        document.body.classList.remove('dark');
        logo.setAttribute('src', 'byuilogo.webp');

    }
}