var img;

function preload(){
    img = loadImage("assets/beansbag.jpeg");
}

function setup() {
    createCanvas(1000,1000);
    
    //load image pixel values into array pixels
    img.loadPixels();
    
    for(var y=0;y<img.height;y++){
        for(var x=0;x<img.width;x++){

            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];
            var pixelAlpha = img.pixels[pixelIndex + 3];
            var ave = (pixelRed + pixelGreen + pixelBlue)/3;
            //set RGB to ave value
            img.pixels[pixelIndex+0] = ave;
            img.pixels[pixelIndex+1] = ave;
            img.pixels[pixelIndex+2] = ave;
        }
    }
    img.updatePixels();
    image(img,0,0);
}

