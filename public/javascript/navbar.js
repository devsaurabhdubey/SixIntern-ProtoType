var menulist = document.querySelectorAll('.navbar-nav li')
var url = document.URL
if (url.includes('home')) {
    removeAll();
    menulist[0].querySelector('a').classList.add('active');
} else if (url.includes('internships')) {
    removeAll();
    menulist[1].querySelector('a').classList.add('active');
} else if (url.includes('campus-ambassador')) {
    removeAll();
    menulist[2].querySelector('a').classList.add('active');
}

function removeAll() {
    menulist.forEach(function (e) {
        e.querySelector('a').classList.remove('active')
    })
}