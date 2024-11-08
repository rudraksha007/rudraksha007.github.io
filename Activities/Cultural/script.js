n = 1
interval = 0;
document.getElementById('event').addEventListener('change', () => {
    document.getElementById('slideshow-container').innerHTML = '';
    document.getElementById('note').innerHTML = '';
    if (interval != 0) clearInterval(interval);
    n = 0;
    document.getElementById('slideshow-container').style.justifyContent = 'left';
    load(document.getElementById('event').value, 1);
})
function load(event, i) {
    imgLoader = new Promise(function (resolve, reject) {
        const img = new Image();
        img.addEventListener('error', () => {
            reject()
        });
        img.addEventListener('load', () => {
            resolve(img);
        });
        img.classList.add('mySlideImg');
        img.src = `/Activities/Cultural/pics/${event}/${i}.jpg`;
    }).then((img) => {
        const d = document.createElement('div');
        d.classList.add('mySlide');
        d.appendChild(img);
        document.getElementById('slideshow-container').appendChild(d);
        load(event, i + 1);
    }, () => {
        console.log(`All image in ${event} were loaded`);
        fetch(`/Activities/Cultural/pics/${event}/note.txt`)
            .then((response) => {
                if (response.status != 404) {
                    response.text().then((text) => {
                        h3 = document.createElement('h3');
                        h3.innerText = text;
                        document.getElementById('note').appendChild(h3);
                    });
                }
            });
        p = document.getElementById('slideshow-container');
        if (p.clientWidth < p.scrollWidth) {
            left = new Image(50);
            left.src = '../../statics/arrow.png';
            left.classList.add('rule-control');
            left.style.rotate = '-90deg';
            left.addEventListener('click', () => { show(n-1) });
            p.appendChild(left);

            right = new Image(50);
            right.src = '../../statics/arrow.png';
            right.classList.add('rule-control');
            right.style.rotate = '90deg';
            right.style.right = '0'
            right.addEventListener('click', () => { show(n+ 1) })
            p.appendChild(right);
            startShow();
        }
        else{
            p.style.justifyContent = 'center';
        }
    });
}

slides = document.getElementsByClassName('mySlide')
function startShow() {
    interval = setInterval(function () {
        show(n + 1);
    }, 3000);
}
function show(n1) {
    if (n1>= slides.length) n1 = 1;
    else if (n1<1) n1 = slides.length-1;
    off = 0
    for (let j = 0; j < n; j++) {
        off += slides.item(j).clientWidth;
    }
    console.log(`n = ${n}, n1 = ${n1}, off = ${off}`);
    for (let i = 0; i < slides.length; i++) {
        if (n1 == 0) {
            slides.item(i).style.transform = `translate(0px)`;
        }
        else {
            slides.item(i).style.transform = `translate(-${off}px)`;
        }
    }
    this.n = n1
}