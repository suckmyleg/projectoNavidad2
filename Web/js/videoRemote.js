let modeServer = true;

if(window.location.href.split(":")[0] == "http://192.168.1.104/"){
    modeServer = false;
}

function getVideoSource(loc){
    if(modeServer){
        return 'src="https://maherahe.com/projectoNavidad/Web/Videos/'+loc+'"';
    }else{
        return 'src="../Videos/'+loc+'"';
    }
}



function getVideoSourceType(){
    if(modeServer){
        return "src";
    }else{
        return "src";
    }
}

function getVideoSourceTypeLocation(loc){
    if(modeServer){
        return 'https://maherahe.com/projectoNavidad/Web/Videos/'+loc;
    }else{
        return loc;
    }
}