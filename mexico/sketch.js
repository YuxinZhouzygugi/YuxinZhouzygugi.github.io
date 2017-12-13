var layers=200;
var pyramidLayer=0;
var dayTime=false;
var col;
var ranSize;
var ranLoc;
var solSize=300;
var solY;
var yMove=0;
var sizeScale=1;



function setup() { 
  //createCanvas(3508,4961);
   createCanvas(window.innerHeight/4961*3508,window.innerHeight);
  
} 
function draw() { 
  solY=map(mouseY,0,height,height*0.1,height*0.4);
  solSize=map(mouseY,0,height,height*0.35,height*0.1);
  colorMode(HSL);
  if(mouseX>0.5*width){
    dayTime=true;
   }else if(mouseX<0.5*width){
   dayTime=false;
   }
  
  
  for(num=0;num<=layers;num++){
   fill(60*num/layers,80,70,0.8);
  fill(60*num/layers,80,70,0.8);
    rectMode(CORNER);
    noStroke();
    rect(0,(num-1)/layers*height*0.5,width,1/layers*height/2); 
 		fill(0,100,map(mouseY,0,height,95,80));
    stroke(0,100,map(mouseY,0,height,95,80));
    ellipse(width/2,solY,solSize);
  }//daytime

  for(num=0;num<=layers;num++){
     stroke(170+60*(1-num/layers),70,20);
    fill(170+60*(1-num/layers),70,20);
    rect(mouseX-width*0.02,(num-1)/layers*height*0.5,width*1.02,1/layers*height/2); 
    fill(64,74,map(mouseY,0,height,95,65));
    stroke(64,74,map(mouseY,0,height,95,65));
   
      
    
    if(mouseX<width*0.5+solSize/2&&mouseX>=width*0.5-solSize/2){
    let angle=asin((-width*0.5+mouseX-width*0.02)/solSize/2);
     arc(width/2,solY,solSize,solSize,-PI/2-asin((width*0.52-mouseX)/solSize*2),PI/2+asin((width*0.52-mouseX)/solSize*2),CHORD);
     }
    if(mouseX<=width*0.5-solSize/2+width*0.02){
    ellipse(width/2,solY,solSize);
    }
  }//night
    
  
 // fill(40.9, 91.87, 75.89);
 // rect(0,height*0.5,width,height*0.5);
  
  
  //path 
  for(let i=layers;i>0;i--){
    stroke(40.7, 100, 75-30*i/layers);
    fill(40.7, 100, 75-30*i/layers);
    rect(0,height*0.5+height*0.5*i/layers,width,i/layers*height/2);
    if(mouseX<0.6*width){
   stroke(170+100*i/layers,50,20);
    fill(170+100*i/layers,50,20);
    rect(mouseX-width*0.02,height*0.5+height*0.5*i/layers,width*1.02,i/layers*height);
 
    }
  rectMode(CORNER);
   }
  
  if(mouseX<0.5*width){
   for (var k = 0; k < 500; k++){
    var xStar = random(mouseX,width);
    var yStar = random(height);
    var rStar = random(1,4);
    noStroke();
    fill(random(240,300),random(50,100),random(40,100));
    ellipse(xStar,yStar,rStar,0.3);
  }
  }
  
  
  for(let j=layers;j>0;j--){
  if(mouseX<0.6*width){
  stroke(40.7, 100, 60+20*j/layers);
  fill(40.7, 100, 60+20*j/layers);
  beginShape();
  noStroke();
  vertex(width*0.4,height*0.5);
  vertex(width*0.6,height*0.5);
  vertex(width*0.6+0.4*width*j/layers,height*0.5+0.5*height*j/layers);
  vertex(width*0.4-0.4*width*j/layers,height*0.5+0.5*height*j/layers);
  endShape(CLOSE);
  }
      }
   
  
  
  pyramid(width/2,height*0.1,width*0.505,height*0.4);
  
  //flower petals
  noStroke();
  //frameRate(5);
  // if(mouseX<width*0.35){
  for(let i=0;i<30;i++){
    for(let j=0; j<50;j++){
      var xMin = map(i, 0, 30, width * 0.4, 0);
      if(mouseX > xMin){
      	xMin = mouseX;
      }
      var xMax = map(i, 0, 30, width * 0.6, width);
      if(mouseX > xMax){
      	xMax = mouseX;
      }
      var xPos = map(j, 0, 50, xMin, xMax);
      if(xMin<xMax){
      push();
      translate(xPos + random(-2, 2), height*0.5+height/2*i/30 + random(-2, 2));
     // rotate(map(i, 0, 30, 0.01, 0.05) * frameCount);
      fill(30.7+i, 93.76, 50,random(0.6,0.9));
      stroke(30.7+i, 93.76, 80,random(0.6,0.9));
      heart(0,0,0.2*width/800);
      pop();   
      }
    }
  }
//彩蛋啊哈哈哈
// if(mouseX<width*0.1){
//   fill(20,78,53,0.8);
//    yMove+=2;
//    sizeScale*=1.1;
//   heart(width/2,height*0.5-yMove,0.2*sizeScale);
//   if(yMove>height*0.15){
//      yMove=0;
//    sizeScale=1;
//   }
//}
  
  
  
   
  for(let i=0;i<10;i++){
  if(mouseX<width*0.4-i*0.05){
  cactus(width*(0.4-i*0.05),height*(0.5+i*0.06),width*(0.01+i*0.005),random(0.9,1.1),random(0.9,1.1),random(0.9,1.1));
  }else{
    cactus(width*(0.4-i*0.05),height*(0.5+i*0.06),width*(0.01+i*0.005),1,1,1);
  }
  }
  push();
  
  translate(width*0.6,height*0.5);
  scale(-1,1);
  for(let i=0;i<10;i++){
  if(mouseX<width*0.6+i*0.05){
  cactus(-width*i*0.05,height*i*0.06,width*(0.01+i*0.005),random(0.9,1.1),random(0.9,1.1),random(0.9,1.1));
  }else{
  cactus(-width*i*0.05,height*i*0.06,width*(0.01+i*0.005),1,1,1);
  }
   }
  pop();
  fill(40,100,60,0.9);
 
  
  textSize(width*0.1);
  push();
  translate(width/2,height*0.77);
  rotate(-PI/2);
  fill('Green');
  text('Mé',-width*0.1,0);
  fill('white');
  text('xi',width*0.05,0);
  fill('red');
  text('co',width*0.13,0);
  textSize(width*0.1);
  pop();
  push();
  translate(width/2,height*0.754);
  rotate(PI/2);
  fill('Green');
  text('Me',-width*0.1,0);
  fill('white');
  text('xi',width*0.05,0);
  fill('red');
  text('co',width*0.13,0);
  pop();
  
  //shade
 
  
  
   rectMode(CORNER);
  if(dayTime){
  fill(0,0,80,0.05);
  rect(0,0,mouseX-width*0.02,height);
  }else if(!dayTime){
  fill(0,0,0,0.05);
  rect(mouseX-width*0.02,0,width,height);
  }
}





