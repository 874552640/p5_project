var img;

var key;

var redSlider;
var greenSlider;
var blueSlider;

var faceImg;
var faceImg_copy;

var detector;
var classifier = objectdetect.frontalface;

var imageLoaded = false;

var startXSlider;
var startYSlider;
var DwidthSlider;
var DheightSlider;




function imageLoadedCallback(){
    imageLoaded = true;
    img.loadPixels();
}

function preload(){
    img = loadImage("assets/beansbag.jpeg",imageLoadedCallback);
    faceImg = loadImage("assets/face1.jpg",imageLoadedCallback());
    faceImg_copy = loadImage("assets/face1.jpg",imageLoadedCallback());
    // faceImg = loadImage("assets/face2.jpg",imageLoadedCallback());
    // faceImg_copy = loadImage("assets/face2.jpg",imageLoadedCallback());



}

function setup() {

    pixelDensity(1);
    var scaleFactor = 1.2;

    faceImg.resize(120,160);
    faceImg_copy.resize(120,160);
    detector = new objectdetect.detector(faceImg.width, faceImg.height, scaleFactor, classifier);
    createCanvas(1000,1000);




    redSlider = createSlider(0,256,125);
    redSlider.parent("redSlider");
    greenSlider = createSlider(0,256,125);
    greenSlider.parent("greenSlider");
    blueSlider = createSlider(0,256,125);
    blueSlider.parent("blueSlider");

    startXSlider = createSlider(-50,50,0);
    startXSlider.parent("startX");
    startYSlider = createSlider(-50,50,0);
    startYSlider.parent("startY");
    DwidthSlider = createSlider(-50,50,0);
    DwidthSlider.parent("Dwidth");
    DheightSlider = createSlider(-50,50,0);
    DheightSlider.parent("Dheight");





    img.resize(120,160);
    //load image pixel values into array pixels
    image(img,0,0);

    grayscale(img);

    RGB_channels(img);

    image(img,0,img.height*3);
    HSB_IMG(img);

    image(faceImg,0,img.height*4);

    document.addEventListener("keydown", function(event){
        key=event.key.toLowerCase();
        // face_detect();

    });













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

function HSB_IMG(img){
    var hsbImg = createImage(img.width, img.height);
    hsbImg.loadPixels();

    //load image pixel values into array pixels
    img.loadPixels();
    for(var y=0;y<img.height;y++){
        for(var x=0;x<img.width;x++){

            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];

            var hsb = rgbToHsb(pixelRed,pixelGreen,pixelBlue);
            //display h ueas red, saturation as green, brightness as  blue
            hsbImg.pixels[pixelIndex+0] = hsb[0]*1.5;
            hsbImg.pixels[pixelIndex+1] = hsb[1]*1.5;
            hsbImg.pixels[pixelIndex+2] = hsb[2]*2;
            hsbImg.pixels[pixelIndex+3] = 255;

        }
    }
    hsbImg.updatePixels();

    image(hsbImg,hsbImg.width,img.height*3);

}

function rgbToHsb(r, g, b) {
    // Use the p5.js color() function to create a color object
    let rgbColor = color(r, g, b);

    //Extract HSB values from the color object
    //Need to implement the algorithm for extracting hsv value from rgb for coursework.
    let h = hue(rgbColor);
    let s = saturation(rgbColor);
    let br = brightness(rgbColor);

    // Return the HSB values as an array
    return [h, s, br];
}

