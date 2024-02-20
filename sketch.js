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

    // 复制图像的像素数据

    img2.loadPixels();
    for (let i = 0; i < img.pixels.length; i++) {
        img2.pixels[i] = img.pixels[i];
    }
    img2.updatePixels();
    
    for(var y=0;y<img.height;y++){
        for(var x=0;x<img.width;x++){

            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];
            var pixelAlpha = img.pixels[pixelIndex + 3];
            var ave = (pixelRed + pixelGreen + pixelBlue)/3;
            //set RGB to ave value

            ave=min(ave * 1.2, 255);
            img.pixels[pixelIndex+0] = ave;
            img.pixels[pixelIndex+1] = ave;
            img.pixels[pixelIndex+2] = ave;
        }
    }
    img.updatePixels();




    image(img2,0,0);
    image(img,140,0);
}

