let images = [];

class Image{
	constructor(element){
		this.element;
		this.x = 0;
		this.y = 0;
	}

	reload(){

	}
}

function animateImage(src){
	document.body.innerHTML += "<img id='image-"+images.length+"' src='"+src+"'>";
	Image();
}

function reload(){
	for(var image of images){
		image.reload();
	}
}