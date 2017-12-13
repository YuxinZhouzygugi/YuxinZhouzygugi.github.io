//background peru

var theta=0;
var r=0;
var rectAlpha=1;
var currentTime;
var time0;
var time;
var expanding=true;
var timing=true;
var step=0;
var step0ff;
hues=[];
var polys = [];
var angle = 75;
var delta = 10;
var poly;
var is=[4,5,6,5,4,3,2,1,0,1,2,3];
var js=[5,4,3,2,1,0,1,2,3,4,5,6];



 
//cross shift back
function setup() { 
  //createCanvas(400,600);

    //createCanvas(3508,4961);
    createCanvas(window.innerHeight/4961*3508,window.innerHeight);
  currentTime=year()*360+(month()-1)*30+day();
  time0=1438*360;//founding year of Inca Empire Tawantinsuyu 
  time=time0;

  for(let i=0;i<49;i++){
    hues.push(random(360));
  }
   var inc = width/7;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < width-1; y += inc) {
      poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }

  /*红色：地球及安第斯人
橙色：社会及文化
黄色：能量
白色：时间
绿色：天然资源
蓝色：天
紫色：安第斯政府及民族自决*/
  //https://en.wikipedia.org/wiki/Chinchay_Suyu
  
//inca cross
//alltitude
} 
var alphalist;
var colorss=[
    
  
  
	  [[347,81,21],[0,73,47],[340,72,53]],//red
	 [ [20,78,33],[20,78,53],[20,78,73]],//orange
	 [ [47,100,50],[59,100,50],[48,100,69]],//yellow
	 [ [160,100,22],[112, 45, 48],[70, 77, 51]],//green
	 [ [176, 56, 46],[176, 56, 66],[176, 56, 86]],//cyan
	 [[0,0,94],[0,0,94],[0,0,94]],
	 [ [214,100,36],[221,44,41],[194, 100, 56]],//blue
	 [ [261,70,29],[276, 92, 29],[261, 29, 69]],//purple
     ];

var colors=[
    
	[4,75,48],//red
  [270,75,50],//purple
  [210,67,50],//blue
  [104,75,48],//green
	[176, 81,80],//white
  [59,75,50],//yellow
  [30,75,50],//orange
  
  [30,75,50],//orange
  [4,75,48],//red
  [270,75,50],//purple
  [210,67,50],//blue
  [104,75,48],//green
	[176, 81,80],//white
  [59,75,50],//yellow
  
  [59,75,50],//yellow
  [30,75,50],//orange
  [4,75,48],//red
  [270,75,50],//purple
  [210,67,50],//blue
  [104,75,48],//green
	[176, 81,80],//white
  
  [176, 81,80],//white
  [59,75,50],//yellow
  [30,75,50],//orange
  [4,75,48],//red
  [270,75,50],//purple
  [210,67,50],//blue
  [104,75,48],//green
  
  [104,75,48],//green
  [176, 81,80],//white
  [59,75,50],//yellow
  [30,75,50],//orange
  [4,75,48],//red
  [270,75,50],//purple
  [210,67,50],//blue
  
  [210,67,50],//blue
  [104,75,48],//green
  [176, 81,80],//white
  [59,75,50],//yellow
  [30,75,50],//orange
  [4,75,48],//red
  [270,75,50],//purple
  
  [270,75,50],//purple
  [210,67,50],//blue
  [104,75,48],//green
  [176, 81,80],//white
  [59,75,50],//yellow
  [30,75,50],//orange
  [4,75,48]//red
     ];

