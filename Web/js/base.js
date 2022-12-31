function displayNav(){
	var st = document.getElementById("navegacion_list").style;
	var nv = document.getElementById("navegacion").style;
	var sw = document.getElementById('buttonDisplayer');

	if(st.display != "block"){
		st.display = "block";
		sw.innerHTML = "---";

	}else{
		st.display = "none";
		sw.innerHTML = "+++";

	}
}
