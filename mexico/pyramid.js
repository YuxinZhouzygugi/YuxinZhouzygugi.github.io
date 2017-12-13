function pyramid(x,y,sizeX,sizeY){
  fill(pyramidLayer*2+45.3, 100, 52.35);
   if(dayTime){
 fill(pyramidLayer*2+45.3, 70, 50);

  }
  stroke(0,0,0,0.3);
  if(dayTime){
  stroke(32.7,42.75,31.96);
  strokeWeight(width/300);
  }
  push();                      
  translate(x,y);
  beginShape();
  vertex(-sizeX,sizeY);
  vertex(0,sizeY);
  vertex(0,sizeY*0.95);
  vertex(0,sizeY*0.95);
  vertex(0,sizeY*0.9);
  vertex(-sizeX*0.85,sizeY*0.9);
  vertex(-sizeX*0.9,sizeY*0.95);
  vertex(-sizeX*0.95,sizeY*0.95);
  endShape(CLOSE);//left
  
  
  if(dayTime){
   //fill(72.6,15.8,70);
  }
  beginShape();
  vertex(0,sizeY);
  vertex(sizeX,sizeY);
  vertex(sizeX*0.95,sizeY*0.95);
  vertex(sizeX*0.9,sizeY*0.95);
  vertex(sizeX*0.85,sizeY*0.9);
  vertex(0,sizeY*0.9);
  vertex(0,sizeY*0.95);
  vertex(0,sizeY*0.95);
  endShape(CLOSE);//right
  
  
   fill(35.3, 90, 52.35);
  if(dayTime){
    // fill(72.6,15.8+pyramidLayer,70);
  }
  beginShape();
  vertex(-sizeX*0.2,sizeY);
  vertex(sizeX*0.2,sizeY);
  vertex(sizeX*0.2*0.925,sizeY*0.95);
  vertex(-sizeX*0.2*0.925,sizeY*0.95);
  endShape(CLOSE);
  beginShape();
  vertex(-sizeX*0.2*0.925*0.925,sizeY*0.9);
  vertex(sizeX*0.2*0.925*0.925,sizeY*0.9);
  vertex(sizeX*0.2*0.925,sizeY*0.95);
  vertex(-sizeX*0.2*0.925,sizeY*0.95);
  endShape(CLOSE);
  

  
  pop();
  
if(sizeX>width*0.2)
	{ pyramidLayer++;
    pyramid(x,y-sizeY*0.1,sizeX*0.9*0.95,sizeY);
  }
else{
  noStroke();
  pyramidLayer++;
  
  
  if(dayTime){
    // fill(72.6,15.8,70);
  }
 
  rectMode(CENTER);
  fill(pyramidLayer*2+45.3, 100, 52.35);
   pyramidLayer=0;
 
  rect(x,y+sizeY*0.8,sizeX*0.7,sizeY*0.09);
  rect(x,y+sizeY*0.85,sizeX*0.7,sizeY*0.09);
  rectMode(CORNER);
  fill(35.3, 49.92, 42.35);
   stroke(32.7,42.75,31.96);
  if(!dayTime){
  
  stroke(32.7,42.75,31.96);
  strokeWeight(width/300);
  }
  rect(x-sizeX*0.075,y+sizeY*0.85,sizeX*0.15,sizeY*0.05);
  line(x-sizeX/2*0.7,y+sizeY*0.81,x+sizeX/2*0.7,y+sizeY*0.81);
  line(x-sizeX/2*0.7,y+sizeY*0.9,x+sizeX/2*0.7,y+sizeY*0.9);
  line(x-sizeX/2*0.7,y+sizeY*0.76,x+sizeX/2*0.7,y+sizeY*0.76);
  
}

}




