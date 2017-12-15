var weather;
var size;
var moaiSize;
var locTime=0;
var distance;
var moveX=0;
var moveY=0;
var geoLocLat;
var geoLocLon;
var distance;
var debug = false;
var windDegree=0;
var windSpeed=0;
var flowfield;
var stars = [];
var UTCTime=0;



function setup() {
  colorMode(HSL);
   createCanvas(window.innerHeight*4961/3508,window.innerHeight);
  //createCanvas(4961, 3508);
   noStroke();
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Hanga%20Roa,%20CL&APPID=001b0f58045147663b1ea518d34d88b4&units=metric', gotData);
  loadJSON('http://worldclockapi.com/api/json/utc/now',gotTime);
  navigator.geolocation.getCurrentPosition(showPosition);
 flowfield = new FlowField(20);
  var text = createP("The flow of stars varies depending on the wind of Easter Island at the current time.<br>Click to find the trials of stars");
  text.position(0,height);
  

  
}
function showPosition(position) {
   geoLocLat=position.coords.latitude;
   geoLocLon=position.coords.longitude;
   distance=getFlatternDistance(geoLocLat,geoLocLon,-27.15,-109.43);
 }
function gotData(data) {
  weather = data;
  console.log(data);

}

function gotTime(time){
  locTime=time;
  UTCTime=locTime.currentFileTime;
  console.log(UTCTime);
}


function draw() { 
  if(weather){
  windDegree=weather.wind.deg;
  windSpeed=weather.wind.speed;
  }
  else{} 
  colorMode(HSL);
	background(220,60,10,0.2);
  // rectMode(CORNERS);m
  // rect(0,0,width,height*0.72);
  // fill(0);
  // rect(0,height*0.72,width,height);
   // Display the flowfield in "debug" mode
  if (debug) flowfield.display();
  // Tell all the stars to follow the flow field
  for (var i =  stars.length-1; i >=0; i--) {
    stars[i].follow(flowfield);
    stars[i].run();
    if(this.reach){
      stars.splice(i,1);
    }
  }
  

  fill(0,0,100);
  

  moai(width/2,height*0.65,width*0.1);
  textFlag();
  //eyes(width/2,height*0.65,width*0.1);

}




function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

// Make a new flowfield
function mousePressed() {
  
  flowfield.init();
  for (var i = 0; i < 10; i++) {
    stars.push(new Star(random(width), random(height*0.7), random(2, 5), random(0.1, 0.5)));
  }
  
}


function FlowField(r) {
  // How large is each "cell" of the flow field
  this.resolution = r;
  // Determine the number of columns and rows based on sketch's width and height
  this.cols = width/this.resolution;
  this.rows = height/this.resolution;
  // A flow field is a two dimensional array of p5.Vectors
  // We can't make 2D arrays, but this is sort of faking it
  this.make2Darray = function(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
       array[i] = [];
    }
    return array;
  };
  this.field = this.make2Darray(this.cols);

  
  
  this.init = function() {
    // Reseed noise so we get a new flow field every time
    // Need to get noise working
    noiseSeed(Math.floor(random(10000)));
    var xoff = 0;
    for (var i = 0; i < this.cols; i++) {
      var yoff = 0;
      for (var j = 0; j < this.rows; j++) {
        var thetaRan = map(noise(xoff,yoff),0,1,-PI/6,PI/3);
        var theta=windDegree/180*PI-PI/2+thetaRan;
        //var theta = map(sin(xoff)+cos(yoff),-2,2,0,TWO_PI);
        // Polar to cartesian coordinate transformation to get x and y components of the vector
        this.field[i][j] = createVector(cos(theta),sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  };
  
  this.init();

  // Draw every vector
  this.display = function() {
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        drawVector(this.field[i][j],i*this.resolution,j*this.resolution,this.resolution-2);
      }
    }
  };

  this.lookup = function(lookup) {
    var column = Math.floor(constrain(lookup.x/this.resolution,0,this.cols-1));
    var row = Math.floor(constrain(lookup.y/this.resolution,0,this.rows-1));
    //println(lookup.x);
    return this.field[column][row].copy();
  };

  // Renders a vector object 'v' as an arrow and a location 'x,y'
  var drawVector = function(v, x, y, scayl) {
    push();
    var arrowsize = 3;
    // Translate to location to render vector
    translate(x,y);
    stroke(200,100);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    var len = v.mag()*scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0,0,len,0);
    line(len,0,len-arrowsize,+arrowsize/2);
    line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  };
}


