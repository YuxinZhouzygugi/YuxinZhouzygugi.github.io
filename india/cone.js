function drawCone(xLoc,yLoc,rotation,angle,r){
push();

//noStroke();
translate(xLoc,yLoc);
rotate(radians(rotation));
  size=0.162;
  var ratio=0.7;
  x0 =cos(radians(angle))*r;
  y0 =sin(radians(angle))*r*ratio;
  x1 =cos(radians((1-size)*angle))*r*ratio;
  y1 =sin(radians((1-size)*angle))*r*ratio;
	x2 =cos(radians((1+size)*angle))*r*ratio;
  y2 =sin(radians((1+size)*angle))*r*ratio;
beginShape();
    ellipse(x0,y0,r*sin(radians(30))*ratio);
  	vertex(0,0);
    vertex(x2,y2);
    vertex(x1,y1);
    noStroke();
endShape(CLOSE);
pop();
}



function drawPeaCock(xLoc,yLoc,body){
  push();
 translate(xLoc,yLoc-body);
  size=0.162;
  var ratio=0.7;
  r=body*1.1;
  x0 =cos(radians(90))*r;
  y0 =sin(radians(90))*r*ratio;
  x1 =cos(radians((1-size)*90))*r*ratio;
  y1 =sin(radians((1-size)*90))*r*ratio;
	x2 =cos(radians((1+size)*90))*r*ratio;
  y2 =sin(radians((1+size)*90))*r*ratio;

  fill('darkgreen');
    ellipse(x0,y0,r*sin(radians(30))*ratio);
  fill('white');
  beginShape();
  	vertex(0,0);
    vertex(x2,y2);
    vertex(x1,y1);
    noStroke();
endShape(CLOSE); 
  beginShape();
  fill('orange');
  	vertex(0,0);
    vertex(x2*0.7,y2*0.7);
    vertex(x1*0.7,y1*0.7);
    noStroke();
endShape(CLOSE); 
  pop();
fill('yellow');
drawCone(xLoc+body*0.4,yLoc-body*0.9,90,90,body*0.6);
fill('#1492ff');
ellipse(xLoc,yLoc-body*0.9,body*0.33);
strokeWeight(0.5);
fill('black');
stroke(255);
strokeWeight(width/200);
ellipse(xLoc,yLoc-body*0.9,body*0.1);
noStroke();
}  