function draw(){

    if(!imageLoaded)
        return;



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

            //red channel
            if(redSlider.value()>pixelRed){
                pixelRed = 0;
            }
            redImg.pixels[pixelIndex+0] = pixelRed;
            redImg.pixels[pixelIndex+1] = 0;
            redImg.pixels[pixelIndex+2] = 0;
            redImg.pixels[pixelIndex+3] = 255;

            //green channel
            if(greenSlider.value()>pixelGreen){
                pixelGreen = 0;
            }
            greenImg.pixels[pixelIndex+0] = 0;
            greenImg.pixels[pixelIndex+1] = pixelGreen;
            greenImg.pixels[pixelIndex+2] = 0;
            greenImg.pixels[pixelIndex+3] = 255;

            //blue channel
            if(blueSlider.value()>pixelBlue){
                pixelBlue = 0;
            }
            blueImg.pixels[pixelIndex+0] = 0;
            blueImg.pixels[pixelIndex+1] = 0;
            blueImg.pixels[pixelIndex+2] = pixelBlue;
            blueImg.pixels[pixelIndex+3] = 255;

        }
    }
    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();


    image(redImg,0,img.height*2);
    image(greenImg,blueImg.width,greenImg.height*2);
    image(blueImg,blueImg.width*2,blueImg.height*2);



    // faceImg.loadPixels();
    // faceImg_copy.loadPixels();
    //
    //
    //
    // for (let i = 0; i < faceImg_copy.pixels.length; i++) {
    //     faceImg.pixels[i] = faceImg_copy.pixels[i];
    // }
    //
    // faceImg.updatePixels();
    //
    // //image(faceImg,0,0);
    // faces = detector.detect(faceImg.canvas);
    //
    // strokeWeight(2);
    // stroke(0);
    // noFill();
    //
    // // faceImg.loadPixels();
    // //
    // // faceImg_copy.loadPixels();
    // //
    // //
    // // for(var y=0;y<faceImg.height;y++){
    // //     for(var x=0;x<faceImg.width;x++){
    // //
    // //         var pixelIndex = ((faceImg_copy.width * y) + x)*4;
    // //         var pixelRed = faceImg_copy.pixels[pixelIndex + 0];
    // //         var pixelGreen = faceImg_copy.pixels[pixelIndex + 1];
    // //         var pixelBlue = faceImg_copy.pixels[pixelIndex + 2];
    // //
    // //
    // //         faceImg.pixels[pixelIndex+0] = pixelRed;
    // //         faceImg.pixels[pixelIndex+1] = pixelGreen;
    // //         faceImg.pixels[pixelIndex+2] = pixelBlue;
    // //
    // //     }
    // // }
    // //
    // // faceImg.updatePixels();
    //
    // for (var i=0; i<faces.length; i++){
    //     var face=faces[i];
    //     if (face[4] > 4){
    //
    //
    //         // processPixels(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //         // greyScale_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //         // blur_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //         // pixel_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //
    //
    //         switch (key) {
    //             case "a":
    //                 greyScale_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //                 break;
    //             case "b":
    //                 blur_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //                 break;
    //             case "c":
    //                 // image.src = "image_c.jpg";
    //
    //                 break;
    //             case "d":
    //                 greyScale_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //                 pixel_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // }
    //
    // faceImg.updatePixels();
    // image(faceImg,0,faceImg.height*4);




    var hsbImg = createImage(img.width, img.height);
    hsbImg.loadPixels();

    //load image pixel values into array pixels
    img.loadPixels();
    for(var y=0;y<img.height;y++){
        for(var x=0;x<img.width;x++){

            var pixelIndex = ((img.width * y) + x)*4;
            var pixelRed = img.pixels[pixelIndex + 0];
            var pixelGreen = img.pixels[pixelIndex + 1];
            var pixelBlue = img.pixels[pixelIndex + 2];

            var hsb = rgbToHsb(pixelRed,pixelGreen,pixelBlue);
            //display h ueas red, saturation as green, brightness as  blue
            hsbImg.pixels[pixelIndex+0] = hsb[0]*1.5;
            hsbImg.pixels[pixelIndex+1] = hsb[1]*1.5;
            hsbImg.pixels[pixelIndex+2] = hsb[2]*2;
            hsbImg.pixels[pixelIndex+3] = 255;

        }
    }
    hsbImg.updatePixels();

    image(hsbImg,hsbImg.width,img.height*4);


    face_detect(startXSlider.value(),startYSlider.value(),DwidthSlider.value(),DheightSlider.value());


    // noLoop();
}

