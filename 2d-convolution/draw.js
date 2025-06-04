function activation(t){

	if(t<-16) return -16;
	if(t>16) return 16;
	return Math.round(t);
	
}

function convolution(array, core){
	var xm, xp, ym, yp;
	var temp=[];
	var l2=array.length;
	for(var x=0;x<l2;x++){
		xm=x-1;
		if(xm<0) xm=l2+xm;
		xp=x+1;
		if(xp>=l2) xp=xp-l2;
		temp[x]=[];
		for(var y=0;y<l2;y++){
			ym=y-1;
			if(ym<0) ym=l2+ym;
			yp=y+1;
			if(yp>=l2) yp=yp-l2;
			
			temp[x][y]=activation(
				array[xm][ym]*core[0]+array[x][ym]*core[1]+array[xp][ym]*core[2]+
				array[xm][y]*core[3]+array[x][y]*core[4]+array[xp][y]*core[5]+
				array[xm][yp]*core[6]+array[x][yp]*core[7]+array[xp][yp]*core[8]
			);
			
		}
	}
	return temp;
}


function padding(array,kk){
	if(array.length==1) return [[1,0],[0,0]];
	var temp=[];
	var l2=array.length;
	for(var x=0;x<l2;x++){
		temp[x*2+0]=[];
		temp[x*2+1]=[];
		for(var y=0;y<l2;y++){
			temp[x*2+0][y*2+0]=array[x][y];
			
			temp[x*2+0][y*2+1]=kk*array[x][y]-0;
			temp[x*2+1][y*2+0]=kk*array[x][y]-0;
			temp[x*2+1][y*2+1]=kk*array[x][y]-0;

		}
	}
	return temp;
}


var ki=0;
function init(){
	var t0 = performance.now();
	
	var core;
	var array;
	for(n=0;n<32;n++){
		array=[[1]];
		core=[];
		for(var i=0;i<9;i++){
			core[i]=Math.floor(Math.random()*32-16);
		}

		for(var i=0;i<8;i++){
			array=padding(array,0);
			array=convolution(array,core);
		}
		draw(array);

		ki++;
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
			c=array[x][y];
			
			if(c<0)
				c=0;
			else
				c=255;
			context.fillStyle = 'rgb('+c+','+c+','+c+')';

			
			context.fillRect (x, y, 1, 1);
			
		}
	}
}
