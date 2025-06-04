var k;
var array=[];
var size=2;
var sizexy;

function cell(array, r){
	var xm, xp, ym, yp, zm, zp, q;
	var temp=[];
	var l2=array.length;
	
	for(var z=0;z<l2;z++){
		zm=z-1;
		if(zm<0) zm=l2+zm;
		zp=z+1;
		if(zp>=l2) zp=zp-l2;
		temp[z]=[];
		for(var y=0;y<l2;y++){
			ym=y-1;
			if(ym<0) ym=l2+ym;
			yp=y+1;
			if(yp>=l2) yp=yp-l2;
			temp[z][y]=[];
			for(var x=0;x<l2;x++){
				xm=x-1;
				if(xm<0) xm=l2+xm;
				xp=x+1;
				if(xp>=l2) xp=xp-l2;
				
				q=
					array[zm][ym][xm]+array[zm][ym][x]+array[zm][ym][xp]+
					array[zm][y][xm]+array[zm][y][x]+array[zm][y][xp]+
					array[zm][yp][xm]+array[zm][yp][x]+array[zm][yp][xp]+
					
					array[z][ym][xm]+array[z][ym][x]+array[z][ym][xp]+
					array[z][y][xm]+array[z][y][x]*27+array[z][y][xp]+
					array[z][yp][xm]+array[z][yp][x]+array[z][yp][xp]+
					
					array[zp][ym][xm]+array[zp][ym][x]+array[zp][ym][xp]+
					array[zp][y][xm]+array[zp][y][x]+array[zp][y][xp]+
					array[zp][yp][xm]+array[zp][yp][x]+array[zp][yp][xp];
				temp[z][y][x]=r[q];	
			}
		}
	}
	
	return temp;
}

function padding(array,kk){
	if(array.length==1) return [[[1,0],[0,0]],[[0,0],[0,0]]];
	var temp=[];
	var l2=array.length;
	for(var z=0;z<l2;z++){
		temp[z*2+0]=[];
		
		temp[z*2+1]=[];
		for(var y=0;y<l2;y++){
			temp[z*2+0][y*2+0]=[];
			temp[z*2+0][y*2+1]=[];
			
			temp[z*2+1][y*2+0]=[];
			temp[z*2+1][y*2+1]=[];
			for(var x=0;x<l2;x++){
				temp[z*2+0][y*2+0][x*2+0]=array[z][y][x];
				temp[z*2+0][y*2+0][x*2+1]=array[z][y][x]*kk;
				
				temp[z*2+0][y*2+1][x*2+0]=array[z][y][x]*kk;
				temp[z*2+0][y*2+1][x*2+1]=array[z][y][x]*kk;
				
				temp[z*2+1][y*2+0][x*2+0]=array[z][y][x]*kk;
				temp[z*2+1][y*2+0][x*2+1]=array[z][y][x]*kk;
				
				temp[z*2+1][y*2+1][x*2+0]=array[z][y][x]*kk;
				temp[z*2+1][y*2+1][x*2+1]=array[z][y][x]*kk;
			}
		}
	}
	return temp;
}

function getrule(){
	var r=[];
	for(var i=0;i<54;i++){
		r[i]=Math.round(Math.random());
	}
	return r;
}


function init(){
	nexta();
}

function nexta(){
	array=[[[1]]];
	var r=getrule();
	for(var i=0;i<8;i++){
		array=padding(array,0);
		array=cell(array,r);
	}
	console.log('r=['+r.join(',')+'];');
	clearpage();
}


function clearpage(){
	size=2;
	sizexy=array.length;
	k=0;	
	var hello=document.getElementById('console-log0');
	hello.innerHTML=k;
	var canvas, context, rand;
	canvas=document.getElementById('myCanvas');
	context=canvas.getContext('2d');
	canvas.width=sizexy*size, canvas.height=sizexy*size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect (0, 0, sizexy*size, sizexy*size);
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (255*size, 255*size, size, size);
	
	for(var x=0;x<sizexy;x++){
		for(var y=0;y<sizexy;y++){
			if(array[k][y][x]>0) context.fillRect(x*size, y*size, 1*size, 1*size);
		}
	}
}

function test(){
	countpoints();
}

var timerId;
function start(){
	if(!timerId){
		timerId = setInterval(function() {
			countpoints();
		}, 1);
	}
	
};
function stop(){
	if(timerId){
		clearInterval(timerId);
		timerId=false;
	}
};
function countpoints(){
	k++;
	if(k==sizexy) k=0;
	var canvas, context;
	

	canvas=document.getElementById('myCanvas');
	context=canvas.getContext('2d');
	canvas.width=sizexy*size, canvas.height=sizexy*size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect (0, 0, sizexy*size, sizexy*size);
	context.fillStyle = 'rgb(255,255,255)';

	for(var x=0;x<sizexy;x++){
		for(var y=0;y<sizexy;y++){
			if(array[k][y][x]>0) context.fillRect(x*size, y*size, 1*size, 1*size);
		}
	}
	
	var hello=document.getElementById('console-log0');
	hello.innerHTML=k;

}