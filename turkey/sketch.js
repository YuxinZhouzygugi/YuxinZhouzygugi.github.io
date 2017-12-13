var bigcR;
var smallcR;
var pieceNum=12;
var layers=5;
var rResize=[0.4,0.5,0.55,0.7,0.8,0.87]
var rotation=[];
var ranResize=[];
var particles=[];
var showEye = true;
var alphaEye=1;
var noiseStep=0;
var eyeMode=true;
 

function setup() { 
  createCanvas(window.innerHeight*4961/3508, window.innerHeight);
  colorMode(HSL);
  bigcR=width/2;
  smallcR=bigcR*0.97;
	ranResize[0]=random(0.8,1.1);
  ranResize[1]=random(0.7,1.2);
  ranResize[2]=random(0.7,1.2);
  ranResize[3]=random(0.8,1.2);
  ranResize[4]=random(0.3,1);
  
  for(let ran=0;ran<=layers;ran++){
    rotation[ran]=random(2*PI);
  }
  
   
  for(var i = 0; i < 1000; i++) {
    var degree = random(360);
    var radius = random(50);
    var x = cos(radians(degree)) * radius;
    var y = sin(radians(degree)) * radius;
    var h = map(x+y, 0, radius*2, 190, 210);
    var col = color(h, 100, random(45,55),0.4);
    particles.push({
      x0:x,
      y0:y,
      x: x,
      y: y,
      col: col
    });
  
}
  

} 

function draw() { 
  colorMode(HSL);
  background(355,59,59);
  noStroke();
  strokeCap(ROUND);
  strokeJoin(ROUND);


  fill('white');
  
  ellipse(width/2,height/2,bigcR*2);//bigc
  
  fill(174, 72, 70);
  //stroke(0,0,100);
  //strokeWeight(width/300);
  ellipse(width/2,height/2,smallcR*2);
  pattern();
  
  flag();
  
  
  push();
  translate(width/2, height/2);
  for(var i = 0; i < particles.length; i++) {
    fill(particles[i].col);
    ellipse(particles[i].x, particles[i].y, width*0.007);
  }
  pop();
  
  
  
  
  
  if(!showEye){if(alphaEye>0){alphaEye-=0.02}}
  if(showEye){if(alphaEye<1){alphaEye+=0.01}}
  //if(showEye) {
    evilEye();
  //}
  
  
  noStroke();
  textSize(width*0.07);
  textAlign(RIGHT);
  fill(270,100,22);
  text('Türkiye',width*0.98,height*0.93);
  textAlign(LEFT);
  text('Turkey',width*0.02,height*0.93);
}

function flag(){
push();
translate(width/2,height/2);
fill(355,59,59);
ellipse(0,0,bigcR*0.4);
fill('white');
ellipse(-bigcR*0.06,0,bigcR*0.18);
fill(355,59,59);
ellipse(-bigcR*0.04,0,bigcR*0.15);
  push();
  	scale(-1,1);
  	fill('white');
    beginShape();
  	let r=bigcR*0.8;
    translate(-bigcR*0.06,0);
    for(let i1=0;i1<10;i1+=2){
   			vertex(r/20*cos(PI/5*i1)*1.5,r/20*sin(PI/5*i1)*1.5);
   			vertex(r/20*cos(PI/5*i1+PI/5)*0.5,r/20*sin(PI/5*i1+PI/5)*0.5);
   			}
    endShape(CLOSE);  
  	pop();
pop();
}





