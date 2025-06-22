let modeServer = false;

if(window.location.href.split(":")[0] == "http://192.168.1.104/"){
    modeServer = false;
}

function getVideoSource(loc){
    return 'src="../Videos/'+loc+'"';
    if(modeServer){
        return 'src="https://maherahe.com/projectoNavidad/Web/Videos/'+loc+'"';
    }else{
        return 'src="../Videos/'+loc+'"';
    }
}



function getVideoSourceType(){
    return "src";
    if(modeServer){
        return "src";
    }else{
        return "src";
    }
}

function getVideoSourceTypeLocation(loc){
    return loc;
    if(modeServer){
        return 'https://maherahe.com/projectoNavidad/Web/Videos/'+loc;
    }else{
        return 'Videos/' + loc;
    }
}
