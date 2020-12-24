function drawPoint(x, y, level, pix){
	var truex = x + size * 2;
	var truey = -y + size;
	var index = truex + truey * width;
	var alpha = 255 - level * level * 255 / depth / depth;
	pix[index*4+3] = alpha;
}

function drawRelativePoint(x, y, blocksize, level, pix){
	var index = x + y * blocksize;
	var alpha = 255 - level * level * 255 / depth / depth;
	pix[index*4+3] = alpha;
}

function drawBlock(blockx, blocky, block, size, imgd){
	for (var rx = blockx; rx < blockx + block; rx += 1) {
		for (var ry = blocky; ry < blocky + block; ry += 1) {
			cal:{
				var x = 0, y = 0;
				var crx = (rx + 0.0) / size;
				var cry = (ry + 0.0) / size;
				for (var i = 0; i < depth; i += 1) {
					var tx = x * x - y * y + crx;
					var ty = 2 * x * y + cry;
					x = tx;
					y = ty;
					if ((x*x + y*y) > 3) {
						drawRelativePoint(rx-blockx, ry-blocky, block, i, imgd.data);
						break cal;
					}
				}
				drawRelativePoint(rx-blockx, ry-blocky, block, depth, imgd.data);
			}
		}
	}
	cxt.putImageData(imgd, size * 2 + blockx, size + blocky);
}

function update(imgd){
	if (blocky < size) {
		drawBlock(blockx, blocky, block, size, imgd);
		blockx += block;
		if (blockx >= size) {
			blockx = -2 * size;
			blocky += block;
		}
		setTimeout("update(imgdata)", 0);
	}
}


var size = 200, width, height;
var depth = 1000;
var block = 20.0;
var blockx = -2 * size, blocky = -size;
var pix;
var canvas = document.getElementById("myCanvas");
var cxt = canvas.getContext("2d");
width = size*3, height = size*2;
cxt.canvas.setAttribute("height", height+"px");
cxt.canvas.setAttribute("width", width+"px");

var imgdata = cxt.createImageData(block, block);
//setInterval(update, 1, imgdata);
setTimeout("update(imgdata)", 8);
