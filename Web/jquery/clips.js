$('#clip').mouseover(function(){
    $(this).get(0).play();
    console.log("Over");
}).mouseout(function(){
    $(this).get(0).pause();
})