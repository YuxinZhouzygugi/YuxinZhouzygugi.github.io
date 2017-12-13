//press the mouse to pause/play
//key words: india colorful peacock Kaleidoscope


var x0,y0,x1,y1,x2,y2;
var petal=12;
var size;
var angle;
var stepX=2;
var stepY=10;
var xOff=0.05;
var yOff=0.07;
var hOff=0.05;
var drawing=true;
var particles=[];
var gravity;
var wind;
var i;
var j;
var drawing2=true;
var ranhue;


function setup() {
  colorMode(HSL);
   createCanvas(window.innerHeight*4961/3508,window.innerHeight);
  // createCanvas(4961, 3508);
  //createCanvas(600, 400);
  noStroke();
  gravity = createVector(0, 0.2);
  ranhue=random(-20,20);

}
      

function draw(){
  console.log(mouseX+' '+mouseY);
  
  if(drawing){
     background('#FAFFF0');
  
  
    colorMode(HSL);
    
    

  var startA=map(abs(mouseX-width/2),0,width/2,90,0);
  for( i = startA; i < 190-startA; i += 10){
    for( j = width/2; j > 0; j -= width/12){
      coneSize = map(j, width / 2, 0, width/40*7, width/30);
      layer=map(j,width/2,0,0,5);
       position=map(i,0,180,0,20);
        hOff+=0.05;
      for(var num=0;num<5;num++){
        var resize=1;
      resize=map(num,0,5,1,0.9);
      var hue=(layer-num*0.1)*60+(i-10*round(mouseY/20))*resize;
    	hue=hue+ranhue;
      if(hue>360){hue-=360;}
      if(hue<0){hue+=360;}
      fill(hue,100-3*abs(10-position),50,0.08);
      hOff+=0.1;
      drawCone(width / 2 - cos(radians(i)) * j,height*0.97  - sin(radians(i)) * j*mouseY/600,i + 90,90,coneSize*resize);
       
     
//        fill(layer*30,100-2*abs(10-position),50);
//       drawCone(width / 2 - cos(radians(i)) * j,height*0.97  - sin(radians(i)) * j,i + 90,90,coneSize*0.8);
//       noStroke();
//       fill(layer*50,100-2*abs(10-position),50); 
//       drawCone(width / 2 - cos(radians(i)) * j*1.05,(height*0.97  - sin(radians(i)) * j*1.05),i + 90,90,coneSize*0.5);
//        fill(0,100,100,0.8);
      fill(30+hue,100-3*abs(10-position),50,0.1);
      ellipse(width / 2 - cos(radians(i)) * j*1.2,height*0.97  - sin(radians(i)) * j*mouseY/600*1.2,coneSize*0.1);


  
          
  }     
          
  if(mouseX!=pmouseX||mouseY!=pmouseY){
         if(particles.length<100){
    let p = new Particle((width / 2 - cos(radians(i)) * j*1.2,height*0.97  - sin(radians(i)) * j*mouseY/600*1.2,coneSize*0.1));
    particles.push(p);
         }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].y<0) {
      
      particles.splice(i, 1);
    }
  }
      
    }
    
    
  }
 
  drawPeaCock(width/2,height,width/6);
textSize(width/10);
  textAlign(RIGHT);
  fill(48,49,43);
  text('भारत',width*0.95,height*0.95);
  textAlign(LEFT);
  text('India',width*0.05,height*0.95);
  }
}




function mousePressed(){
  drawing=!drawing;
  
}




class Particle {


  constructor() {
   
    this.x = random(width);
    this.y = random(mouseY,height);
    this.vx = random(-0.2,0.2);
    this.vy = random(-0.2,0.2);
  }

  update() {
    this.x -= this.vx;
    this.y -= this.vy;
  }

  show() {
    noStroke();
    //stroke(255);
    fill(this.y/height*360,100-3*abs(10-this.x/width*10),50,0.05);
    ellipse(this.x, this.y, coneSize*random(0.03,0.05));
  }

}



