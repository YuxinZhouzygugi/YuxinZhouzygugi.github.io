var RainbowFlag=[
   [ [0,73,47],[340,72,53],[339, 47, 74]],//red
	 [ [20,78,53],[19,88,53],[20,78,73]],//orange
	 [ [47,100,50],[59,100,50],[48,100,69]],//yellow
	 [ [160,100,22],[112,45,48],[70,77,51]],//green
	 [ [214,100,36],[221,44,41],[194,100,56]],//blue
	 [ [261,70,29],[276,92,29],[261,29,69]],//purple
    ];
var nationalFlag=[
	[0,73,47],//[340,72,53],[339, 47, 74]],//red
  [0,0,96],
  [214,100,36],
	[214,100,36],//[221,44,41],[194,100,56]],//blue
	[0,0,96],
  [0,73,47],
  //[0,73,47],//[340,72,53],[339, 47, 74]],//red
  [0,0,96],
  [214,100,36],
	[214,100,36],//[221,44,41],[194,100,56]],//blue
	[0,0,96],
 // [0,73,47]
  ];


var size=1;
var petal=10;
var angle;
 var layer=0;
var petalNum=0;
var angleT = 0;
var slider;
var step=0;
var step1=1;
var stepC=279;
var mov=10;
var ran;


function setup() { 
   createCanvas(window.innerHeight/4961*3508,window.innerHeight);
 //createCanvas(400,600);
 // createCanvas(3307.333333/10,4961/10);
   slider = createSlider(0, TWO_PI, PI / 4, 0.01); 
  colorMode(HSL);	
  background(50,49,86);
  layer=0;
  push();
  translate(0,height*0.05);
  drawRoof(width/2,height,width/2);
  drawRoof(width*0.75,height*0.95,width/4);
  drawRoof(width*0.25,height*0.95,width/4);
  drawRoof(width*0.15,height*0.86,width/8);
  drawRoof(width*0.85,height*0.86,width/8);
  drawRoof(width*0.95,height*0.9,width/12);
  drawRoof(width*0.05,height*0.9,width/12);
  pop();
  angle=2*PI/petal;
  //drawFloral(width*0.5,height*0.15,7);
  drawFloral(width*0.88,height*0.08,7);
  angleT = slider.value();
  stroke(255);
  push();
  translate(width/2, height*0.85);
  drawTree(width/4);
  angleT=5.76;
  drawTree(width/4);
  pop();
  textSize(height/20);
  textAlign(LEFT);
  fill(255);
  text('ราชอาณาจักรไทย',width*0.05,height*0.07);
  text('Thailand',width*0.05,height*0.15);
}
 
  
function mousePressed(){
  
  colorMode(HSL);
  background(50,49,86);
  layer=0;
  push();
  translate(0,height*0.05);
  drawRoof(width/2,height,width/2);
  drawRoof(width*0.75,height*0.95,width/4);
  drawRoof(width*0.25,height*0.95,width/4);
  drawRoof(width*0.15,height*0.86,width/8);
  drawRoof(width*0.85,height*0.86,width/8);
   drawRoof(width*0.95,height*0.9,width/12);
  drawRoof(width*0.05,height*0.9,width/12);
  pop();
  angle=2*PI/petal;
  //drawFloral(width*0.5,height*0.15,7);
  drawFloral(mouseX,mouseY,random(width/100,width/50));
  angleT = slider.value();
  stroke(255);
  push();
  translate(width/2, height*0.85);
  drawTree(width/4);
  angleT=5.76;
  drawTree(width/4);
  pop();
  textSize(height/20);
  textAlign(LEFT);
  fill(255);
  text('ราชอาณาจักรไทย',width*0.05,height*0.07);
  text('Thailand',width*0.05,height*0.15);
 
}

  
  



