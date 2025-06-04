var k;
var a=[];
var core=[];
var sizex=256;
var sizey=256;
var size=2;
var xxc=Math.round(sizex/2);
var yyc=Math.round(sizey/2);


function init(){
	nextc();
}

function nextc(){
	core=[];
	for(var j=0;j<9;j++){
		core[j]=Math.floor(Math.random()*32-16);
	}
	clearpage();
}

function clearpage(){
	k=0;
	var hello=document.getElementById('console-log0');
	hello.innerHTML=k;
	var canvas, context, rand;
	canvas=document.getElementById('myCanvas');
	context=canvas.getContext('2d');
	canvas.width=sizex*size, canvas.height=sizey*size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect (0, 0, sizex*size, sizey*size);
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (255*size, 255*size, size, size);
	
	for(var x=0;x<sizex;x++){
		a[x]=[];
		for(var y=0;y<sizey;y++){
			a[x][y]=Math.round(Math.random());
			if (a[x][y]) context.fillRect (x*size, y*size, size, size);
		}
	}
	//a[xxc][yyc]=1;
	//context.fillRect (xxc*size, yyc*size, size, size);
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

function activation(t){
	return t/100;
	if(t>0) return 1;
	if(t<0) return -1;
	return 0;
}

function countpoints(){
	k++;
	var temp=[];
	var canvas, context, xp, yp, xm, ym, q;
	
	canvas=document.getElementById('myCanvas');
	context=canvas.getContext('2d');
	canvas.width=sizex*size, canvas.height=sizey*size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect (0, 0, sizex*size, sizey*size);
	context.fillStyle = 'rgb(255,255,255)';
	
	
	for(var x=0;x<sizex;x++){
		xm=x-1;
		if(xm==-1) xm=sizex-1;
		xp=x+1;
		if(xp==sizex) xp=0;
		//temp[x]=[];
		temp[x]=[];
		for(var y=0;y<sizey;y++){
			ym=y-1;
			if(ym==-1) ym=sizey-1;
			yp=y+1;
			if(yp==sizey) yp=0;
			
			temp[x][y]=activation(
				a[xm][ym]*core[0]+a[x][ym]*core[1]+a[xp][ym]*core[2]+
				a[xm][y]*core[3]+a[x][y]*core[4]+a[xp][y]*core[5]+
				a[xm][yp]*core[6]+a[x][yp]*core[7]+a[xp][yp]*core[8]
			);
			
			/*
			if(temp[x][y]<0) context.fillStyle = 'rgb(0,0,0)';
			if(temp[x][y]==0) context.fillStyle = 'rgb(127,127,127)';
			if(temp[x][y]>0) context.fillStyle = 'rgb(255,255,255)';
			
			context.fillRect(x*size, y*size, 1*size, 1*size);
			*/
			if(temp[x][y]<0) context.fillRect(x*size, y*size, 1*size, 1*size);
			
		}
	}	
	a=temp;
	
	
	var hello=document.getElementById('console-log0');
	hello.innerHTML=k;

}