function draw() { 
  frameRate(30);
if(timing){
  
 
  if(time<currentTime){
  time++;
  }else{
  time=currentTime;  
  }
  rectAlpha=map(floor(time/360),1438,year(),1,0);
}
  alphalist=[rectAlpha,rectAlpha,1,1,1,rectAlpha,rectAlpha,
             rectAlpha,1,1,1,1,1,rectAlpha,
             1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,
             rectAlpha,1,1,1,1,1,rectAlpha,
             rectAlpha,rectAlpha,1,1,1,rectAlpha,rectAlpha];
  colorMode(HSL);
  noStroke();
  
  
  
  //background rects
  background(30,59,43);
  
  
  push();
  translate(0,(height-width)/2);
  
  //grids
  for(let i = 0; i <7 ; i++) {
     for(var j = 0; j< 7; j++) {
       //noStroke();
			stroke(colors[i+j*7][0], colors[i+j*7][1],colors[i+j*7][2],alphalist[i*7+j]);
      fill(colors[i+j*7][0], colors[i+j*7][1],colors[i+j*7][2],alphalist[i*7+j]);
      rect(i * width/7, j * width/7, width/7,width/7);  
      if(alphalist[i*7+j]>0.1){
       
        //patterns
       push();
       translate(i * width/7+width/7/2, j * height/10.5+width/7*0.5);
       stroke('black');
      noFill();
      // ellipse(0,0,width/7*0.45*0.9);//mode1
      // ellipse(0,0,width/7*0.45*0.3);//mode3
       rotate(PI/4);
       rectMode(CENTER);
       beginShape();
       noFill();
      // rect(0,0,width/7*0.45*0.8,width/7*0.45*0.8);//mode2     
       pop();
      }     
     }
  }
  
  if(floor(time/360)>1500){
  //lines
  for (let i = 0; i < polys.length; i++) {
     step+=random(0.02,0.05);
    polys[i].update();
    hue=(hues[i]+step)%360;
    strokeWeight(width/150);
    stroke(hue,100,80);
    
    if(alphalist[i]>0.1){
    polys[i].hankin();
    polys[i].show();
    }
  }
  
  }
  
  noStroke();
  fill(200,0,100,0.9-rectAlpha);
  push();
  rectMode(CENTER);
 // rect(width/2,3.5 * height/10.5,width/7*3,width/7*3);
  pop();
  ellipse(width/2,3.5 * height/10.5,width/7*3*0.8);
  smooth();
  push();
  noFill();
  translate(width/2,3.5 * height/10.5);
  beginShape();
  for(theta=time%360+1720;theta>time%360-80;theta-=1){
  stroke(theta%360,100,50,1-rectAlpha);
  strokeWeight(width*0.02);
  vertex(r*cos(-radians(theta)),r*sin(-radians(theta)));
  if(expanding){
  r+=0.04*width/400;//5~360*5
  }else if(!expanding){
  r-=0.04*width/400;
  }
  if(r>=width/7*3){
    expanding=false;
  }
  if(r<=0){
    expanding=true;
  }
    
    
  }
  endShape();
  
  //shadow
  noStroke();
  push();
  fill('white');
  ellipse(1,1,width/50);
  fill('white');
  //ellipse(0,0,width/100);
  ellipseMode(CORNER);
  rotate(-radians(time-180*0.453)+PI);
  var shadowScale=map(sin(-radians(time-180*0.453)+PI),-1,1,0.4,1.4);
  fill(0,0,0,0.3);
  ellipse(0,0,width/10*shadowScale,width/200*shadowScale);
  ellipseMode(CENTER);  
  pop();
  
  
  
  pop();
  r=0;
  push();
  translate(width/2,3.5 * height/10.5);
  rotate(-radians(time-180*0.453));
  for(let layer=30;layer>0;layer--){
  fill(layer*5/3,100,50);
  ellipse(width/7*1.3,0,width/30*layer/30);
  }
  pop();
  

  
  
  // push();
  // fill(200,100,50);
  // translate(width/2,3.5 * height/10.5);
  // translate(cos(-radians(time)+PI*0.453)*(width/7*1.4),sin(-radians(time)+PI*0.453)*(width/7*1.4));
  // textAlign(CENTER);
  // fill('white');
  // textSize(height*0.02);
  // text(ceil((time%360)/30),0,height*0.0075);
  // pop();
  
  var month=ceil((time%360)/30);
  fill(100,100,100,0.4);
  rect(is[month-1] * width/7, js[month-1] * width/7, width/7,width/7);  
  
  
  
  
  pop();
  
  fill(100,100,100);
  stroke('black');
  textSize(height*0.1);
  textAlign(CENTER);
  text(floor(time/360),width*0.5,height*0.95);

  
  textSize(height*0.07); 
  textAlign(RIGHT);
  text('Peru',width*0.97,height*0.97);
  push();
  translate(width/2,height/2);
  rotate(PI);
  textAlign(RIGHT);
  text('Perú',width*0.47,height*0.47);
  textAlign(CENTER);
  textSize(height*0.1);
  text(floor(time/360),0,height*0.45);
  pop();

  
}

function keyPressed(){
 
  if(keyCode== '39'&&time<currentTime){
    time+=random(360*5,700*5);
  }else if(keyCode== '37'){
    time-=random(360,700);
  }else{
    
   time=currentTime;
  rectAlpha=0;  
  
  }
}


function mousePressed(){
 timing=!timing;
}