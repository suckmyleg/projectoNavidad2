//https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name, def=false) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return def;
}

//https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function urlData(){
    var data = {};

    try{
        for(var variable of window.location.href.split("?")[1].split("&")){
            var variable_Data = variable.split("=");
            data[variable_Data[0]] = variable_Data[1];
        }
    }
    catch(e){
    }
    
    return data;
}