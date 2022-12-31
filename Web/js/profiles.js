function createAccount(nickname){
	var data = sign(nickname);
}

function logIn(nickname, key){
	var data = login(nickname, key);
}

function formSign(){
	var nickname = document.getElementById("formNickname").value;
	createAccount(nickname);
}

function formLog(){
	var nickname = document.getElementById("formNickname").value;
	var key = document.getElementById("formKey").value;

	logIn(nickname, key);
}

function displayForm(){
	var form = 	'<div id="logForm"><div class="logSign">'+
				"<h2 class='logInTitle'>Iniciar sesión</h2>"+
				'Nickname:'+
				'<input id="formNickname" type="text">'+
				'<br>Key:'+
				'<input id="formKey" type="password">'+
			'<br><button onclick="formLog();">Iniciar</button></div>';

	form += '<div class="logSign">'+
				"<h2 class='logInTitle'>Registrarse</h2>"+
				'Nickname:'+
				'<input id="formNickname" type="text">'+
			'<br><button onclick="formSign();">Registrarme</button></div></div>';

	document.getElementById("spawnableField").innerHTML += form;
}