function processPixels(startX,startY,dWidth,dHeight){

    for(var y=startY;y<startY+dHeight;y++){
        for(var x=startX;x<startX+dWidth;x++){

            var pixelIndex = ((faceImg.width * y) + x)*4;
            var pixelRed = faceImg.pixels[pixelIndex + 0];
            var pixelGreen = faceImg.pixels[pixelIndex + 1];
            var pixelBlue = faceImg.pixels[pixelIndex + 2];

            //red channel only
            faceImg.pixels[pixelIndex+0] = pixelRed;
            faceImg.pixels[pixelIndex+1] = 0;
            faceImg.pixels[pixelIndex+2] = 0;
            faceImg.pixels[pixelIndex+3] = 255;

        }
    }
}

function greyScale_face(startX,startY,dWidth,dHeight){

    for(var y=startY;y<startY+dHeight;y++){
        for(var x=startX;x<startX+dWidth;x++){

            var pixelIndex = ((faceImg.width * y) + x)*4;
            var pixelRed = faceImg.pixels[pixelIndex + 0];
            var pixelGreen = faceImg.pixels[pixelIndex + 1];
            var pixelBlue = faceImg.pixels[pixelIndex + 2];

            var ave = (pixelRed + pixelGreen + pixelBlue)/3;
            //set RGB to ave value

            ave=min(ave * 1.2, 255);
            faceImg.pixels[pixelIndex+0] = ave;
            faceImg.pixels[pixelIndex+1] = ave;
            faceImg.pixels[pixelIndex+2] = ave;

        }
    }
}

function blur_face(startX,startY,dWidth,dHeight){

    var matrix = getSimpleBlurKernel(20);

    for(var x=startX;x<startX+dWidth;x++){
        for(var y=startY;y<startY+dHeight;y++){
            var pixelIndex = ((faceImg.width * y) + x)*4;
            var r = faceImg.pixels[pixelIndex+0];
            //calculate the convolution value for that pixel
            var c = convolution(x,y,matrix,faceImg);
            //update each pixel with new RGB value
            faceImg.pixels[pixelIndex+0] = c[0];
            faceImg.pixels[pixelIndex+1] = c[1];
            faceImg.pixels[pixelIndex+2] = c[2];
        }
    }
}

//for simple averaging or blurring operation.
function getSimpleBlurKernel(size){
    var m = [];
    for(var i=0;i<size;i++){
        var n = [];
        for(var j=0;j<size;j++){
            n.push(1/(size*size));
        }
        m.push(n);
    }
    return m;
}

function convolution(x, y, matrix, img) {
    var matrixSize = matrix.length;
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    // convolution matrix loop
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            // Get pixel loc within convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + img.width * yloc) * 4;
            // ensure we don't address a pixel that doesn't exist
            index = constrain(index, 0, img.pixels.length - 1);

            // multiply all values with the mask and sum up
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    // return the new color as an array
    return [totalRed, totalGreen, totalBlue];
}

function pixel_face(startX,startY,dWidth,dHeight){

    var pixel_block=5;
    for(var y=startY;y<startY+dHeight;y+=pixel_block){
        for(var x=startX;x<startX+dWidth;x+=pixel_block){

            var sum=0;
            var count=0;
            for(var y_1=y;y_1<y+pixel_block;y_1++) {
                for (var x_1 = x; x_1 < x + pixel_block; x_1++) {
                    count++;
                    // sum+=(faceImg.get(x_1,y_1))[0];
                    var pixelIndex = ((faceImg.width * y_1) + x_1)*4;
                    sum+=faceImg.pixels[pixelIndex+0];

                }
            }
            var average=sum/count;

            for(var y_2=y;y_2<y+pixel_block;y_2++) {
                for (var x_2 = x; x_2 < x + pixel_block; x_2++) {
                    var pixelIndex = ((faceImg.width * y_2) + x_2)*4;
                    faceImg.pixels[pixelIndex+0] = average;
                    faceImg.pixels[pixelIndex+1] = average;
                    faceImg.pixels[pixelIndex+2] = average;

                }
            }

        }
    }
}

