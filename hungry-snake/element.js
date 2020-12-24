/* global point */
/* global line */
/* global complex */

function getPointByDistance(p, q, d) {// point p, ideal q, double d
    //return point( q.mobius(p) * ((Math.exp(d)-1) / (Math.exp(d)+1)) ).mobius(-p);
    return point( q.mobius(p).production(complex((Math.exp(d)-1) / (Math.exp(d)+1))) ).mobius(p.negative());
}

function rotateByPoint(p, center, phi) {// point p, point center, double phi
    return p.mobius(center).rotate(phi).mobius(center.negative());
}

function getLineByAngle(p, q, phi) {// point p, ideal q, double phi
    return line(q.mobius(p).rotate(phi), point(0.0)).mobius(p.negative());
}

function PoincareDistance(p1, p2) {// point p1, point p2
    var d = (p2.mobius(p1)).abs();
    return Math.log((1+d)/(1-d));
}

function randPoint(){ 
    var ran = 2*Math.random()-1;
    return point(ran, (2*Math.random()-1)*Math.sqrt(1-ran*ran));
}

function unit(theta){
    return complex(Math.cos(theta), Math.sin(theta));
}