function drawFloral(x,y,size){
   noStroke();
  
	for(petalNum=0;petalNum<petal;petalNum++){
  push();
   translate(x,y);
  strokeWeight(1);
  
  rotate(angle-PI/petal*2);
  angle+=2*PI/petal;
  var ran=floor(random(3));
  fill(nationalFlag[petalNum][0],nationalFlag[petalNum][1],nationalFlag[petalNum][2],0.9); 
  //fill(RainbowFlag[petalNum][ran][0],RainbowFlag[petalNum][ran][1],RainbowFlag[petalNum][ran][2]+random(-5,5),0.3);
   beginShape();
     vertex(0,-6*size);
     quadraticVertex((random(-0.5,0.5)+4)*size, -2*size, 0, -size);
     quadraticVertex(-(random(-0.5,0.5)+4)*size,-2*size, 0, -6*size);
     endShape(CLOSE);
  for(i=0;i<60;i+=4){
  ran=floor(random(3));
  //fill(nationalFlag[petalNum][0],nationalFlag[petalNum][1],nationalFlag[petalNum][2]+random(-5,5),0.3); 
  fill(RainbowFlag[petalNum%6][ran][0],RainbowFlag[petalNum%6][ran][1],RainbowFlag[petalNum%6][ran][2]+random(-5,5),0.3);
  push();
  beginShape();
    noStroke();
  	rotate(PI/petal/2*i);
     vertex(0,-(6+i*2)*size);
     quadraticVertex((random(-0.5,0.5)+4+i*2)*size, -2*i*size, 0, -(5+i*2+random(0.5))*size);
     quadraticVertex(-(random(-0.5,0.5)+4+i*2)*size,-2*i*size, 0, -(6+i*2)*size);
     endShape(CLOSE);
  pop();
    
  }
  
 
  pop();
   
  }
 

     // push();
  
 //  beginShape();
 // fill(50,49,71,0.6);
 // size=size*1.4;
 //  translate(x,y);
 //  rotate(PI/6);
 // vertex(-size/2, -size*sin(PI/3));
 // vertex(size/2, -size*sin(PI/3));
 // vertex(size, 0);
 // vertex(size/2, size*sin(PI/3));
 //  vertex(-size/2, size*sin(PI/3));
 // vertex(-size, 0); 
 // endShape(CLOSE); 
   
  
  //fill(42.4,91.9,50);

  //ellipse(0,0,size*2.2);
// fill(50,60,71);
   //ellipse(0,0,size*0.8);   
   
   // pop();

  

}


function drawRoof(xLoc,yLoc,radius){
  fill(noise(step+1)*30+20,80,50);
  push();
   translate(xLoc,yLoc);
   beginShape();
    noStroke();
    vertex(-radius,0);
   quadraticVertex(-radius*0.25,-radius*0.25, 0, -radius*0.9);
  quadraticVertex(radius*0.25,-radius*0.25,radius, 0);
  vertex(radius*0.6, 0);
  vertex( 0,-0.6*radius);
  vertex(-radius*0.6, 0);
  endShape(CLOSE);
  
  beginShape();
  vertex(-radius*0.75,0);
  quadraticVertex(-radius,0,-radius*0.9, -radius*0.3);
  vertex(-radius, 0);
  endShape(CLOSE);
  
  beginShape();
  vertex(radius*0.75,0);
  quadraticVertex(radius,0,radius*0.9, -radius*0.3);
  vertex(radius, 0);
  endShape(CLOSE);
  
  pop();
 
  
  
  if(layer==0){
 // if(mov<width/2){
    //ellipse(width-mov,yLoc-mov,30);
    //ellipse(0+mov,yLoc-mov,30); 
    //mov+=mov;
    //}
  	}
  
  
  if(radius>1){
    layer++;
    radius=radius*0.6;
    drawRoof(xLoc,yLoc,radius);
  }
 
}




function drawTree (len) {
  step+=0.01;
  step1+=33;
  stroke(noise(step)*30+20,80,50);  
  strokeWeight(len/10);
   if(len<20&&len>10){
    push();
    fill(noise(step1)*60+20,100,70,0.7);
    translate(random(-3*len,3*len),random(-5,20)*len);     
     ellipse(0,-len/2,len);
  
    pop();
    
  }
  
  
  if(len<width/4){

  ellipse(0,-len/2,width/400,len);
   
  }else{
    rectMode(CENTER);
  rect(0,-len*0.4,width/200,len*1.2);
  }
  
  
  translate(0, -len);
  
   
    
  
  
  if (len > 3) {
 
    
    
    push();
    rotate(angleT);
    drawTree(len * (0.66666666667+random(-0.01,0.01)));
    pop();
    push();
    rotate(-angleT)
    drawTree(len *( 0.66666666667+random(-0.01,0.01)));
    pop();
  
    
  
  }
	

  
   

}