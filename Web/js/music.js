
let LASTVISIT = getCookie("LASTVISIT");
let MUSICPLAYING = getCookie("MUSICPLAYING");
let SINCEPLAYING = getCookie("SINCEPLAYING");
let PAUSED = getCookie("PAUSED", true);
let PAUSEDAT = getCookie("PAUSEDAT");
let VOLUME = getCookie("PAUSEDAT");
let MODE = getCookie("MODE");

let MODES = [];

if(VOLUME == false){
	VOLUME = 20;
}

let onPlayings = [];

var SONGS = ["All I Want for Christmas Is You",  
	"Its Beginning to Look a Lot like Christmas", 
	"I Really Want to Stay at Your House",
	"Navidad dulce navidad",
	"Navidad"];/*,
	"Porta - Dragon Ball Rap (con Letra)"];*/


function playingFor(){
	if(!SINCEPLAYING) {SINCEPLAYING = getTimestampInSeconds();}
	return getTimestampInSeconds() - SINCEPLAYING;
}

function setVolume(lvl){
	document.getElementById("audioControll").volume = lvl/100;
}

function onPlaying(songName, fun){
	onPlayings.push([songName, fun]);
}

function onPlayingSongs(songs, fun){
	for(var songName of songs){onPlayings.push([songName, fun]);}
}

function callOnPlaying(songName){
	for(var data of onPlayings){
		if (data[0] == songName || data[0] == "*")
		{
			//console.log(songName, data[1]);
			data[1](songName);
		}
	}
}

function getTimestampInSeconds() {
  return Math.floor(Date.now() / 10)/100;
}


function musicPlayingElement(){

	let add = new Date(playingFor() * 1000).toISOString().substring(14, 19)

	return "<audio controls autoplay id='audioControll' controlsList='nodownload noplaybackrate'>"+
	"<source src='../Music/"+MUSICPLAYING+".mp3#t=00:"+add+"' type='audio/mpeg'>"+
	"Your browser does not support the audio element"+
	"</audio>";
}

function pause(status){
	PAUSED = status;
	if(PAUSED) document.getElementById("audioControll").pause();
	setCookie("PAUSED", status, 1);
}

function continuePlaying(){
	document.getElementById("audioPlayer").innerHTML = musicPlayingElement();

	var audioControll = document.getElementById("audioControll");


	// Make a function when the song ends, so it continues the playing the playlist
	audioControll.onended = function() {
		var next = SONGS[SONGS.indexOf(MUSICPLAYING)+1];

		if (next == undefined)
		{
			playMusic(SONGS[0]);
		}
		else{
			playMusic(next);
		}
	};
	
	var musicPlayingNow = MUSICPLAYING;

	if(!PAUSED) {
		audioControll.play();
		callOnPlaying(MUSICPLAYING);
	}
	else{
		audioControll.pause();
	}

	//Function when the user pauses the audio (doesnt work)
	audioControll.onpause = function() {
		console.log("Paused");
		if(MUSICPLAYING == musicPlayingNow) pause(true);
    document.getElementById("musicPlayerTitle").innerHTML = "Paused";
	};

	//When user click the play button
	audioControll.onplay = function() {
		pause(false);
		document.getElementById("musicPlayerTitle").innerHTML = "Playing: " + MUSICPLAYING;
		callOnPlaying(MUSICPLAYING);
	};

	document.getElementById("musicPlayerTitle").innerHTML = "Playing: " + MUSICPLAYING;

	setVolume(VOLUME);
}

function playMusic(song){
	MUSICPLAYING = song;
	setCookie("MUSICPLAYING", song, 1);
	SINCEPLAYING = getTimestampInSeconds();
	setCookie("SINCEPLAYING", SINCEPLAYING, 1);
	pause(false);
	continuePlaying();
}


function showPlayerSongs(status) {
	var player = document.getElementById("musicPlayer");
	if(player.style.bottom == "0px" || status)
	{
		player.style.bottom = -27-(41*(SONGS.length+2))+"px";
	}else{
		player.style.bottom = "0px";

	}
}

