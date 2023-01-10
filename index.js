const fs = require('fs');
var gm = require('gm').subClass({ imageMagick: '7+' });

let dimensions = [0,0]
let gridSize = [158,159]
let cellSize = 0



//get pixelart file (alpha on empty)
//get pixelart dimensions
gm('input/file2.png')
.size(function (err, size) {
if (!err) {
    dimensions[0] = size.width;
    dimensions[1] = size.height;
    //get cell size
    cellSize = dimensions[0] / gridSize[0]

    console.log('dimensions:', dimensions);
    console.log('grid:', gridSize);
    console.log('cell size:', cellSize);

    //set size of texture to cell size
    gm('temp/texture1.jpg')
        .resize(cellSize)
        .write('temp/textureBase.png', function(err) {
            if(!err) {
                console.log("Written texture base.");
                textureRow();
            }
        });
} else {
    console.error(err);
}
});

//draw row of x stitch texture
const textureRow = () => {
    let g = gm('temp/textureBase.png');
    for (let x = 1; x<gridSize[0] ;x++) {
        g.append('temp/textureBase.png', true);
    }

    g.write('temp/montagerow.png', function(err) {
        if(!err) {
            console.log("Written montage row.");
            textureFull()
        } else {
            console.log(err)
        }
    });
};

//draw full image of x stitch texture using rows above
const textureFull = () => {
    let r = gm('temp/montagerow.png');

    for (let y = 1; y<gridSize[1] ;y++) {
        r.append('temp/montagerow.png');
    }

    r.write('temp/montage.png', function(err) {
        if(!err) {
            console.log("Written montage image.")
            composeTogether();
        }
        else{console.log(err)}
    });
}

//overlay texture over file, cut out alpha from original file
const composeTogether = () => {
    gm()
        .command("composite")
        .in('-compose', 'Overlay')
        .in( 'input/file2.png' )
        .in( 'temp/montage.png')
        .write('temp/fullImg.png', function(err) {
            if(!err) {
                console.log("Written overlayimage.");
                gm()
                    .command("composite")
                    .compose("CopyOpacity")
                    .in('input/file2.png', 'temp/fullImg.png', "-matte")
                    .write('final/outputFile.png', function(err){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("Success!");
                        }
                    });

            }
            else{console.log(err)}
        });
}

//EXTENSION
//build AIDA background based on pixel art dimensions
//get dimensions
//build image of tiled AIDA texture
//save final file

