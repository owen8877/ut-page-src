//console.log("complex.js");

var Complex = {
    createNew : function(){
        var co = {};
        co.x = 0.0;
        co.y = 0.0;
        co.type = "complex";
        co.set = function(_x, _y){ this.x = _x; this.y = _y; };
        co.setX = function(_x){ this.x = _x; };
        co.setY = function(_y){ this.y = _y; };
        co.getX = function(){ return this.x; };
        co.getY = function(){ return this.y; };
        co.addition = function(c){ return complex(this.x + c.x, this.y + c.y); };
        co.substraction = function(c){ return complex(this.x - c.x, this.y - c.y); };
        co.production = function(c){ return complex((this.x*c.x - this.y*c.y), (this.x*c.y + this.y*c.x)); };
        co.division = function(c){
            var sqr = c.abs2();
            return complex(((this.x*c.x + this.y*c.y)/sqr), ((this.y*c.x - this.x*c.y)/sqr));
        };
        co.reciprocal = function(){
            var sqr = this.x*this.x + this.y*this.y;
            return complex(this.x/sqr, -this.y/sqr);
        };
        co.negative = function(){ return complex(-this.x, -this.y); };
        co.normal = function(){ return complex(this.x/this.abs(), this.y/this.abs()); };
        co.abs = function(){ return Math.sqrt(this.x*this.x + this.y*this.y); };
        co.abs2 = function(){ return this.x*this.x + this.y*this.y; };
        co.arg = function(){ return Math.atan2(this.y,this.x); };
        co.conj = function(){ return complex(this.x, -this.y); };
        co.print = function(){ console.log(this.x, this.y); };
        return co;
    }
};

function complex() {
    var tmp = Complex.createNew();
    if (arguments.length === 0) return tmp;
    else if (arguments.length === 1) {
        tmp.x = arguments[0];
        return tmp;
    }
    else if (arguments.length === 2) {
        tmp.x = arguments[0];
        tmp.y = arguments[1];
        return tmp;
    }
}