function HSB_face(startX,startY,dWidth,dHeight){




    //load image pixel values into array pixels
    faceImg.loadPixels();
    for(var y=startY;y<startY+dHeight;y++){
        for(var x=startX;x<startX+dWidth;x++){

            var pixelIndex = ((faceImg.width * y) + x)*4;
            var pixelRed = faceImg.pixels[pixelIndex + 0];
            var pixelGreen = faceImg.pixels[pixelIndex + 1];
            var pixelBlue = faceImg.pixels[pixelIndex + 2];

            var hsb = rgbToHsb(pixelRed,pixelGreen,pixelBlue);
            //display h ueas red, saturation as green, brightness as  blue
            faceImg.pixels[pixelIndex+0] = hsb[0]*1.5;
            faceImg.pixels[pixelIndex+1] = hsb[1]*1.5;
            faceImg.pixels[pixelIndex+2] = hsb[2]*2;
            faceImg.pixels[pixelIndex+3] = 255;

        }
    }
    faceImg.updatePixels();

    // image(faceImg,0,img.height*3);
}

function face_detect(X_change,Y_change,dWidth_change,dHeight_change){

    faceImg.loadPixels();
    faceImg_copy.loadPixels();



    for (let i = 0; i < faceImg_copy.pixels.length; i++) {
        faceImg.pixels[i] = faceImg_copy.pixels[i];
    }

    faceImg.updatePixels();

    //image(faceImg,0,0);
    faces = detector.detect(faceImg.canvas);

    strokeWeight(2);
    stroke(0);
    noFill();

    // faceImg.loadPixels();
    //
    // faceImg_copy.loadPixels();
    //
    //
    // for(var y=0;y<faceImg.height;y++){
    //     for(var x=0;x<faceImg.width;x++){
    //
    //         var pixelIndex = ((faceImg_copy.width * y) + x)*4;
    //         var pixelRed = faceImg_copy.pixels[pixelIndex + 0];
    //         var pixelGreen = faceImg_copy.pixels[pixelIndex + 1];
    //         var pixelBlue = faceImg_copy.pixels[pixelIndex + 2];
    //
    //
    //         faceImg.pixels[pixelIndex+0] = pixelRed;
    //         faceImg.pixels[pixelIndex+1] = pixelGreen;
    //         faceImg.pixels[pixelIndex+2] = pixelBlue;
    //
    //     }
    // }
    //
    // faceImg.updatePixels();

    for (var i=0; i<faces.length; i++){
        var face=faces[i];
        if (face[4] > 4){


            // processPixels(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            // greyScale_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            // blur_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            // pixel_face(int(face[0]), int(face[1]), int(face[2]), int(face[3]));


            switch (key) {
                case "a":
                    greyScale_face(int(face[0])+X_change, int(face[1])+Y_change, int(face[2])+dWidth_change, int(face[3])+dHeight_change);
                    break;
                case "b":
                    blur_face(int(face[0])+X_change, int(face[1])+Y_change, int(face[2])+dWidth_change, int(face[3])+dHeight_change);
                    break;
                case "c":
                    // image.src = "image_c.jpg";
                    HSB_face(int(face[0])+X_change, int(face[1])+Y_change, int(face[2])+dWidth_change, int(face[3])+dHeight_change);
                    break;
                case "d":
                    greyScale_face(int(face[0])+X_change, int(face[1])+Y_change, int(face[2])+dWidth_change, int(face[3])+dHeight_change);
                    pixel_face(int(face[0])+X_change, int(face[1])+Y_change, int(face[2])+dWidth_change, int(face[3])+dHeight_change);
                    break;
                default:
                    break;
            }
        }
    }

    faceImg.updatePixels();
    image(faceImg,0,faceImg.height*4);
}