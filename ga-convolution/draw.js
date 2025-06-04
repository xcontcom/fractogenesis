var PopulationSize=200;
var fitness=[];
var population=[];
var rulesize=9;
var sizex=256;
var sizey=256;//144;
var size=1;

/// local storage functions ///
var PopulationInStorage;
function supportsLocalStorage(){
	return ('localStorage' in window) && window['localStorage'] !== null;
}

function savePopulation(){
	if (!supportsLocalStorage()) { return false; }
	localStorage["cell.in.Storage"] = PopulationInStorage;
	localStorage["cell.population"] = JSON.stringify(population);
	return true;
}
function saveFitness(){
	if (!supportsLocalStorage()) { return false; }
	localStorage["cell.fitness"] = JSON.stringify(fitness);
	return true;	
}
function resumePopulation(){
	if (!supportsLocalStorage()) { return false; }
	PopulationInStorage = (localStorage["cell.in.Storage"] == "true");
	if (!PopulationInStorage) { return false; }
	population=JSON.parse(localStorage["cell.population"]);
	fitness=JSON.parse(localStorage["cell.fitness"]);
	return true;
}
function newPopulation(){
	population=[];
	fitness=[];
	localStorage.clear();
	for(var n=0;n<PopulationSize;n++){
		population[n]=[];
		fitness[n]=0;
		for(var i=0;i<rulesize;i++){
			//population[n][i]=Math.round(Math.random());
			population[n][i]=Math.floor(Math.random()*32-16);
		}
	}
	PopulationInStorage = true;
	savePopulation();
	saveFitness();
	updateCounter();
}
/// local storage functions ///




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
			
			//temp[x*2+0][y*2+1]=0;
			//temp[x*2+1][y*2+0]=0;
			//temp[x*2+1][y*2+1]=kk*array[l2-x-1][l2-y-1];
			
		}
	}
	return temp;
}