function Star(x,y,ms,mf) {
  this.position = createVector(x,y);
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,0);
  this.r = random(2,5);
  this.m =this.r^3/10;
  this.maxspeed = ms || windSpeed*0.5;
  this.maxforce = mf || windSpeed*0.01;
  this.color=color(random(200,270),random(80,100),random(40,100));
  this.reach = false;
  
  this.run = function() {
    this.update();
    this.borders();
    this.display();
  };

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  this.follow = function(flow) {
    // What is the vector at that spot in the flow field?
    var desired = flow.lookup(this.position);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  };

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acc=force.div(this.m*20);
     this.acc=force.mult(windSpeed);
    this.acceleration.add(this.acc);
  };

    // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  
  };

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r)  this.reach = true;
    if (this.position.y < -this.r) this.reach = true;
    if (this.position.x > width+this.r) this.reach = true;
    if (this.position.y > height+this.r) this.reach = true;
  };

  this.display = function() {
   
    fill(this.color);
    noStroke(); 
    push();
    translate(this.position.x,this.position.y);
    ellipse(0,0,this.r*2);
    pop(); 
  };
}



function textFlag(){
 
  if(weather){
  textSize(height*0.05);
  fill(208,100,34);
  text("Rapa Nui",width*0.82,height*0.83);
  textAlign(RIGHT);
  fill(208,100,34);
  if(distance>=0){
  text(distance+'',width*0.82,height*0.71);
  }else{
  text('??????? ',width*0.82,height*0.71);
    }
  fill('white');
  text('Km away ',width,height*0.71);
  text("de Chile ",width,height*0.83);
  fill(357,50,42);
  text("Easter Island, Chile ",width,height*0.89);
  text("27°15"+"'S,  109°43"+"'W ",width,height*0.95);
  var a=new Date(weather.dt*1000);
  console.log(weather.dt*1000); 
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year+' ' ;
  fill('white');
  text(time,width,height*0.77);
  }
  
  push();
  beginShape();
  translate(width*0.73,height*0.76);
  fill('white');
  stroke(208,100,34);
  strokeWeight(width/300);
  rotate(-PI/10);
  size=width*0.015;
   for(let i1=0;i1<=10;i1+=2){
   			vertex(size*cos(PI/5*i1)*1.5,size*sin(PI/5*i1)*1.5);
   			vertex(size*cos(PI/5*i1+PI/5)*0.5,size*sin(PI/5*i1+PI/5)*0.5);
   			}
  endShape();
  pop();
  

}

