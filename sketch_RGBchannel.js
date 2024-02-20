var img;

function preload(){
    img = loadImage("assets/beansbag.jpeg");
}

function setup() {
    createCanvas(1000,1000);
    img.resize(120,160);
    var redImg = createImage(img.width, img.height);
    redImg.loadPixels();
    var greenImg = createImage(img.width, img.height);
    greenImg.loadPixels();
    var blueImg = createImage(img.width, img.height);
    blueImg.loadPixels();

    //load image pixel values into array pixels
    img.loadPixels();

    for(var y=0;y<img.height;y++){
        for(var x=0;x<img.width;x++){

            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];

            //red channel only
            redImg.pixels[pixelIndex+0] = pixelRed;
            redImg.pixels[pixelIndex+1] = 0;
            redImg.pixels[pixelIndex+2] = 0;
            redImg.pixels[pixelIndex+3] = 255;

            //green channel only
            greenImg.pixels[pixelIndex+0] = 0;
            greenImg.pixels[pixelIndex+1] = pixelGreen;
            greenImg.pixels[pixelIndex+2] = 0;
            greenImg.pixels[pixelIndex+3] = 255;

            //blue channel only
            blueImg.pixels[pixelIndex+0] = 0;
            blueImg.pixels[pixelIndex+1] = 0;
            blueImg.pixels[pixelIndex+2] = pixelBlue;
            blueImg.pixels[pixelIndex+3] = 255;

        }
    }
    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();

    image(img,0,0);
    image(redImg,redImg.width,0);
    image(greenImg,0,greenImg.height);
    image(blueImg,blueImg.width,blueImg.height);
}

