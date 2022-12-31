
let HOST = window.location.host.split(":")[0];

var page = "camara";

function switchFlash(){
	makeCallFalse("http://"+HOST+":5000/MobileSwitchFlash");
}

function makeCallFalse(src){
	try{
		document.getElementById("lastRequest").remove();
	}catch{}

	document.getElementById("spawnableField").innerHTML += "<iframe id='lastRequest' class='hidden' src='"+src+"'></iframe>";
}

ONLOADS.push(function(){

document.getElementById("camera").innerHTML = "<img id='image' src='http://"+HOST+":5000/video_feed' width='100%'>";

let img = document.getElementById("image")
img.addEventListener("error", function(event) {
  event.target.src = "../Images/disconnected.png";
  event.onerror = null
})

});