function moai(xLoc,yLoc,moaiSize){

  push();
  
  translate(xLoc,yLoc);
  rectMode(CENTER);
 //  fill(0);
 //  push();
 //  rectMode(CORNERS);
 // // rect(-moaiSize*0.28*4,-moaiSize*1.3,moaiSize*0.28*4,moaiSize*1.2);
 //  pop();
    
  fill(45,54,36);
  strokeWeight(width/100);
  stroke(45,54,20);
  rect(0,-moaiSize*1.6,moaiSize*2.5,moaiSize/2,20);
  rect(0,-moaiSize*2.1,moaiSize*1.4,moaiSize/2,10);

  beginShape();
  vertex(-moaiSize*0.8,-moaiSize*1.3);
  vertex(moaiSize*0.8,-moaiSize*1.3);
  vertex(moaiSize*0.28*4,moaiSize*1.2);
  vertex(-moaiSize*0.28*4,moaiSize*1.2); 
  endShape(CLOSE);
  
  //eyes
  fill(45,54,20);
  beginShape()
  vertex(-moaiSize*0.83,-moaiSize);
  vertex(moaiSize*0.81,-moaiSize);
  curveVertex(moaiSize*0.4,-moaiSize*0.6);
  curveVertex(0,-moaiSize*0.7); 
  curveVertex(-moaiSize*0.4,-moaiSize*0.6);
  curveVertex(-moaiSize*0.83,-moaiSize);
  endShape(CLOSE);
  
  //nose
  ellipse(0,moaiSize*0.4,moaiSize*0.3);
  fill(45,54,20);
  beginShape();
  strokeCap(ROUND);
  vertex(-moaiSize*0.08,-moaiSize*0.8);
  vertex(moaiSize*0.08,-moaiSize*0.8);
  vertex(moaiSize*0.22,moaiSize*0.4);
  vertex(-moaiSize*0.22,moaiSize*0.4); 
  endShape(CLOSE);
  
  noStroke();
  
  stroke(45,54,90);
  strokeWeight(width/100);
  
  //line(-moaiSize*0.8,-moaiSize,0,-moaiSize);
  //line(moaiSize*0.8,-moaiSize,0,-moaiSize);
  
  stroke(45,54,20);
 line(-moaiSize*0.5,moaiSize*0.9,moaiSize*0.5,moaiSize*0.9);
  strokeWeight(width/200);
  line(-moaiSize*0.2,moaiSize*1,moaiSize*0.2,moaiSize*1);
  
  
  fill(45,54,36);
   strokeWeight(width/100);
  rect(0,moaiSize*2,moaiSize*2.5,moaiSize*1.2,20);
 
  
   pop(); 
}

function eyes(xLoc,yLoc,moaiSize){
  moveX=map(mouseX,0,width,-0.1*moaiSize,0.1*moaiSize);
  moveY=map(mouseY,0,width,-0.1*moaiSize,0.1*moaiSize);
  push();
  beginShape();
  translate(xLoc,yLoc);
  stroke(255);
  strokeWeight(width/200);
  noFill();
  ellipse(-moaiSize*0.45,-moaiSize*0.65,moaiSize*0.4);
  ellipse(moaiSize*0.45,-moaiSize*0.65,moaiSize*0.4);
  fill(45,54,30);
  ellipse(-moaiSize*0.45+moveX,-moaiSize*0.65+moveY,moaiSize*0.1);
  ellipse(moaiSize*0.45+moveX,-moaiSize*0.65+moveY,moaiSize*0.1);
  fill(36,45,30);
  noStroke();
  ellipse(-moaiSize*0.45+moveX*1.4,-moaiSize*0.65+moveY*1.4,moaiSize*0.03);
  ellipse(moaiSize*0.45+moveX*1.4,-moaiSize*0.65+moveY*1.4,moaiSize*0.03);
  pop();
}


//formula contributed by http://www.cnblogs.com/lxzltg/p/5553426.html
 var EARTH_RADIUS = 6378137.0;    //radius of earth
    function getRad(d){
        return d*PI/180.0;
    }
  function getFlatternDistance(lat1,lng1,lat2,lng2){ 
            var f = getRad((lat1 + lat2)/2); 
            var g = getRad((lat1 - lat2)/2); 
            var l = getRad((lng1 - lng2)/2); 
        
            var sg = sin(g); 
            var sl = sin(l); 
            var sf = sin(f); 
        
            var s,c,w,r,d,h1,h2; 
            var a = EARTH_RADIUS; 
            var fl = 1/298.257; 
        
            sg = sg*sg; 
            sl = sl*sl; 
            sf = sf*sf; 
        
            s = sg*(1-sl) + (1-sf)*sl; 
            c = (1-sg)*(1-sl) + sf*sl; 
        
            w = atan(sqrt(s/c)); 
            r = sqrt(s*c)/w; 
            d = 2*w*a; 
            h1 = (3*r -1)/2/c; 
            h2 = (3*r +1)/2/s; 
            
            var dis=round(d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg))/1000);//km
            console.log(dis); 
            return dis; 
            
            } 


        
