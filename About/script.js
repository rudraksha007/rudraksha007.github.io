function convert(id){
    x = document.getElementById(id);
    if (x.style.gridTemplateRows == '1fr' || x.style.gridTemplateRows == ''){
        x.style.gridTemplateRows = '0fr';
        document.getElementById(id+"-arr").style.rotate = '180deg';
    }
    else{
        x.style.gridTemplateRows = '1fr'
        x.children[0].style.rotate = 0
        document.getElementById(id+"-arr").style.rotate = '0deg';
    }
}