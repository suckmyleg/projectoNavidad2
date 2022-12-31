SESSIONID = getCookie("SESSIONID");

LOGGED = false;

NICKNAME = false;


if (SESSIONID){
	safe_call(function(data){
		if(data != false){
			LOGGED = data.logged;
			NICKNAME = data.nickname; 
		}
	}, "session"+SESSIONID);
}

function login(nickname, key){
	safe_call(function(data){
		if(data != false){
			SESSIONID = data.sessionId;
		}
		return data;
	}, "log"+nickname+"|"+key);
}

function sign(nickname){
	safe_call(function(data){
		if(data != false){
			alert("Contraseña: "+data.key);
		}
		else{
			alert("Usuario ya registrado");
		}
		return data;
	}, "sign"+nickname);
}