function clearpage(){
	var core;
	var array;
	var c;
	for(var n=0;n<PopulationSize;n++){
		var canvas=document.getElementById('c'+n);
		var context=canvas.getContext('2d');
		canvas.width=sizex*size, canvas.height=sizey*size;
		context.fillStyle = 'rgb(0,0,0)';
		context.fillRect (0, 0, sizex*size, sizey*size);
		context.fillStyle = 'rgb(255,255,255)';
		
		/*
		var a=[0];
		var q;
		for(var i=1;i<9;i++) a[i]=0;//Math.round(Math.random());
		for(var i=9;i<sizex;i++){
			q=''+a[a.length-1]+a[a.length-2]+a[a.length-3]+a[a.length-4]+a[a.length-5]+a[a.length-6]+a[a.length-7]+a[a.length-8]+a[a.length-9];
			q=parseInt(q, 2);
			a.push(population[n][q]);
		}
		var a2=[0];
		for(var i=1;i<sizex;i++){
			if(a[i]==1)
				a[i]=a[i-1]+1;
			else
				a[i]=a[i-1]-1;
		}
		for(var x=0;x<sizex;x++){
			for(var y=0;y<sizey;y++){
				q=(a[x]+a[y]+512)%4;
				if(q==0 || q==1) context.fillRect(x*size, y*size, 1, 1);
			}
		}
		*/
		array=[[1]];
		core=population[n];
		for(var i=0;i<8;i++){
			array=padding(array,1);
			array=convolution(array,core);
		}
		for(var x=0;x<sizex;x++){
			for(var y=0;y<sizey;y++){
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
	
	var c3=document.getElementsByName('c3[]');
	for(var i=0;i<c3.length;i++){
		c3[i].checked=false;

	var canvases = document.querySelectorAll('#canv canvas');
	canvases.forEach(c => c.classList.remove('selected'));

	updateCounter();
	}
	
}




function init(){
	if (!resumePopulation()){
		newPopulation();
	}
	var canv=document.getElementById('canv');
	for(var n=0;n<PopulationSize;n++){
		var canvas1=document.createElement('canvas');
		var canvasId="c"+n;
		canvas1.setAttribute("id", canvasId);
		var div1=document.createElement('div');
		div1.setAttribute("class", "canv0");
		var div2=document.createElement('div');
		div2.appendChild(canvas1);
		
		var inp1=document.createElement('input');
		inp1.setAttribute("type", "checkbox");
		inp1.setAttribute("name", "c3[]");
		inp1.setAttribute("value", "1");
		var div3=document.createElement('div');
		inp1.style.display = 'none'; // Hide checkbox
		div3.appendChild(inp1);

		let currentCanvas = canvas1;
		let currentCheckbox = inp1;
		currentCanvas.addEventListener('click', function () {
			currentCheckbox.checked = !currentCheckbox.checked;
			currentCanvas.classList.toggle('selected', currentCheckbox.checked);
			updateCounter();
		});
		
		div1.appendChild(div2);
		div1.appendChild(div3);
		
		canv.appendChild(div1);
	}
	clearpage();
}


function selectc(){
	var c3=document.getElementsByName('c3[]');
	for(var i=0;i<c3.length;i++){
		if(c3[i].checked){
			fitness[i]++;
		}
	}
	saveFitness();
	for(var i=0;i<c3.length;i++){
		c3[i].checked=false;

	var canvases = document.querySelectorAll('#canv canvas');
	canvases.forEach(c => c.classList.remove('selected'));

	updateCounter();
	}
	//clearpage();
}


function sellectall(){
	var c3=document.getElementsByName('c3[]');
	for(var i=0;i<c3.length;i++){
		c3[i].checked=true;
		let canvas = document.getElementById('c'+i);
		if (canvas) canvas.classList.add('selected');
	updateCounter();
	}
}
function unsellectall(){
	var c3=document.getElementsByName('c3[]');
	for(var i=0;i<c3.length;i++){
		c3[i].checked=false;

	var canvases = document.querySelectorAll('#canv canvas');
	canvases.forEach(c => c.classList.remove('selected'));

	updateCounter();
	}
}



function recreate(){
	newPopulation();
	clearpage();
}

function sortf(a, b) {
	if (a[1] < b[1]) return 1;
	else if (a[1] > b[1]) return -1;
	else return 0;
}

function evolute(){
	
	var c3=document.getElementsByName('c3[]');
	for(var i=0;i<c3.length;i++){
		if(c3[i].checked){
			fitness[i]++;
		}
	}
	saveFitness();
	
	var sizehalf=PopulationSize/2;
	var sizequarter=sizehalf/2;
	var mutation=document.getElementById("mutatepercent").value*1;
	
	var arrayt=[]; //create temp array
	for(var n=0; n<PopulationSize; n++){ //join with fitness for sort
		arrayt[n]=[];
		arrayt[n][0]=population[n];
		arrayt[n][1]=fitness[n];
		arrayt[n][2]=n; //index of parent for new population;
	}
	
	
	//console.log(fitness.join(','));
	arrayt.sort(sortf); //sort
	arrayt.length=sizehalf; //we've got temp array with half of cells (more adapted individs)
	//console.log(arrayt);
	population=[];
	fitness=[];
	
	
	// crossover //
	for(var i=0; i<sizequarter; i++){
		var i0=i*4;
		var i1=i*4+1;
		var i2=i*4+2;
		var i3=i*4+3;
		
		var removed1=Math.floor(Math.random()*(arrayt.length));
		var parent1f = arrayt.splice(removed1,1);
		var parent1=parent1f[0][0]; //take first parent from temp array
		var removed2=Math.floor(Math.random()*(arrayt.length));
		var parent2f = arrayt.splice(removed2,1);
		var parent2=parent2f[0][0]; //take second parent from temp array
		//console.log(parent1f[0][1], parent1f[0][2], parent2f[0][1], parent2f[0][2])
		
		/*
		var child1=[];
		var child2=[];
		var qen=Math.floor(Math.random()*rulesize);
		var temp0=parent1;
		var temp1=parent2;
		var temp2=temp0.splice(qen,rulesize);
		var temp3=temp1.splice(qen,rulesize);
		var parent1=temp0.concat(temp2);
		var parent2=temp1.concat(temp3);
		var child1=temp1.concat(temp2);
		var child2=temp0.concat(temp3);
		*/
		
		var child1=[];
		var child2=[];
		
		for(var j=0; j<rulesize; j++){
			var gen=Math.round(Math.random());
			if(gen==1){
				child1[j]=parent1[j];
				child2[j]=parent2[j];
			}else{
				child1[j]=parent2[j];
				child2[j]=parent1[j];
			}
		}
		
		
		population[i0]=parent1; //put them back to population
		population[i1]=parent2;
		population[i2]=child1;
		population[i3]=child2;
			
		fitness[i0]=0;
		fitness[i1]=0;
		fitness[i2]=0;
		fitness[i3]=0;
	}
	// crossover //
	
	// mutation //
	var m=100/mutation;
	for(var i=0; i<PopulationSize; i++){
		var rnd=Math.floor(Math.random()*(m))+1;
		if(rnd==1){
			var gen=Math.floor(Math.random()*(rulesize));
			/*if(population[i][gen])
				population[i][gen]=0;
			else
				population[i][gen]=1;
			*/
			population[i][gen]=Math.floor(Math.random()*32-16);
		}
	}
	// mutation //
	
	savePopulation();
	saveFitness();
	clearpage();
}

function updateCounter() {
	const hello = document.getElementById('console-log0');
	hello.innerHTML = fitness.join(', ');
	const checkboxes = document.getElementsByName('c3[]');
	let count = 0;
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) count++;
	}
	document.getElementById('counter-display').textContent = `Selected: ${count}`;
}

function dumpFitness() {
	const out = fitness.map((v, i) => `#${i}: ${v}`).join('<br>');
	document.getElementById('console-log0').innerHTML = out;
}
