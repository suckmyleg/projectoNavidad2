let isMouseOver = false;

let ONLOADS = [];

let ONLOADED = false;

onload = function() {
	if(!ONLOADED)
	{
		if (false && window.location.href != "file:///C:/Users/juani/Desktop/projectoNavidad/index.html"){
			hideBanner();
		}

		let valid = true;

		try{
			if(page == "camara") valid = false;
		}catch{}

		if(valid)
		{
			setupSongModes();

			musicStart();	
		}

		for(var fun of ONLOADS){
			fun();
		}

		ONLOADED = true;
	}
}

function getRandomNumber(limit){
	return Math.floor(Math.random()*limit)
}

function getRandomColor(){
	var h = getRandomNumber(360);
	var s = getRandomNumber(180);
  	var l = getRandomNumber(20)+40;

	return `hsl(${h}deg, ${s}%, ${l}%)`;
}

function onMouseOverBanner() {
	isMouseOver = true;
}

function onMouseOutBanner(){
	isMouseOver = false;
}
