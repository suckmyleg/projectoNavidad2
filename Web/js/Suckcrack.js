variablesUrl = urlData();

let matchId = variablesUrl.matchId;
let delay = variablesUrl.delay;


function reloadPlayers(data){

}

function reloadPlayer(data){

}

function writeNewPlayer(data){

}



function checkAnnouncement(data){

}

function makeAnnouncement(data){

}

function writeAnnouncement(data){

}

function removeAnnouncement(data){

}



function reloadData(data){

}



function reloadPlayers(data){

}

function mainReloadPlayers(matchId, delay){
	setTimeout(function(){
		safe_call(reloadPlayers, 
			"");
	}, delay)
}

function checkReloadPlayers(matchId, delay){
	if (checkMatchExists(data)){
		mainReloadPlayers(data);
	}else{
		matchUknown();
	}

}

function matchUknown(){

}

function checkMatchExists(matchId){
	return true;
}

function start(matchId, delay){
	checkReloadPlayers(matchId, delay);
}