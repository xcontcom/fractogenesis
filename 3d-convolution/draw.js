var k;
var array=[];
var size=2;
var sizexy;

function activation(t){
	//if(t) return t;
	
	/*
	if(t>1) return 1;
	if(t<-1) return -1;
	return t;
	*/
	
	if(t<-16) return -16;
	if(t>16) return 16;
	return Math.round(t);
}

function convolution(array, core){
	var xm, xp, ym, yp, zm, zp;
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
				
				temp[z][y][x]=activation(
					array[zm][ym][xm]*core[0]+array[zm][ym][x]*core[1]+array[zm][ym][xp]*core[2]+
					array[zm][y][xm]*core[3]+array[zm][y][x]*core[4]+array[zm][y][xp]*core[5]+
					array[zm][yp][xm]*core[6]+array[zm][yp][x]*core[7]+array[zm][yp][xp]*core[8]+
					
					array[z][ym][xm]*core[9]+array[z][ym][x]*core[10]+array[z][ym][xp]*core[11]+
					array[z][y][xm]*core[12]+array[z][y][x]*core[13]+array[z][y][xp]*core[14]+
					array[z][yp][xm]*core[15]+array[z][yp][x]*core[16]+array[z][yp][xp]*core[17]+
					
					array[zp][ym][xm]*core[18]+array[zp][ym][x]*core[19]+array[zp][ym][xp]*core[20]+
					array[zp][y][xm]*core[21]+array[zp][y][x]*core[22]+array[zp][y][xp]*core[23]+
					array[zp][yp][xm]*core[24]+array[zp][yp][x]*core[25]+array[zp][yp][xp]*core[26]
				);
			
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





/*
function init(){
	var arr=[94, 94, 94, 94, 94, 94, 94, 87, 87, 87, 87, 87, 87, 87, 86, 86, 86, 86, 86, 86, 86, 85, 85, 85, 85, 85, 85, 85, 82, 82, 82, 81, 81, 78, 78, 79, 79, 77, 77, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 74, 74, 74, 74, 73, 73, 73];
	var cx=15;
	var canvas=document.createElement('canvas');
	document.body.appendChild(canvas);
	var context=canvas.getContext('2d');
	canvas.width=950;
	canvas.height=950;
	context.fillStyle='rgb(0,0,0)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle='rgb(255,255,255)';
	context.beginPath();
	context.moveTo(0*cx, 950-arr[0]/0.1);
	for(var x=0;x<arr.length;x++){
		context.fillRect(x*cx, 950-arr[x]/0.1, 2, 2);
		context.lineTo(x*cx, 950-arr[x]/0.1);
	}
	context.strokeStyle = '#ff0000';
	context.stroke();
}
*/





function init(){
	nexta();
}

/*
function init(){

	var array=[
		966.88,
		1793.29,
		1896.63,
		992.42,
		1562.53,
		1171.68,
		942.82,
		1339.35,
		966.29,
		1193.51,
		1341.64,
		933.745,
		1729.08,
		1406.83,
		1364.53,
		953.5,
		1335.79,
		1165.25,
		1368.918,
		1268.16,
		1445.852,
		1110.976,
		1119.65,
		1142.655,
		1368.372,
		1297.97,
		1008.21,
		1051.828,
		1494.25,
		1284.34,
		1281.15,
		1510.92,
		991.39,
		1286.73,
		1097.13,
		1465.97,
		1227.97,
		1196.25,
		1406.38,
		1455.09,
		1548.91,
		1278.54,
		1448.79,
		1449.98,
		2815.68,
		1400.83,
		1399.26,
		812.71,
		1429.51,
		1308.67,
		1483.15,
		1717.45,
		1528.25,
		1127.19,
		1577.49,
		1523.78,
		1674.75,
		1263.98,
		1432.68,
		903.91,
		1564.57,
		1497.37,
		1506.22,
		1415.44,
		1528.57,
		1733.23,
		1837.21,
		1402.24,
		1334.12,
		1382.62,
		1179.55,
		1282.01,
		1311.29,
		1559.7,
		1293.6,
		1471.01,
		1456.12,
		1614.72,
		1570.57,
		1762.63,
		1811.59,
		1659.06,
		1909.05,
		1940.76
	];

	var cx=9;
	var canvas=document.createElement('canvas');
	document.body.appendChild(canvas);
	var context=canvas.getContext('2d');
	canvas.width=800;
	canvas.height=800;
	context.fillStyle='rgb(0,0,0)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle='rgb(255,255,255)';
	
	context.beginPath();
	context.moveTo(0*cx, 800-array[0]/4);
	for(var x=0;x<array.length;x++){
		context.fillRect(x*cx, 800-array[x]/4, 2, 2);
		context.lineTo(x*cx, 800-array[x]/4);
	}
	context.strokeStyle = '#ff0000';
	context.stroke();
	
	context.fillStyle='rgb(255,255,255)';
	context.beginPath();
	context.moveTo(0*cx, 800-array[0]/4);
	for(var x=2;x<array.length-2;x++){
		q=(array[x-2]+array[x-1]+array[x]+array[x+1]+array[x+2])/5;
		context.fillRect(x*cx, 800-q/4, 2, 2);
		context.lineTo(x*cx, 800-q/4);
	}
	context.strokeStyle = '#00ff00';
	context.stroke();
	
	
	context.beginPath();
	context.strokeStyle = '#ffffff';
	context.moveTo(0*cx, 800-bmr(94)/4);
	context.lineTo(array.length*cx, 800-bmr(71)/4);
	context.stroke();
}
function bmr(x){
	return 13.397*x+4.799*178-5.677*33+88.362;
}

*/

function nexta(){
	array=[[[1]]];
	var core=[];
	for(var i=0;i<27;i++){
		core[i]=Math.floor(Math.random()*32-16);
		//core[i]=Math.random()*32-16;
	}
	
	core[26]=core[0];
	core[25]=core[1];
	core[24]=core[2];
	core[23]=core[3];
	core[22]=core[4];
	core[21]=core[5];
	core[20]=core[6];
	core[19]=core[7];
	core[18]=core[8];
	core[17]=core[9];
	core[16]=core[10];
	core[15]=core[11];
	core[14]=core[12];
	
	
	core[26]=core[0];
	core[24]=core[0];
	core[20]=core[0];
	core[18]=core[0];
	core[8]=core[0];
	core[6]=core[0];
	core[2]=core[0];
	
	
	
	core[7]=core[1];
	core[19]=core[1];
	core[25]=core[1];
	
	core[5]=core[3];
	core[21]=core[3];
	core[23]=core[3];
	
	core[11]=core[9];
	core[15]=core[9];
	core[17]=core[9];
	/**/
	
	
	
	/*
	var q=Math.floor(Math.random()*32-16);
	core[0]=q;
	core[2]=q;
	core[6]=q;
	core[8]=q;
	core[18]=q;
	core[20]=q;
	core[24]=q;
	core[26]=q;
	
	q=Math.floor(Math.random()*32-16);
	core[1]=q;
	core[7]=q;
	core[19]=q;
	core[25]=q;

	q=Math.floor(Math.random()*32-16);
	core[3]=q;
	core[5]=q;
	core[21]=q;
	core[23]=q;

	q=Math.floor(Math.random()*32-16);
	core[9]=q;
	core[11]=q;
	core[15]=q;
	core[17]=q;

	q=Math.floor(Math.random()*32-16);
	core[4]=q;
	core[10]=q;
	core[12]=q;
	core[14]=q;
	core[16]=q;
	core[22]=q;
	*/
	
	
	/*
	var q;

	q=Math.floor(Math.random()*32-16);
	core[0]=q;
	core[26]=q;
	q=Math.floor(Math.random()*32-16);
	core[1]=q;
	core[25]=q;
	q=Math.floor(Math.random()*32-16);
	core[2]=q;
	core[24]=q;
	q=Math.floor(Math.random()*32-16);
	core[3]=q;
	core[23]=q;
	q=Math.floor(Math.random()*32-16);
	core[4]=q;
	core[22]=q;
	q=Math.floor(Math.random()*32-16);
	core[5]=q;
	core[21]=q;
	q=Math.floor(Math.random()*32-16);
	core[6]=q;
	core[20]=q;
	q=Math.floor(Math.random()*32-16);
	core[7]=q;
	core[19]=q;
	q=Math.floor(Math.random()*32-16);
	core[8]=q;
	core[18]=q;
	q=Math.floor(Math.random()*32-16);
	core[9]=q;
	core[17]=q;
	q=Math.floor(Math.random()*32-16);
	core[10]=q;
	core[16]=q;
	q=Math.floor(Math.random()*32-16);
	core[11]=q;
	core[15]=q;
	q=Math.floor(Math.random()*32-16);
	core[12]=q;
	core[14]=q;
	q=Math.floor(Math.random()*32-16);
	core[13]=q;
	*/
	
	
	//core=[2,-10,1,-16,10,-3,-2,4,8,5,-8,-8,2,2,2,-8,-8,5,8,4,-2,-3,10,-16,1,-10,2];
	//core=[14,9,-11,1,14,12,-6,-5,-14,9,3,-3,15,15,15,-3,3,9,-14,-5,-6,12,14,1,-11,9,14];
	
	
	
	//core=[12,-11,14,-10,8,-10,11,-11,-15,14,-3,5,-11,-5,-11,5,-3,14,-15,-11,11,-10,8,-10,14,-11,12];
	//core=[11,-3,0,-16,-9,6,11,-16,9,10,3,-1,-8,-1,-8,-1,3,10,9,-16,11,6,-9,-16,0,-3,11]
	//core=[15,-11,15,0,-6,-8,7,-3,2,2,-12,-6,-1,11,-1,-6,-12,2,2,-3,7,-8,-6,0,15,-11,15];
	//core=[-1,-11,0,-2,4,9,-14,5,13,-14,13,-8,15,14,15,-8,13,-14,13,5,-14,9,4,-2,0,-11,-1];
	
	
	//core=[5,1,5,-16,8,-16,5,1,5,-8,8,-8,8,14,8,-8,8,-8,5,1,5,-16,8,-16,5,1,5];
	//core=[4,-12,4,11,12,11,4,-12,4,-4,12,-4,12,-8,12,-4,12,-4,4,-12,4,11,12,11,4,-12,4];
	//core=[-12,8,-12,3,-2,3,-12,8,-12,-1,-2,-1,-2,14,-2,-1,-2,-1,-12,8,-12,3,-2,3,-12,8,-12];
	
	//core=[-5,3,-5,1,0,1,-5,3,-5,3,0,3,0,13,0,3,0,3,-5,3,-5,1,0,1,-5,3,-5];
	
	
	//core[]=[-6,-7,-13,-9,-12,-15,14,14,-3,13,-8,-7,-2,-5,-14,5,7,-4,14,-16,0,-3,-7,-14,3,-3,-1]; //0
	//core[]=[12,-4,1,-1,-9,-15,1,-3,3,11,-16,0,4,13,-12,2,-12,2,15,4,-2,-10,3,7,-8,-8,10]; //2
	//core[]=[12,4,-7,-14,-5,-14,15,3,15,5,11,-8,13,2,-8,1,4,-16,-15,-13,7,11,3,-13,15,14,3]; //2
	//core[]=[14,-14,14,-5,-13,-3,5,10,2,-4,-12,-4,12,6,11,1,10,-15,3,4,5,3,15,-4,-16,1,14]; //2
	
	/*
	for(var i=0;i<9;i++){
		core[i]=0;
		core[i+18]=0;
	}
	core[4]=1;
	core[22]=1;
	*/
	
	
	//core=[13,-5,5,14,-7,-14,-13,-5,6,7,7,-9,9,-16,9,-9,7,7,6,-5,-13,-14,-7,14,5,-5,13];
	
	//core=[15,-2,10,-3,-14,-15,6,-1,7,-9,-13,12,4,-15,4,12,-13,-9,7,-1,6,-15,-14,-3,10,-2,15];
	
	//core=[-8,-13,14,0,-10,-7,6,14,4,-1,-1,5,-4,-3,-4,5,-1,-1,4,14,6,-7,-10,0,14,-13,-8];
	//core=[3,-3,13,-5,-16,3,12,-15,-15,-2,14,9,-15,2,-15,9,14,-2,-15,-15,12,3,-16,-5,13,-3,3];
	
	
	//core=[10,-4,-8,0,8,4,12,-11,-1,-1,-11,15,-11,-5,-11,15,-11,-1,-1,-11,12,4,8,0,-8,-4,10];
	
	
	//core=[3,-2,12,-8,6,2,14,-9,11,9,3,-14,-2,8,-2,-14,3,9,11,-9,14,2,6,-8,12,-2,3];
	//core=[-3,2,-3,5,-11,3,-3,0,-3,7,15,10,4,-13,4,10,15,7,-3,0,-3,3,-11,5,-3,2,-3];
	//core=[1,0,1,-6,-16,11,1,14,1,-14,12,-7,14,3,14,-7,12,-14,1,14,1,11,-16,-6,1,0,1];
	//core=[8,-16,8,15,5,-2,8,-12,8,-13,-10,-14,10,10,10,-14,-10,-13,8,-12,8,-2,5,15,8,-16,8];
	//core=[-2,6,-2,13,-4,13,-2,-1,-2,-2,-11,13,-16,12,-16,13,-11,-2,-2,-1,-2,13,-4,13,-2,6,-2];
	//core=[15,-3,15,-11,-11,3,15,-16,15,-11,2,6,-12,5,-12,6,2,-11,15,-16,15,3,-11,-11,15,-3,15];
	
	//core=[-14,-5,5,-5,7,-9,12,-12,12,-8,-3,3,-3,-1,-3,3,-3,-8,12,-12,12,-9,7,-5,5,-5,-14];
	
	//core=[-3,-7,4,-7,10,-7,13,-7,11,-7,14,-7,-2,14,-2,-7,14,-7,11,-7,13,-7,10,-7,4,-7,-3];
	
	//core=[-1,-13,15,10,-9,10,8,-13,5,-3,-9,-3,-5,2,-5,-3,-9,-3,5,-13,8,10,-9,10,15,-13,-1];
	//core=[-16,7,8,-4,-4,-4,-15,7,4,2,9,2,3,3,3,2,9,2,4,7,-15,-4,-4,-4,8,7,-16];
	
	//core=[-7,13,-7,12,-9,12,-7,13,-7,-5,-11,-5,12,-7,12,-5,-11,-5,-7,13,-7,12,-9,12,-7,13,-7];
	//core=[-4,12,-4,-3,-14,-3,-4,12,-4,2,5,2,-3,1,-3,2,5,2,-4,12,-4,-3,-14,-3,-4,12,-4];
	
	//core=[-8,-6,-2,-2,-9,13,-8,-6,-5,14,4,10,-15,-10,-15,10,4,14,-5,-6,-8,13,-9,-2,-2,-6,-8];
	
	//core=[-1,12,-1,-8,6,-8,-1,12,-1,-1,11,-1,10,4,10,-1,11,-1,-1,12,-1,-8,6,-8,-1,12,-1];
	//core=[2,10,2,15,-15,15,2,10,2,-15,8,-15,-9,13,-9,-15,8,-15,2,10,2,15,-15,15,2,10,2];
	
	//core=[10,-1,10,-13,2,-13,10,-1,10,-9,13,-9,-2,5,-2,-9,13,-9,10,-1,10,-13,2,-13,10,-1,10];
	
	//core=[-10,-13,-10,14,-13,14,-10,-13,-10,2,11,2,-2,-13,-2,2,11,2,-10,-13,-10,14,-13,14,-10,-13,-10];
	//core=[-3,0,-3,7,-9,7,-3,0,-3,-11,12,-11,4,-16,4,-11,12,-11,-3,0,-3,7,-9,7,-3,0,-3];
	//core=[-3,2,-3,4,-16,4,-3,2,-3,-9,9,-9,13,-5,13,-9,9,-9,-3,2,-3,4,-16,4,-3,2,-3];
	
	//core=[13,-5,13,-16,15,-16,13,-5,13,-3,-16,-3,0,-13,0,-3,-16,-3,13,-5,13,-16,15,-16,13,-5,13];
	
	
	//core=[9,-12,9,-6,-12,-6,9,-12,9,11,1,11,-11,11,-11,11,1,11,9,-12,9,-6,-12,-6,9,-12,9];
	
	//core=[-3,-3,-3,13,-5,13,-3,-3,-3,8,11,8,-12,2,-12,8,11,8,-3,-3,-3,13,-5,13,-3,-3,-3];
	
	//core=[-4,12,-4,0,-10,0,-4,12,-4,11,-15,11,2,9,2,11,-15,11,-4,12,-4,0,-10,0,-4,12,-4];
	//core=[-6,-1,-6,8,-16,8,-6,-1,-6,-2,8,-2,2,7,2,-2,8,-2,-6,-1,-6,8,-16,8,-6,-1,-6];
	
	//core=[5,-11,5,-3,-15,-3,5,-11,5,9,4,9,-1,8,-1,9,4,9,5,-11,5,-3,-15,-3,5,-11,5];
	
	//core=[-8,-13,-8,-14,-13,-14,-8,-13,-8,5,-2,5,-3,-16,-3,5,-2,5,-8,-13,-8,-14,-13,-14,-8,-13,-8]; //0
	
	
	//core=[9,-15,9,-4,6,-4,9,-15,9,11,-11,11,-14,3,-14,11,-11,11,9,-15,9,-4,6,-4,9,-15,9];
	//core=[9,15,9,-4,6,-4,9,-15,9,11,-11,11,-14,3,-14,11,-11,11,9,-15,9,-4,6,-4,9,15,9];
	
	//core=[1,-15,1,-7,0,-7,1,-15,1,13,-13,13,-4,7,-4,13,-13,13,1,-15,1,-7,0,-7,1,-15,1];
	
	//core=[-1,-10,-1,-10,13,-10,-1,-10,-1,13,-9,13,-13,12,-13,13,-9,13,-1,-10,-1,-10,13,-10,-1,-10,-1];
	//core=[7,-4,7,-15,6,-15,7,-4,7,-1,0,-1,10,4,10,-1,0,-1,7,-4,7,-15,6,-15,7,-4,7];
	
	//core=[-1,-8,-1,11,1,11,-1,-8,-1,3,-1,3,-3,-5,-3,3,-1,3,-1,-8,-1,11,1,11,-1,-8,-1];
	
	//core=[-2,10,-2,12,12,12,-2,10,-2,14,7,14,-15,-13,-15,14,7,14,-2,10,-2,12,12,12,-2,10,-2];
	//core=[-1,1,-1,6,12,6,-1,1,-1,11,-6,11,12,-8,12,11,-6,11,-1,1,-1,6,12,6,-1,1,-1];
	
	//core=[-16,8,-16,13,-16,13,-16,8,-16,5,4,5,1,3,1,5,4,5,-16,8,-16,13,-16,13,-16,8,-16];
	
	//core=[0,-1,0,9,13,9,0,-1,0,13,-5,13,-14,11,-14,13,-5,13,0,-1,0,9,13,9,0,-1,0];
	
	//core=[12,-12,12,-14,-14,-14,12,-12,12,-11,14,-11,-3,10,-3,-11,14,-11,12,-12,12,-14,-14,-14,12,-12,12];
	
	//core=[9,8,9,-4,-15,-4,9,8,9,-8,6,-8,6,-16,6,-8,6,-8,9,8,9,-4,-15,-4,9,8,9];
	
	//core=[-3,5,-3,-1,0,-1,-3,5,-3,-6,9,-6,10,-13,10,-6,9,-6,-3,5,-3,-1,0,-1,-3,5,-3];
	//core=[-7,9,-7,7,4,7,-7,9,-7,3,-5,3,-12,-6,-12,3,-5,3,-7,9,-7,7,4,7,-7,9,-7];
	//core=[12,-3,12,-13,-7,-13,12,-3,12,-13,-8,-13,4,14,4,-13,-8,-13,12,-3,12,-13,-7,-13,12,-3,12];
	//core=[-6,-13,-6,7,15,7,-6,-13,-6,10,-5,10,-2,-12,-2,10,-5,10,-6,-13,-6,7,15,7,-6,-13,-6];
	
	//core=[6,-15,6,12,-13,12,6,-15,6,-15,5,-15,-4,-15,-4,-15,5,-15,6,-15,6,12,-13,12,6,-15,6];
	
	//core=[-8,11,-8,-1,5,-1,-8,11,-8,9,-4,9,-4,-7,-4,9,-4,9,-8,11,-8,-1,5,-1,-8,11,-8];
	//core=[14,-3,14,-3,7,-3,14,-3,14,-16,-13,-16,5,12,5,-16,-13,-16,14,-3,14,-3,7,-3,14,-3,14];
	
	//core=[5,-4,5,6,-15,6,5,-4,5,-5,0,-5,-3,-8,-3,-5,0,-5,5,-4,5,6,-15,6,5,-4,5];
	
	//core[Math.floor(Math.random()*28)]=Math.floor(Math.random()*32-16);
	
	//core=[5,9,5,0,-7,0,5,9,5,-13,12,-13,-15,-10,-15,-13,12,-13,5,9,5,0,-7,0,5,9,5];
	
	//core=[-4,10,-4,3,-11,3,-4,10,-4,-12,-9,-12,-1,-8,-1,-12,-9,-12,-4,10,-4,3,-11,3,-4,10,-4];
	
	
	//core=[3,10,3,1,-4,1,3,10,3,0,6,0,3,2,3,0,6,0,3,10,3,1,-4,1,3,10,3]; //!!
	//core=[-13,15,-13,-8,-10,-8,-13,15,-13,-1,-7,-1,13,-6,13,-1,-7,-1,-13,15,-13,-8,-10,-8,-13,15,-13];
	//core=[1,6,1,8,1,8,1,6,1,3,-3,3,4,6,4,3,-3,3,1,6,1,8,1,8,1,6,1];

	//core=[14,-9,14,9,8,9,14,-9,14,15,1,15,13,1,13,15,1,15,14,-9,14,9,8,9,14,-9,14];
	
	//core=[5,10,5,11,8,11,5,10,5,2,-6,2,-1,1,-1,2,-6,2,5,10,5,11,8,11,5,10,5];
	//core=[-3,6,-3,4,10,4,-3,6,-3,-10,-7,-10,-10,-9,-10,-10,-7,-10,-3,6,-3,4,10,4,-3,6,-3];
	
	//core=[4,-2,4,-9,-1,-9,4,-2,4,-10,11,-10,-11,-3,-11,-10,11,-10,4,-2,4,-9,-1,-9,4,-2,4];
	
	//core=[9,12,9,-7,-2,3,9,12,9,-5,-15,15,-12,-16,-12,15,-15,-5,9,12,9,3,-2,-7,9,12,9];
	
	//core=[-1,8,-1,8,14,8,-1,8,-1,13,4,13,9,-6,9,13,4,13,-1,8,-1,8,14,8,-1,8,-1];
	//core=[10,10,10,-3,10,-3,10,10,10,8,6,8,0,-11,0,8,6,8,10,10,10,-3,10,-3,10,10,10];
	//core=[3,-12,3,-9,-6,-9,3,-12,3,-1,0,-1,-16,-4,-16,-1,0,-1,3,-12,3,-9,-6,-9,3,-12,3];
	
	//core=[-9,-1,-9,-13,9,-13,-9,-1,-9,-8,-3,-8,-5,-4,-5,-8,-3,-8,-9,-1,-9,-13,9,-13,-9,-1,-9];
	
	//core=[13,-13,13,9,-1,9,13,-13,13,-14,13,-14,-1,1,-1,-14,13,-14,13,-13,13,9,-1,9,13,-13,13];
	//core=[-6,1,-6,3,13,3,-6,1,-6,8,-16,8,14,0,14,8,-16,8,-6,1,-6,3,13,3,-6,1,-6];
	
	//core=[-11,12,-11,-5,13,-5,-11,12,-11,-10,-11,-10,-14,9,-14,-10,-11,-10,-11,12,-11,-5,13,-5,-11,12,-11];
	
	
	for(var i=0;i<8;i++){
		array=padding(array,0);
		array=convolution(array,core);
	}
	console.log('core=['+core.join(',')+'];');
	
	clearpage();
}


function clearpage(){
	sizexy=array.length;
	k=0;
	
	/*
	var canv=document.getElementById('canv2');
	var canvas1=document.createElement('canvas');
	var canvasId="c0"+k;
	canvas1.setAttribute("id", canvasId);
	var div1=document.createElement('div');
	div1.setAttribute("class", "canv0");
	var div2=document.createElement('div');
	div2.appendChild(canvas1);
	div1.appendChild(div2);
	canv.appendChild(div1);
	
	context=canvas1.getContext('2d');
	canvas1.width=sizexy*size, canvas1.height=sizexy*size;
	context.fillStyle = 'rgb(0,0,0)';
	context.fillRect (0, 0, sizexy*size, sizexy*size);
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect (255*size, 255*size, size, size);

	for(var z=0;z<sizexy;z++){
		context.fillStyle = 'rgb('+z*2+','+z*2+','+z*2+')';
		for(var x=0;x<sizexy;x++){
			for(var y=0;y<sizexy;y++){
				if(array[z][y][x]>0) context.fillRect(x*size, y*size, 1*size, 1*size);
			}
		}
	}
	*/
	
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