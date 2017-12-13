berberAlphabet=['ⴰ','ⴱ','ⴳ','ⵯⴷ','ⴹ','ⴻ','ⴼ','ⴽ','ⵀ','ⵃ','ⵄ','ⵅ','ⵇ','ⵉ','ⵊ','ⵍ','ⵎ','ⵏ','ⵓ','ⵔ','ⵕ','ⵖ','ⵙ','ⵚ','ⵛ','ⵜ','ⵟ','ⵡ','ⵢ','ⵣ','ⵥ'];
var tagineLoc;
var openCover=true;
particles = [];
var num=0;
var scale=1;

var myFont;
function preload() {
//  myFont = loadFont('font.otf');
}


function setup() { 
  colorMode(HSL);
  noStroke();
  //createCanvas(400,600);
  //createCanvas(3508,4961);
   createCanvas(window.innerHeight/4961*3508,window.innerHeight);
  scale=width/400;
  tagineLoc={
      x: width/2,
      y: height*0.5
  }
}

function draw(){
  //frameRate(10);
  if(openCover){
   TweenLite.to(tagineLoc, 2, {x: width/2, y:height*0.05 });
  }else if(!openCover){
   TweenLite.to(tagineLoc, 2, {x: width/2, y:height*0.45 });
  }
  background(246.9, 66.7, 50.8);
  tagine(width/2,height*0.45,height/4);

  
  noStroke();
  textSize(width*0.07);
  textAlign(RIGHT);
  for(let i=0;i<berberAlphabet.length;i++){
  	fill(0,0,94);
  	//text(berberAlphabet[i],random(width*0.1,width*0.85),random(height*0.1,height*0.85));
  }
  textSize(width*0.07);
  textAlign(RIGHT);
  text('Morocco',width*0.97,height*0.84);
  text('Maroc',width*0.97,height*0.88);
  text('المملكة المغربية',width*1.01,height*0.93);
  text('ⵜⴰⴳⵍⴷⵉⵜⵏⵍⵎⵖⵔⵉⴱ',width*0.97,height*0.97);  
   if(openCover){

    if(particles.length < 200){
      let p = new Particle();
    	particles.push(p);
    }
   }
  if(particles.length>0){
    for (let i = int(particles.length / 2); i >= 0; i--) {
      particles[i].update();
      particles[i].openCover();
      if (particles[i].finished()) {
        // remove this particle
        particles.splice(i, 1);
      }
    }
  }
   
  flag(width*0.73,height*0.87,height*0.015);
  
  tagineCover(tagineLoc.x,tagineLoc.y,height/4);
  
  
   if(openCover){

     if(particles.length < 200){
        let p = new Particle();
        particles.push(p);
      }
   }
  
    for (let i = particles.length - 1; i >= particles.length / 2; i--) {
      particles[i].update();
      particles[i].openCover();
      if (particles[i].finished()) {
        // remove this particle
        particles.splice(i, 1);
      }
    }
  
   
  
} 


function tagine(x,y,size){
  beginShape();
  strokeWeight(width/600);
  fill(41,100,50);
  ellipse(x,y+size,1.2*size,0.7*size);//bottom
  stroke(26,30,26);
   fill(29, 57, 40);
  ellipse(x,y+0.9*size,2*size,0.6*size);
  noStroke();
  fill(45,92,54);
  ellipse(x,y+0.85*size,1.8*size,0.4*size);
  fill(50, 94, 50);
  ellipse(x,y+0.94*size,0.45*1.2*size,0.12*size);
  endShape(CLOSE);  
  
 
}


function flag(x,y,size){ 
  push();
  beginShape();
  translate(x,y);
  rotate(-PI/10);
  stroke(164,50,25);	
  strokeWeight(width/200);
  fill(8,83,50,0.7);
   for(let i1=0;i1<10;i1+=2){
   			vertex(size*cos(PI/5*i1)*1.5,size*sin(PI/5*i1)*1.5);
   			vertex(size*cos(PI/5*i1+PI/5)*0.5,size*sin(PI/5*i1+PI/5)*0.5);
   			}
  endShape(CLOSE);
  for(let i1=0;i1<10;i1+=2){
   			vertex(size*cos(PI/5*i1+PI/5)*0.5,size*sin(PI/5*i1+PI/5)*0.5);
   			}
  endShape(CLOSE);
  pop();
  
}

function tagineCover(x,y,size){
  
  fill(41,100,50);
  stroke(39,67,45);
  strokeWeight(width/60);
  ellipse(x,y+0.85*size,1.7*size,0.3*size);
  noStroke();
  triangle(x-0.84*size,y+0.85*size,x,y,x+0.84*size,y+0.85*size);
  rectMode(CENTER);   
  fill(29, 57, 38);
  rect(x,y+size*0.05,0.25*size,0.15*size,40);
 
}


function mousePressed(){
  openCover=!openCover;
}



 

class Particle {
  constructor() {
    this.x = width*0.5;
    this.y = height*0.68;
    this.vx = random(-2*scale, 2*scale);
    this.vy = random(-2*scale, -0.5*scale);
    this.opacity = random(0.3,0.9);
    this.color=color(random(360),random(70,100),random(40,100),this.opacity);
    this.letter=berberAlphabet[floor(random(berberAlphabet.length))];
    
  }

  finished() {
    return  this.y <0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if(this.x<0||this.x>width){
      this.vx*=-1;
      if(this.vy>0.01){this.vy*=0.4;}
    }
  }

  openCover() {
    noStroke();
    fill(this.color);
    textAlign(CENTER);
    textSize(width*0.1);
    text(this.letter,this.x, this.y);
  }

}