function displaySongs(){
	var list = document.getElementById("listOfSongs");
	var element = "";

	for(var songName of SONGS){
		element += "<a onclick='playMusic("+'"'+songName+'"'+")'>"+songName+"</a>";
	}
	element += "<a id='moreModes' onclick='switchDisplayModes();'>+++</a>";
	element += "<a id='moreSettings' onclick='switchDisplaySettings();'>Ajustes</a>";

	list.innerHTML = element;

	document.getElementById("musicPlayer").style.bottom = -27-(41*(SONGS.length+2))+"px";
}

function showPlayer(){
	var element = "<div onmouseleave='showPlayerSongs(true);hideDisplayModes();hideDisplaySettings();' class='prevent-select' id='musicPlayer'>"+
	getSettings()+
	getDisplayModes()+
	"<p onclick='showPlayerSongs();' id='musicPlayerTitle'>Player</p><div id='audioPlayer'></div><ul id='listOfSongs'></ul></div>";


	try{document.getElementById("musicPlayer").remove();}catch{}
	try{
		document.getElementById("musicPlayer").remove();
	}catch{}
	document.getElementById("spawnableField").innerHTML += element;

	displaySongs();
}

function musicStart(){

	showPlayer();

	if(MODE){
		executeMode(MODE);
	}

	playMusicIfSameBefore();


}

function playMusicIfSame(song){
	if (MUSICPLAYING == song){
			continuePlaying();
		}else{
			if(LASTVISIT == false || getTimestampInSeconds()-LASTVISIT >= 1800)
			{
				playMusic(SONGS[0]);
			}
		}
}

function playMusicIfSameBefore(){
	if(MUSICPLAYING){
		playMusicIfSame(SONGS[SONGS.indexOf(MUSICPLAYING)])
	}
	else{
		playMusic(SONGS[0]);
	}
}

function executeMode(name){
	hideDisplayModes();
	for(var mode of MODES){
		if(mode[0] == name){
			setCookie("MODE", mode[0], 1);
			mode[1]();
			return null;
		}
	}
}

function formModes(){
	var nickname = document.getElementById("formNickname").value;
	var key = document.getElementById("formKey").value;

	logIn(nickname, key);
}

function hideDisplaySettings(){
		document.getElementById('musicSettings').style.display = "none";

}

function switchDisplaySettings(){
	var modes = document.getElementById('musicSettings');
	if(modes.style.display == "none" || modes.style.display == ""){
		modes.style.display = "block";
		hideDisplayModes();
	}else{
		hideDisplaySettings();
	}
}	

function hideDisplayModes(){
		document.getElementById('musicModes').style.display = "none";
		document.getElementById('moreModes').innerHTML = "+++";

}

function switchDisplayModes(){
	var modes = document.getElementById('musicModes');
	if(modes.style.display == "none" || modes.style.display == ""){
		modes.style.display = "block";
		document.getElementById('moreModes').innerHTML = "---";
		hideDisplaySettings();
	}else{
		hideDisplayModes();
	}
}	

function getSettings() {
	function makeChange(n, v){
		return "change('"+n+"','"+v+"');reloadCinemaHeight();";
	}

	return "<div id='musicSettings'>"+
	"<h3>Cinema:</h3>"+
	'<a onclick="'+makeChange("cinemaheight", "76px")+'">Normal</a>'+
	'<a onclick="'+makeChange("cinemaheight", "200px")+'">Short</a>'+
	'<a onclick="'+makeChange("cinemaheight", "600px")+'">Medium</a>'+
	'<a onclick="'+makeChange("cinemaheight", "1000px")+'">Full</a>'+
	'<a onclick="'+makeChange("cinemaheight", "100%")+'">Background</a>'+
	'<a onclick="'+makeChange("cinemaheight", false)+'">Auto</a>'+
	"</div>";
}


function reloadModes(){
	document.getElementById("musicModesList").innerHTML = getModes();
}

function getModes(){
	var form = "";
	for(var mode of MODES){
		form += "<a onclick='"+'executeMode("'+mode[0]+'");'+"' class='link web'>"+mode[0]+"</a>";
	}
	return form;
}

function getDisplayModes(){
	var form = 	'<div id="musicModes"><ul id="musicModesList">';
	form += getModes();
	form += '</ul>'+
	'</div>';

	return form;
}

function addModeSongs(name, songs, play=0){
	addMode(name, function(){
		SONGS = songs;
		displaySongs();
		playMusicIfSameBefore();
	});

}

function addMode(name, fun){
	MODES.push([name, fun]);
}

