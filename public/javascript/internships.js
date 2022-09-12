
    var list = document.querySelectorAll('.type li button')
    var artList = document.querySelectorAll('#internships, #part-time, #full-time, #quick-money')

    list.forEach(function (e) {
        e.addEventListener('click', function () {
            list.forEach(function (event) {
                if (event.classList.contains('active')) {
                    event.classList.remove('active')
                }
                e.classList.add('active')
                if (e.classList.contains('internships')) {
                    articleRemove()
                    document.querySelector('#internships').classList.remove('hide')

                } else if (e.classList.contains('part-time')) {
                    articleRemove()
                    document.querySelector('#part-time').classList.remove('hide')

                } else if (e.classList.contains('full-time')) {
                    articleRemove()
                    document.querySelector('#full-time').classList.remove('hide')
                    
                } else if (e.classList.contains('quick-money')) {
                    articleRemove()
                    document.querySelector('#quick-money').classList.remove('hide')
                    
                }
            })
        })
    })

    function articleRemove() {
        artList.forEach(function (e) {
            e.classList.add('hide')
        })
    }