load();

function load(){
    fetch('./circulars.json').then((res)=>{
        res.json().then((data)=>{
            var i = 1;
            Object.keys(data).forEach((x)=>{
                
                a = document.createElement('div');
                a.innerHTML = i;
                document.getElementById('dataTable').appendChild(a)

                a = document.createElement('div');
                a.innerHTML = x;
                document.getElementById('dataTable').appendChild(a)

                a = document.createElement('div');
                a.innerHTML = data[x][0];
                document.getElementById('dataTable').appendChild(a)

                a = document.createElement('div');
                a.innerHTML = `<a href="docs/${data[x][1]}">Link to Notice</a>`
                document.getElementById('dataTable').appendChild(a)
                i++;
            })
        });
    });
}