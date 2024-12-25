function load(parent, i) {
    imgLoader = new Promise(function (resolve, reject) {
        const img = new Image();
        if (document.getElementById(parent.id + "-act") == null) {
            child = document.createElement('div');
            child.id = parent.id + "-act";
            child.style.position = 'relative';
            parent.appendChild(child);
        }
        img.addEventListener('error', () => {
            reject()
        });
        img.addEventListener('load', () => {
            resolve(img);
        });
        img.classList.add('img', `${parent.id}`);
        img.src = `/Tour/pics/${parent.id}/${i}.jpg`;
    }).then((img) => {
        document.getElementById(parent.id + '-act').appendChild(img);
        load(parent, i + 1);
    }, () => {
        console.log(`All image in ${parent.id} were loaded`);
        p = document.getElementById(parent.id+'-act');
        if (p.clientWidth < p.scrollWidth) {
            left = new Image(50);
            left.src = '../statics/arrow.png';
            left.classList.add('rule-control', 'left');
            left.addEventListener('click', ()=>{changeView(parent, 1)});
            p.appendChild(left);

            right = new Image(50);
            right.src = '../statics/arrow.png';
            right.classList.add('rule-control', 'right');
            right.id = 'right';
            right.addEventListener('click', ()=>{changeView(parent, -1)})
            p.appendChild(right);
        }
    });
}

divs = document.getElementsByClassName('collection');
for (let i = 0; i < divs.length; i++) {
    load(divs.item(i), 1);
}
pos = {}
function changeView(parent, dir){
    console.log('b')
    imgs = document.getElementsByClassName(parent.id);
    if (pos[parent.id]==null){
        pos[parent.id] = 0;
    }
    x = imgs.item(imgs.length-1).getBoundingClientRect();
    if(dir==-1 && x.left+x.width<=parent.clientWidth){
        return;
    }
    if(pos[parent.id]+dir<=0 && pos[parent.id]+dir> -imgs.length){
        pos[parent.id]+=dir;
        for (let i = 0; i < imgs.length; i++) {
            imgs.item(i).style.transform = `translateX(${100*pos[parent.id]}%)`
        }
    }
}