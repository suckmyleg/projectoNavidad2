
//LOCATION = "192.168.1.208";
LOCATION = window.location.host.split(":")[0];

// https://livecodestream.dev/post/5-ways-to-make-http-requests-in-javascript/
function make_call_str(on_load, args="")
{
    //create XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    //open a get request with the remote server URL
    xhr.open("GET", "http://"+LOCATION+":8080/"+args);
    //send the Http request
    xhr.send();

    //EVENT HANDLERS

    //triggered when the response is completed
    xhr.onload = function() {
      if (xhr.status === 200) {
        data = xhr.responseText
        on_load(data);
      } else if (xhr.status === 404) {
        console.log("No records found");
        on_load("404");
      }
    }

    //triggered when a network-level error occurs with the request
    xhr.onerror = function() {
      console.log("Network error occurred");
      on_load("Network error ocurred");
    }

    //triggered periodically as the client receives data
    //used to monitor the progress of the request
    xhr.onprogress = function(e) {
    }
}


// https://livecodestream.dev/post/5-ways-to-make-http-requests-in-javascript/
function make_call_str_return(args="")
{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://"+LOCATION+":8080/"+args);
    xhr.send();
    xhr.onload = function() {
      if (xhr.status === 200) {
        data = xhr.responseText;
        return data;
      } else if (xhr.status === 404) {
        console.log("No records found");
        return "404";
      }
    }
    xhr.onerror = function() {
      console.log("Network error occurred");
      return "Network error ocurred";
    }
    xhr.onprogress = function(e) {
    }
}

function safe_call(on_load, args="")
{

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://"+LOCATION+":8080/"+args);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status === 200) {
        try{
          data = JSON.parse(xhr.responseText);
        }
        catch (error)
        {
          on_load(xhr.responseText)
        }
        on_load(data);
      } else if (xhr.status === 404) {
        console.log("No records found");
      }
    }

    xhr.onerror = function() {
      console.log("Network error occurred");
    }
    xhr.onprogress = function(e) {
    }
}

// https://livecodestream.dev/post/5-ways-to-make-http-requests-in-javascript/
function reload(on_load, args="")
{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://"+LOCATION+":8080/"+args);
    xhr.send();
    xhr.onload = function() {
      if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        on_load(data);
      } else if (xhr.status === 404) {
        console.log("No records found");
      }
    }
    xhr.onerror = function() {
      console.log("Network error occurred");
    }
    xhr.onprogress = function(e) {
    }
}

//https://www.tutorialspoint.com/javascript-sleep-function
function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function auto_reload(server, code, fun, delay=1000)
{
  while (true)
  {
    reload(server, fun, code);
    await sleep(delay)
  }
}