function cactus(x,y,size,ranLocX,ranLocY,ranSize){
  
  fill('green');
  rectMode(CENTER);
  rect(x,y,size,size*4);
  ellipse(x,y-size*2,size);
  rect(x,y+size*2,size,size,5);
  rectMode(CORNER);
  rect(x+size*0.3,y+size*ranSize*(ranLocY-1),size*ranSize*ranLocX,size/2*ranSize);
  ellipse(x+size*ranSize*ranLocX+size*0.3,y+size/4*ranSize+size*ranSize*(ranLocY-1),size/2*ranSize);
  rect(x+size*0.3+size*ranSize*ranLocX-size/4*ranSize,y-size*1.5*ranSize+size/4*ranSize+size*ranSize*(ranLocY-1),size/2*ranSize,size*1.5*ranSize);
  ellipse(x+size*ranSize*ranLocX+size*0.3,y-size*ranSize*1.25+size*ranSize*(ranLocY-1),size/2*ranSize);
  push();
  translate(x,y);
  scale(-1,1);
  rect(size*0.2,size*ranSize*(ranLocY-1)+0.8*size,size*ranSize*ranLocX,size/2*ranSize);
  ellipse(size*ranSize*ranLocX+size*0.2,size/4*ranSize+size*ranSize*(ranLocY-1)+0.8*size,size/2*ranSize);
  rect(size*0.2+size*ranSize*ranLocX-size/4*ranSize,-size*1.5*ranSize+size/4*ranSize+size*ranSize*(ranLocY-1)+0.8*size,size/2*ranSize,size*1.5*ranSize);
  ellipse(size*ranSize*ranLocX+size*0.2,-size*ranSize*1.25+size*ranSize*(ranLocY-1)+0.8*size,size/2*ranSize);
  pop();
  
   if(mouseX<width/2&&x<0){
    fill('black');
    ellipse(x+size*0.3,y-size*1.6,size*0.25);
    ellipse(x-size*0.3,y-size*1.6,size*0.25);
    ellipse(x,y-size*1.2,size*0.3,size*0.5);
  }
     if(mouseX+0.03*width<x&&x<width/2){
    fill('black');
    ellipse(x+size*0.3,y-size*1.6,size*0.25);
    ellipse(x-size*0.3,y-size*1.6,size*0.25);
    ellipse(x,y-size*1.2,size*0.3*ranSize,size*0.5*ranSize);
  } 
  
}  
  
//有眼睛和嘴巴的仙人掌乖x0x






function heart(x,y,heartScale){

push();
translate(x,y);
scale(heartScale);
beginShape();
vertex(0, 0);
bezierVertex(0, -20, 50, -15, 0, 30);
vertex(0, 0);
bezierVertex(0, -20, -50, -15, 0, 30);
endShape();
pop();  
}

