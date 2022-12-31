let MODOFIESTA = getCookie("MODOFIESTA");
let LASTCOLOR = getCookie("lastBannerColor");

let	MODOCINEMA = false;
let VIDEOPLAYING = false;
let MODOFIESTADELAY = 100;

function bannerLastColor(){
	if(LASTCOLOR){
		var pageTitle = document.getElementById("pageBanner");
		if(pageTitle.style.backgroundImage == "none" || pageTitle.style.backgroundImage == ""){
			pageTitle.style.backgroundColor = LASTCOLOR;
		}else{
			pageTitle.style.color = LASTCOLOR;	
		}
	}else{
		LASTCOLOR = getRandomColor();
	}
}

function modoFiestaMain() {

	var new_color = LASTCOLOR;

	while(new_color == LASTCOLOR)
	{
		new_color = getRandomColor();
	}

	pageTitle = document.getElementById('pageBanner');

	if(MODOFIESTA){
		if(pageTitle.style.backgroundImage == "none" || pageTitle.style.backgroundImage == ""){
			pageTitle.style.backgroundColor = new_color;
		}
		else{
			pageTitle.style.color = new_color;
		}
		setCookie("lastBannerColor", new_color, 1);
		//pageTitle.innerHTML = "SuckMyLeg ("+new_color+")";
	}
	setTimeout(function() {modoFiestaMain();}, MODOFIESTADELAY);
}

function switchModoFiest() {
	MODOFIESTA = !MODOFIESTA;
	setCookie("MODOFIESTA", MODOFIESTA, 1);
}

function startModoFiesta(delay=100, disable=true){
	MODOFIESTADELAY = delay;
	MODOFIESTA = true;
	if(disable)uncinemaMode();
}











function cinemaMode(height="600px"){
	MODOCINEMA = true;
	MODOFIESTA = false;
	if(SETTINGS.cinemaheight && SETTINGS.cinemaheight != "false"){height = SETTINGS.cinemaheight;}
	document.getElementById("pageBanner").style.height = height;
	document.getElementById('bannerBackgroundVideo').style.height = height;
	bannerFontSize("0px");
}

function uncinemaMode(){
	MODOCINEMA = false;
	document.getElementById("pageBanner").style.height = "76px";
	document.getElementById('bannerBackgroundVideo').style.height = "76px";
	bannerFontSize("2em");
}

function reloadCinemaHeight(){
	if(MODOCINEMA) cinemaMode(SETTINGS.cinemaheight);
}









function bannerFontSize(font="2em"){
	document.getElementById('page_title').style.fontSize = font;
}


function clearAll(){
	uncinemaMode();
	removeVideoPlaying();
	removeBannerImage();
}

function removeBannerImage(){
	document.getElementById("pageBanner").style.backgroundImage = "none";
}


function removeImageShowing(){
	document.getElementById("pageBanner").style.backgroundColor = "none";
	document.getElementById("pageBanner").style.backgroundImage = "none";
}

function resetBannerBackground(){
	removeVideoPlaying();
	removeImageShowing();
}

function resetBanner(){
	uncinemaMode();
	resetBannerBackground();
}









function backgroundImage(imageName){
	MODOFIESTA = false;
	document.getElementById("pageBanner").style.backgroundColor = "rgb(0,0,0,0)";
	document.getElementById("pageBanner").style.backgroundImage = "url('../Images/"+imageName+"')";
}




function showBannerImage(imageName){
	resetBannerBackground();
	backgroundImage(imageName);
}

function showBannerVideo(videoName, muted=true){
	console.log("showBannerVideo", videoName, muted);
	removeImageShowing();
	backgroundVideo(videoName, muted);
}











function unBackgroundVideoIfNotPlaying(){
	videoPlayedBefore = VIDEOPLAYING;

	setTimeout(function(){if(((videoPlayedBefore != VIDEOPLAYING) && !VIDEOPLAYING) && videoPlayedBefore) removeVideoPlaying();}, 1000);
}


function removeVideoPlaying(){
	console.log("RemoveVideoPlaying");
	VIDEOPLAYING = false;
	var video = document.getElementById('bannerBackgroundVideo');

	try{
		video.pause();
		video.removeAttribute(getVideoSourceType()); // empty source
		video.load();
		video.currentTime = 0;
		video.innerHTML = "";
	}catch{}
}

function backgroundVideo(videoName, muted=true){
	MODOFIESTA = false;

	document.getElementById("pageBanner").style.backgroundColor = "rgb(0,0,0,0)";

	console.log("backgroundVideo", VIDEOPLAYING, videoName, muted)

	if(VIDEOPLAYING == videoName) {return false;}

	if(videoName != "") {VIDEOPLAYING = videoName;}
	else{
		VIDEOPLAYING = false;
	}

	removeVideoPlaying();

	setVideoPlaying(videoName, muted);
}

function setVideoPlaying(videoName, muted){
	var video = document.getElementById('bannerBackgroundVideo');

	var source = document.createElement('source');

	source.setAttribute(getVideoSourceType(), getVideoSourceTypeLocation(videoName));
	source.setAttribute('type', 'video/mp4');

	video.appendChild(source);

	video.muted = muted;

	try{
		setCookie("BACKGROUNDVIDEO", videoName, 1);
		setCookie("BACKGROUNDVIDEOTIME", videoName, 1);
		video.load();
		video.play();
	}catch{}

}












function hideBanner(){
	document.getElementById("pageBanner").style.display = "none";
}


ONLOADS.push(function(){bannerLastColor();});
ONLOADS.push(function(){modoFiestaMain();});

