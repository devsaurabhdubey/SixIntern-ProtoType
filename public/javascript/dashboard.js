//  Js for Side nav
l = document.querySelectorAll('nav a');
for (var i = 0; i < l.length; i++) {
    l[i].addEventListener('click', function (e) {
        if (this.innerText == 'Home') {
            // console.log(this.classList)
            removeActive()
            this.classList.add('active')
            toggleHide(this.innerText)
        }
        else if (this.innerText.trim() == 'Applied Jobs') {
            // console.log(this.classList)
            removeActive()
            this.classList.add('active')
            toggleHide(this.innerText)
        }

        else if (this.innerText == 'Selected Jobs') {
            // console.log(this.classList)
            removeActive()
            this.classList.add('active')
            toggleHide(this.innerText)
        }

        else if (this.innerText == 'Profile') {
            // console.log(this.classList)
            removeActive()
            this.classList.add('active')
            toggleHide(this.innerText)
        }
    })
}

function removeActive() {
    for (var i = 0; i <= l.length; i++) {
        if (l[i].classList.length > 0) {
            l[i].classList.remove('active')
            break;
        }
    }
}

function toggleHide(element) {
    var toshow = document.querySelector('#' + element.replace(' ', '-').toLowerCase().trim());
    var allSections = document.querySelectorAll('#home, #applied-jobs, #selected-jobs, #bookmarked-jobs, #profile');
    for (var i = 0; i < allSections.length; i++) {
        allSections[i].classList.add('hide')
    }

    toshow.classList.remove('hide');
}
// End for js Sidenav

// Intern Nav
var internLen = document.querySelectorAll('.intern-nav a');
for (var i = 0; i < internLen.length; i++) {
    internLen[i].addEventListener('click', function () {
        if (this.innerText.trim() == 'Internships') {
            internshipsRemoveActive()
            this.classList.add('job-active')
            internshipsToggleHide(this.innerText)
        }

        else if (this.innerText.trim() == 'Internships') {
            internshipsRemoveActive()
            this.classList.add('job-active')
            internshipsToggleHide(this.innerText)
        }

        else if (this.innerText.trim() == 'Part Time Jobs') {
            internshipsRemoveActive()
            this.classList.add('job-active')
            internshipsToggleHide(this.innerText)
        }

        else if (this.innerText.trim() == 'Full Time Jobs') {
            internshipsRemoveActive()
            this.classList.add('job-active')
            internshipsToggleHide(this.innerText)
        }

        else if (this.innerText.trim() == 'Quick Money') {
            internshipsRemoveActive()
            this.classList.add('job-active')
            internshipsToggleHide(this.innerText)
        }
    })

}

function internshipsRemoveActive() {
    for (var i = 0; i <= internLen.length; i++) {
        if (internLen[i].classList.length > 0) {
            internLen[i].classList.remove('job-active')
            break;
        }
    }
}

function internshipsToggleHide(element) {
    var toshow = document.querySelector('#' + element.replace(/\s+/g, '-').toLowerCase().trim());
    var allSections = document.querySelectorAll('#internships, #part-time-jobs, #full-time-jobs, #quick-money');
    for (var i = 0; i < allSections.length; i++) {
        allSections[i].classList.add('intern-hide')
    }

    toshow.classList.remove('intern-hide');
}


