var img;




function preload(){
    img = loadImage("assets/beansbag.jpeg");

}

function setup() {
    createCanvas(1000,1000);
    img.resize(120,160);
    //load image pixel values into array pixels
    image(img,0,0);

    grayscale(img);

    RGB_channels(img);









}


function grayscale(img) {
    var greyscale_img;
    img.loadPixels();
    greyscale_img = createImage(img.width, img.height);

    // 复制图像的像素数据

    greyscale_img.loadPixels();
    for (let i = 0; i < img.pixels.length; i++) {
        greyscale_img.pixels[i] = img.pixels[i];
    }
    greyscale_img.updatePixels();

    greyscale_img.loadPixels();
    for(var y=0;y<greyscale_img.height;y++){
        for(var x=0;x<greyscale_img.width;x++){

            var pixelIndex = ((greyscale_img.width * y) + x)*4;
            var pixelRed = greyscale_img.pixels[pixelIndex + 0];
            var pixelGreen = greyscale_img.pixels[pixelIndex + 1];
            var pixelBlue = greyscale_img.pixels[pixelIndex + 2];
            var pixelAlpha = greyscale_img.pixels[pixelIndex + 3];
            var ave = (pixelRed + pixelGreen + pixelBlue)/3;
            //set RGB to ave value

            ave=min(ave * 1.2, 255);
            greyscale_img.pixels[pixelIndex+0] = ave;
            greyscale_img.pixels[pixelIndex+1] = ave;
            greyscale_img.pixels[pixelIndex+2] = ave;
        }
    }
    greyscale_img.updatePixels();
    image(greyscale_img,img.width,0);
}

function RGB_channels(img) {
    img.loadPixels();

    var redImg = createImage(img.width, img.height);
    redImg.loadPixels();
    var greenImg = createImage(img.width, img.height);
    greenImg.loadPixels();
    var blueImg = createImage(img.width, img.height);
    blueImg.loadPixels();

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


    image(redImg,0,redImg.height);
    image(greenImg,greenImg.width,greenImg.height);
    image(blueImg,blueImg.width*2,blueImg.height);
}
