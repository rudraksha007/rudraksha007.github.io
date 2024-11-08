load();
let json;
function load() {
    fetch('./faculty.json').then((res) => {
        res.json().then((data) => {
            json = data;
            Object.keys(data).forEach((x) => {
                let deps = document.getElementById('deps');
                deps.innerHTML += `<div class="dep" onclick='openPopup("${x}")'>
                                <img src="images/${data[x].icon}" alt="">
                                <h2>${x}</h2>
                                <txt>${Object.keys(data[x].faculties).length} Faculties</txt>
                                </div>`;
            })
        });
    });
}
function closePopup() {
    document.getElementById('popup').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('popup').style.zIndex = -10;
    }, 1000);
}

function openPopup(dep) {
    let parent = document.getElementById('popupCont');
    parent.innerHTML = `<h1>${dep}</h1><img src="../statics/cross.png" alt="" height="50px" onclick="closePopup()">`
    let facs = document.createElement('div');
    facs.id = 'facs';
    parent.appendChild(facs);
    facs.innerHTML = `<div class="heading">S.No.</div>
                    <div class="heading">Name</div>
                    <div class="heading">Designation</div>
                    <div class="heading">Qualifications</div>`;
    i = 1;
    for (const fac in json[dep].faculties) {
        facs.innerHTML += `<div class='entry'>${i}</div>
                        <div class='entry'>${fac}</div>
                        <div class='entry'>${json[dep].faculties[fac].designation}</div>
                        <div class='entry'>${json[dep].faculties[fac].qualification}</div>`;
        i++;
    }
    document.getElementById('popup').style.zIndex = 10;
    document.getElementById('popup').style.opacity = 1;
}

