load();

function load(){
    fetch('./criteria.json').then((res)=>{
        res.json().then((data)=>{
            var i = 1;
            Object.keys(data).forEach((x)=>{
                
                a = document.createElement('div');//Grade
                a.innerHTML = x;
                document.getElementById('dataTable').appendChild(a)

                a = document.createElement('div');//Min age
                a.innerHTML = data[x][0];
                document.getElementById('dataTable').appendChild(a)

                a = document.createElement('div');//Docs
                var j = 1;
                data[x][1].forEach(e => {
                    b = document.createElement('div');
                    b.innerHTML = `${j}. ${e}`;
                    b.style.paddingLeft = '30px'
                    a.appendChild(b);
                    j++;
                });
                a.style.flexDirection = 'column';
                a.style.alignItems = 'start';
                document.getElementById('dataTable').appendChild(a)
                a = document.createElement('div');//Procedure
                a.innerHTML = data[x][2]
                document.getElementById('dataTable').appendChild(a)
                i++;
            })
        });
    });
}