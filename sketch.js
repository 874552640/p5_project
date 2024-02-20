var img;
var img2;

function preload(){
    img = loadImage("assets/beansbag.jpeg");

}

function setup() {
    createCanvas(1000,1000);
    img.resize(120,160);
    //load image pixel values into array pixels
    img.loadPixels();
    img2 = createImage(img.width, img.height);

    var redImg = createImage(img.width, img.height);
    redImg.loadPixels();
    var greenImg = createImage(img.width, img.height);
    greenImg.loadPixels();
    var blueImg = createImage(img.width, img.height);
    blueImg.loadPixels();

    // 复制图像的像素数据

    img2.loadPixels();
    for (let i = 0; i < img.pixels.length; i++) {
        img2.pixels[i] = img.pixels[i];
    }
    img2.updatePixels();
    
    for(var y=0;y<img2.height;y++){
        for(var x=0;x<img2.width;x++){

            var pixelIndex = ((img2.width * y) + x)*4;
            var pixelRed = img2.pixels[pixelIndex + 0];
            var pixelGreen = img2.pixels[pixelIndex + 1];
            var pixelBlue = img2.pixels[pixelIndex + 2];
            var pixelAlpha = img2.pixels[pixelIndex + 3];
            var ave = (pixelRed + pixelGreen + pixelBlue)/3;
            //set RGB to ave value

            ave=min(ave * 1.2, 255);
            img2.pixels[pixelIndex+0] = ave;
            img2.pixels[pixelIndex+1] = ave;
            img2.pixels[pixelIndex+2] = ave;
        }
    }
    img2.updatePixels();

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
    image(img2,img.width,0);
    image(redImg,0,redImg.height);
    image(greenImg,greenImg.width,greenImg.height);
    image(blueImg,blueImg.width*2,blueImg.height);
}

