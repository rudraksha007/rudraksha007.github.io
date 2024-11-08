document.getElementById('nav2').disabled = true;
window.addEventListener('scroll', change);
function change() {
    trans = document.getElementById('transition');
    trans.display = 'block';
    trans.style.opacity = 1;
    window.removeEventListener('scroll', change);

    setTimeout(() => {
        document.getElementById('nav2').disabled = false;
        document.getElementById('nav1').disabled = true;
        
    }, 300)
    setTimeout(() => {
        document.getElementById('name').innerHTML = this.navBar
        window.scrollTo(0, 0)
        trans.style.opacity = 0;

    }, 600);
    setTimeout(()=>{
        trans.style.display = 'none';
    }, 1200);
    return;

}

slides = document.getElementsByClassName('mySlide')
dots = document.getElementsByClassName("dot");
n = 0
setInterval(function () {
    if (n + 1 >= slides.length) show(0);
    else show(n + 1);
}, 3000);

function show(n) {
    for (let i = 0; i < slides.length; i++) {
        slides.item(i).style.transform = `translate(-${100 * n}%)`;
    }
    dots[this.n].className = 'dot';
    dots[n].className += " active";
    this.n = n
}
rulePos = 0
function switchRule(n) {
    colors = ['#b9613a', '#30536a', '#1b2f3a', '#c9724a', '#a8502a', '#d97a5a', '#4a6b8a', '#204060', '#3a5b7a', '#1a2b3a', '#2b3f5a', '#1c3a4a', '#2a4b6a'];
    icons = document.getElementsByClassName('ruleIcon');
    texts = document.getElementsByClassName('ruleText');
    if (rulePos + n < 0) {
        rulePos = icons.length - 1;
    }
    else if (rulePos + n >= icons.length) {
        rulePos = 0;
    }
    else rulePos += n;
    for (let i = 0; i < icons.length; i++) {
        if (i != rulePos) {
            icons.item(i).style.opacity = 0;
        } else icons.item(i).style.opacity = 1;
        icons.item(i).style.transform = `translate(0,${-100 * rulePos}%)`;
        texts.item(i).style.transform = `translate(0,${-100 * rulePos}%)`;
    }
    document.getElementById('rules').style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

navBar = `<div class="nav-menu">
                <ul>
                    <li><a href="/Faculty/faculty.html">FACULTY</a>
                    </li>
                    <li><a href="#">ACTIVITIES</a>
                        <div class="dropdown">
                            <div class="dropdown-content">
                                <a href="/Activities/Cultural/cultural.html">Cultural Activities</a>
                                <a href="/Activities/Social/social.html">Social Activities</a>
                                <a href="/Activities/Academic/academic.html">Academic Activities</a>
                                <a href="/Activities/Sports/sports.html">Sports Activities</a>
                                <a href="/Activities/BritishCouncilProject/council.html">British Council Projects</a>
                            </div>
                        </div>
                    </li>
                    <li><a href="/Tour/tour.html">SCHOOL TOUR</a></li>
                    <li><a href="../Alumni/alumni.html">Alumni</a></li>
                    <li><a href="/Gallery/gallery.html">GALLERY</a></li>
                    <li><a href="#">ACADEMICS</a>
                        <div class="dropdown">
                            <div class="dropdown-content">
                                <a href="../Circulars/circular.html">Circulars</a>
                                <a href="../Admission/admission.html">Admission Criteria</a>
                                <a href="#">Examinations</a>
                            </div>
                        </div>
                    </li>
                    <li><a href="../About/about.html">ABOUT US</a></li>
                </ul>
            </div>`