function pattern(){
  push();
  translate(width/2,height/2);  
  fill('white');
  noStroke(); 
  for(let layer=0;layer<=layers;layer++){
  //rotate(rotation[layer]);
  	for(let angle=0;angle<2*PI;angle+=2*PI/pieceNum){
    let r=bigcR*rResize[layer];  
    let x =cos(angle)*r;
    let y =sin(angle)*r;
    let x1 =cos(angle-2*PI/pieceNum)*r;
    let y1 =sin(angle-2*PI/pieceNum)*r;
    let x2 =cos(angle+2*PI/pieceNum)*r;
    let y2 =sin(angle+2*PI/pieceNum)*r;
    let x3 =cos(angle-2*PI/pieceNum/2)*r;
    let y3 =sin(angle-2*PI/pieceNum/2)*r;
    let x4 =cos(angle+2*PI/pieceNum/2)*r;
    let y4 =sin(angle+2*PI/pieceNum/2)*r;
    let x5 =cos(angle-2*PI/pieceNum/4)*r;
    let y5 =sin(angle-2*PI/pieceNum/4)*r;
    let x6 =cos(angle+2*PI/pieceNum/4)*r;
    let y6 =sin(angle+2*PI/pieceNum/4)*r;
   	if(layer==0){
      beginShape();
      vertex(x4*ranResize[3],y4*ranResize[3]);
      vertex(x*0.75,y*0.75);
      vertex(0,0);
      vertex(x*0.75,y*0.75);
      vertex(x3*ranResize[3],y3*ranResize[3]);
      vertex(0,0);
      endShape(CLOSE);
    }else if(layer==1){
      push();
      stroke(255);
      strokeWeight(width/100);
      line(x5,y5,x3*ranResize[2],y3*ranResize[2]);
      line(x*ranResize[1],y*ranResize[1],x5,y5);
      line(x*ranResize[1],y*ranResize[1],x6,y6);
      line(x6,y6,x4*ranResize[2],y4*ranResize[2]);
      strokeCap(ROUND);
      pop();
    }else if(layer==2){
      push();
      stroke(255);
      strokeWeight(width/100);
      line(x5,y5,x3*ranResize[1],y3*ranResize[1]);
      line(x*ranResize[2],y*ranResize[2],x5,y5);
      line(x*ranResize[2],y*ranResize[2],x6,y6);
      line(x6,y6,x4*ranResize[1],y4*ranResize[1]);
      strokeCap(ROUND);
      pop();
    }else if(layer==3){
      beginShape();
      vertex(x4*0.9,y4*0.9);
      vertex(x*ranResize[0],y*ranResize[0]);
      vertex(x3*0.9,y3*0.9);
      endShape(CLOSE);
    }else if(layer==4){
      fill('white');
      ellipse(x,y,width/16);
      fill(174, 72, 70);
      ellipse(x*1.05,y*1.05,width/20);
    }else if(layer==5){
      fill('white');
      push();
      beginShape();
      translate(x,y);
      for(let i1=0;i1<10;i1+=2){
  			vertex(r/20*cos(PI/5*i1)*1.5,r/20*sin(PI/5*i1)*1.5);
  			vertex(r/20*cos(PI/5*i1+PI/5)*0.5,r/20*sin(PI/5*i1+PI/5)*0.5);
  			}
      endShape(CLOSE);
      pop();
      ellipse(x3,y3,r/20);
      push();
      stroke(255);
      strokeWeight(width/100);
      line(x5,y5,x3*ranResize[1],y3*ranResize[1]);
      line(x*ranResize[4],y*ranResize[4],x5,y5);
      line(x*ranResize[4],y*ranResize[4],x6,y6);
      line(x6,y6,x4*ranResize[1],y4*ranResize[1]);
      strokeCap(ROUND);
      pop();
    }
    }
  }
  for(let angle=0;angle<2*PI;angle+=2*PI/pieceNum){
    let r=smallcR-width/300;
    let x =cos(angle)*r;
    let y =sin(angle)*r;
    let x1 =cos(angle-2*PI/pieceNum)*r;
    let y1 =sin(angle-2*PI/pieceNum)*r;
    let x2 =cos(angle+2*PI/pieceNum)*r;
    let y2 =sin(angle+2*PI/pieceNum)*r; 
		strokeWeight(width/120);
    stroke(0,0,100);
    line(0,0,x,y);
    //stroke(174, 72, 70);
    line(x,y,x1,y1);
    noStroke(); 
  }
	pop();
}


