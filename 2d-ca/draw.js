function padding(array,kk){
	if(array.length==1) return [[1,0],[0,0]];
	var temp=[];
	var l2=array.length;
	for(var x=0;x<l2;x++){
		temp[x*2+0]=[];
		temp[x*2+1]=[];
		for(var y=0;y<l2;y++){
			temp[x*2+0][y*2+0]=array[x][y];
			temp[x*2+0][y*2+1]=kk*array[x][y];
			temp[x*2+1][y*2+0]=kk*array[x][y];
			temp[x*2+1][y*2+1]=kk*array[x][y];
		}
	}
	return temp;
}

function cellular(array, rule) {
	const l2 = array.length;
	const temp = new Array(l2); // Preallocate the result array

	for (let x = 0; x < l2; x++) {
		temp[x] = new Int8Array(l2); // Use Int8Array for better performance
		const xm = (x - 1 + l2) % l2; // Precompute x-1 with periodic boundary
		const xp = (x + 1) % l2; // Precompute x+1 with periodic boundary

		for (let y = 0; y < l2; y++) {
			const ym = (y - 1 + l2) % l2; // Precompute y-1 with periodic boundary
			const yp = (y + 1) % l2; // Precompute y+1 with periodic boundary

			// Combine the 9-cell neighborhood into a single number (q)
			const q =
				(array[xm][ym] << 8) | // Top-left
				(array[x][ym] << 7) | // Top-center
				(array[xp][ym] << 6) | // Top-right
				(array[xm][y] << 5) | // Middle-left
				(array[x][y] << 4) | // Center
				(array[xp][y] << 3) | // Middle-right
				(array[xm][yp] << 2) | // Bottom-left
				(array[x][yp] << 1) | // Bottom-center
				array[xp][yp]; // Bottom-right

			// Apply the rule
			temp[x][y] = rule[q];
		}
	}

	return temp;
}



function getrule(){
	var r=[];
	var r2=[];
	for(var i=0;i<18;i++) r[i]=Math.round(Math.random());
	for(var i=0;i<512;i++){
		var q=((i>>4)&1)*8;
		for(var j=0;j<9;j++){
			q+=(i>>j)&1;
		}
		r2[i]=r[q];
	}
	/*
	for(var i=0;i<512;i++){
		r2[i]=Math.round(Math.random());
	}
	*/
	return r2;
}

function init(){
	var t0 = performance.now();
	

	var rule;
	var array;
	for(n=0;n<8;n++){
		array=[[1]];
		rule=rule=getrule();
		for(var ii=0;ii<9;ii++){
			array=padding(array,1);
			array=cellular(array,rule);
		}
		draw(array);
		
	}
	
	var t1 = performance.now();
	console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
}

var k=0;
function draw(array){
	
	size=array.length;
	
	var canv=document.getElementById('canv2');
	var canvas1=document.createElement('canvas');
	var canvasId="c0"+k;
	k++;
	canvas1.setAttribute("id", canvasId);
	var div1=document.createElement('div');
	div1.setAttribute("class", "canv0");
	var div2=document.createElement('div');
	div2.appendChild(canvas1);
	div1.appendChild(div2);
	canv.appendChild(div1);
	
	
	context=canvas1.getContext('2d');
	canvas1.width=size, canvas1.height=size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect (0, 0, size, size);
	context.fillStyle = 'rgb(255,255,255)';

	var c;
	for(var x=0;x<size;x++){
		for(var y=0;y<size;y++){
			c=array[x][y]*255;
			context.fillStyle = 'rgb('+c+','+c+','+c+')';
			context.fillRect (x, y, 1, 1);
			
		}
	}
}
