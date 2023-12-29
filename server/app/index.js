const fs = require('fs');
//var gm = require('gm').subClass({ imageMagick: '7+' });
var gm = require('gm').subClass({ imageMagick: true });


const textureImg = async (inputGridSize, inputBorderSize, inputBackgroundColor, inputFile) => {
    
    let dimensions = [0,0];
    let gridSize = inputGridSize;
    let cellSize = 10;
    let border = inputBorderSize;
    let backgroundColor = inputBackgroundColor;

    let inputFileBuffer = Buffer.from(inputFile.buffer, 'base64'); //input image buffer from express

    let stitchTextureResized //image buffer resized to cell size
    let stitchTextureRow
    let stitchTextureFull
    let composedImg

    let aidaTextureResized
    let aidaTextureRow
    let aidaTextureFull

    let finalImg

    try {
        //get size of input file
        //stores to dimensions[vector2array] and cellSize[int]
        let data = await getSizes(gridSize, inputFileBuffer)
        dimensions = data.dimensions
        cellSize = data.cellSize
        
    
        //Resize the base images to the cell size of the input img
        let textures = await resizeTextures(cellSize, gridSize)
        stitchTextureResized = textures.stitchTextureResized
        aidaTextureResized = textures.aidaTextureResized


        return(['ya got it', dimensions, cellSize, stitchTextureResized])

    } catch (error) {
        console.error('Error:', error.message);
    }
};


// ~~~~~~~~~~~~~~~~~~ Methods below ~~~~~~~~~~~~~~~~~~


const getSizes = (gridSize, inputFile) => {
    //get pixelart file (alpha on empty)
    //get pixelart dimensions

    let sizes = {
        dimensions: [],
        cellSize: 0
    }

    return new Promise((resolve,reject) => {
        gm(inputFile)
        .size(function (err, size) {
            if (!err) {
                sizes.dimensions.push(size.width)
                sizes.dimensions.push(size.height)
                //get cell size
                sizes.cellSize = sizes.dimensions[0] / gridSize[0]
    
                //console.log('inner', sizes)
    
                resolve(sizes)
            } else {
                console.error(err);
            }
        })
    });

}

//TODO: toBuffer doesnt work in nodegm, just switch to JIMP instead

const resizeTextures = async (cellSize, gridSize) => {
    let stitchTextureResized, aidaTextureResized

    stitchTextureResized = gm('textureMain.jpg')
    .resize(cellSize)
    .toBuffer('JPEG', (err, buffer) => {
        if (err) {
          console.error('Error in the first operation:', err);
          return;
        }
        
        let g = gm(buffer);

        for (let x = 1; x<gridSize[0] ;x++) {
            g.append(buffer, true);
        }
    
        g.write('temp/NEW.png', function(err) {
            if(!err) {
                console.log("Written montage row.");
            } else {
                console.log(err)
            }
        });
    })

    

    // .toBuffer('jpeg', (err, buffer) => {
    //     stitchTextureResized = buffer
    //     if (err) {
    //         console.error(err);
    //     }
    // })

    //set size of texture to cell size
    // await new Promise((resolve,reject) => {
    //     gm('textureMain.jpg')
    //         .resize(cellSize)
    //         .toBuffer('png', (err, buffer) => {
    //             stitchTextureResized = buffer
    //             if (err) {
    //                 console.error(err);
    //             }
    //             resolve()
    //         })
    // })

    // await new Promise((resolve,reject) => {
    //     gm('aida-base.jpg')
    //         .resize(cellSize)
    //         .toBuffer('png', (err, buffer) => {
    //             aidaTextureResized = buffer
    //             if (err) {
    //                 console.error(err);
    //             }
    //             resolve()
    //         });
    // })

     return ({stitchTextureResized, g})
};


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
        .in( 'input/file4.png' )
        .in( 'temp/montage.png')
        .write('temp/fullImg.png', function(err) {
            if(!err) {
                console.log("Written overlayimage.");
                gm()
                    .command("composite")
                    .compose("CopyOpacity")
                    .in('input/file4.png', 'temp/fullImg.png', "-matte")
                    .write('final/outputFile.png', function(err){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("Alpha Written!");
                        }
                    });

                gm()
                    .command("composite")
                    .compose("CopyOpacity")
                    .in('input/file4.png', 'temp/fullImg.png', "-matte")
                    .write('temp/foreground.png', function(err){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("Alpha Temp Written.");
                            aidaRow();
                        }
                    });

            }
            else{console.log(err)}
        });
}


// AIDA BACKGROUND

const aidaRow = () => {
    let g = gm('temp/aida-base.png');

    for (let x = 1; x<gridSize[0]+border[0] ;x++) {
        g.append('temp/aida-base.png', true);
    }

    g.write('temp/aida-row.png', function(err) {
        if(!err) {
            console.log("Written AIDA row.");
            aidaFull()
        } else {
            console.log(err)
        }
    });
};


const aidaFull = () => {
    let r = gm('temp/aida-row.png');

    const writeBg = () => {
        gm('temp/aida-full.png')
            .size(function (err, size) {
                if (!err) {
                    gm(size.width, size.height, backgroundColor)
                        .write("temp/colorbg.png", function (err) {
                            if (err) console.log(err)
                            else {
                                console.log('wrote color background');
                                compositeBg()
                            }
                        });
                } else {
                    console.log(err);
                }
            });
    }

    const compositeBg = () => {
        gm()
            .command("composite")
            .in('-compose', 'Multiply')
            .in( "temp/colorbg.png" )
            .in( 'temp/aida-full.png' )
            .write('temp/colorBgAida.png', function(err) {
                if (err) console.log(err)
                else composeAida()
            });
    }



    for (let y = 1; y<gridSize[1] + border[1]; y++) {
        r.append('temp/aida-row.png');
    }

    r.write('temp/aida-full.png', function(err) {
        if(!err) {
            console.log("Written aida image.")
            writeBg();
            
        }
        else{console.log(err)}
    });

    r.write('final/background-aida.png', function(err) {
        if(!err) {
        }
        else{console.log(err)}
    });
}


const composeAida = () => { //get background and foreground img, center in background and composite together into single img
    let background = 'temp/colorBgAida.png'
    let foreground = 'temp/foreground.png'

    gm()
        .command("composite")
        .geometry(`+${border[0]*(cellSize/2)}+${border[1]*(cellSize/2)}`)
        .in(foreground, background, "-matte")
        .write('final/full-composite-image.png', function(err){
            if(err){
                console.log(err)
            } else {
                console.log("Great Success!");
            }
        });
}


module.exports = { textureImg }