function evilEye(){
// push();
// translate(width/2,height/2);
// fill(255,alphaEye);
// beginShape();
// vertex(-bigcR*0.5,0);
//   quadraticVertex(0, -bigcR*0.5, bigcR*0.5, 0);
//   quadraticVertex(0, bigcR*0.5, -bigcR*0.5, 0);
// endShape(CLOSE);
// pop();
 
  if(eyeMode){
  fill(208,100,34.3,alphaEye);
  push();
  translate(width/2,height/2);
  beginShape();
  for(var i=0; i<180; i++){
    var r=bigcR*0.3-height/80+(noise(noiseStep)*height/60);
    var x=cos(radians(i))*r;
    var y=sin(radians(i))*r;
    vertex(x,y);
    noiseStep+=0.03;
  }
  for(let i=180;i<360; i++){
    
    let r=bigcR*0.3-height/80+(noise(noiseStep)*height/60);
    let x=cos(radians(i))*r;
    let y=sin(radians(i))*r;
    vertex(x,y);
    noiseStep-=0.03;
  }
  endShape(CLOSE);
  pop();
  fill(0,0,100,alphaEye);
  push();
  noiseStep=213;
    translate(width/2,height/2);
  beginShape();
  for(let i=0; i<180; i++){
    
    let r=bigcR*0.23-height/80+(noise(noiseStep)*height/60);
    let x=cos(radians(i))*r;
    let y=sin(radians(i))*r;
    vertex(x,y);
    noiseStep+=0.03;
  }
  for(let i=180;i<360; i++){
    
    let r=bigcR*0.23-height/80+(noise(noiseStep)*height/60);
    let x=cos(radians(i))*r;
    let y=sin(radians(i))*r;
    vertex(x,y);
    noiseStep-=0.03;
  }
  endShape(CLOSE);
  pop();
  fill(196,100,50,alphaEye);
  push();
  noiseStep=23;
    translate(width/2,height/2);
  beginShape();
  for(let i=0; i<180; i++){
    let r=bigcR*0.18-height/100+(noise(noiseStep)*height/60*0.8);
    let x=cos(radians(i))*r;
    let y=sin(radians(i))*r;
    vertex(x,y);
    noiseStep+=0.03;
  }
  for(let i=180;i<360; i++){
    
    let r=bigcR*0.18-height/100+(noise(noiseStep)*height/60*0.8);
    let x=cos(radians(i))*r;
    let y=sin(radians(i))*r;
    vertex(x,y);
    noiseStep-=0.03;
  }
  endShape(CLOSE);
  pop();
  fill(0,0,0,alphaEye);
  ellipse(width/2,height/2,bigcR*0.08*2);
  }

  else if(!eyeMode){
  fill(208,100,34.3,alphaEye);
  ellipse(width/2,height/2,bigcR*0.3*2);//smallc
  fill(0,0,100,alphaEye);
  ellipse(width/2,height/2,bigcR*0.23*2);
  fill(196,100,50,alphaEye);
  ellipse(width/2,height/2,bigcR*0.18*2);
  fill(0,0,0,alphaEye);
  ellipse(width/2,height/2,bigcR*0.08*2);
  }
    
    
}

function keyPressed(){
  eyeMode=!eyeMode;
}


function mousePressed() {
  showEye = !showEye;
  if(!showEye){
  for(let i = 0; i < particles.length; i++) {
    let endX=width*0.75*sin(radians(i+random(-5,5)));
    let endY=width*0.75*cos(radians(i+random(-5,5)));
    TweenLite.to(particles[i], 1.5, {x: endX, y:endY });
  }
  }
  if(showEye){ 
  for(let i = 0; i < particles.length; i++) {
    TweenLite.to(particles[i], 1.5, { x: particles[i].x0, y: particles[i].y0 });
  }
  }
}