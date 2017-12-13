//adopted by 


function Polygon(n) {
  this.vertices = [];
  this.edges = [];
  this.sides = n;
  this.angle = random(10, 85);
  
  // this.deltaSpeed = ?

  this.addVertex = function(x, y) {
    var a = createVector(x, y);
    var total = this.vertices.length;
    if (total > 0) {
      var prev = this.vertices[total - 1];
      var edge = new Edge(prev, a, this.angle);
      this.edges.push(edge);
    }
    this.vertices.push(a);
  }
  
  this.update= function() { 
    if(angle<90){
    this.angle++;
    }
    else{
    this.angle--;
    }
  }

  this.close = function() {
    var total = this.vertices.length;
    var last = this.vertices[total - 1];
    var first = this.vertices[0];
    var edge = new Edge(last, first, this.angle);
    this.edges.push(edge);
  }

  this.hankin = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].hankin(this.sides);
    }
  }

  this.show = function() {
    for (var i = 0; i < this.edges.length; i++) {
      this.edges[i].show();
    }
  }

}




function Hankin(a, v) {
  this.a = a;
  this.v = v;
  this.b = p5.Vector.add(a, v);

  this.show = function() {
    //stroke(255, 255, 255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}



function Edge(a, b, angle) {
  this.a = a;
  this.b = b;
  this.h1;
  this.h2;
  this.angle=angle+noise(step)*10;

  this.show = function() {
    //stroke(255);
    //line(this.a.x, this.a.y, this.b.x, this.b.y);
    this.h1.show();
    this.h2.show();
  }

  this.hankin = function(sides) {
    var delta = map(sin(radians(time-180*0.453)),-1,1,0,25);
    
    var mid = p5.Vector.add(this.a, this.b);
    mid.mult(0.5);

    var v1 = p5.Vector.sub(this.a, mid);
    var v2 = p5.Vector.sub(this.b, mid);

    
    
    
    // Edge length
    //var elen = v1.mag() + delta;
    var elen = v1.mag() +  delta;

    
    
    var offset1 = mid;
    var offset2 = mid;
    if (delta > 0) {
      v1.setMag(delta);
      v2.setMag(delta);
      offset1 = p5.Vector.add(mid, v2);
      offset2 = p5.Vector.add(mid, v1);
    }
    v1.normalize();
    v2.normalize();

    v1.rotate(radians(-this.angle));
    v2.rotate(radians(this.angle));

    // Calculate interior this.angle
    var interior = (sides - 2) * PI / sides;
    // Law of sines right here!
    var alpha = interior * 0.5;
    var beta = PI - radians(this.angle) - alpha;
    var hlen = (elen * sin(alpha)) / sin(beta);

    v1.setMag(hlen);
    v2.setMag(hlen);

    this.h1 = new Hankin(offset1, v1);
    this.h2 = new Hankin(offset2, v2);

  }

}