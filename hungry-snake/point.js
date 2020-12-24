/* global Complex */
/* global complex */

var Point = {
    createNew : function(){
        var p = Complex.createNew();
        p.type = "point";
        p.mobius = function(c){ return point((this.substraction(c)).division(complex(1.0).substraction(this.production(c.conj())))); };
        p.rotate = function(theta){ return point(this.production(unit(theta))); };
        p.print = function(){
            console.log("Point: ");
            complex(this).print();
        };
        return p;
    }
};

function point() {
    var tmp = Point.createNew();
    if (arguments.length === 0) return tmp;
    else if (arguments.length === 1) {
        if (arguments[0].type === "complex") {
            tmp.x = arguments[0].x;
            tmp.y = arguments[0].y;
        }
        else {
            tmp.x = arguments[0];
            tmp.y = 0.0;
        }
        return tmp;
    }
    else if (arguments.length === 2) {
        tmp.x = arguments[0];
        tmp.y = arguments[1];
        return tmp;
    }
}

var Ideal = {
    createNew : function(){
        var i = Complex.createNew();
        i.type = "ideal";
        i.mobius = function(c){ return ideal((this.substraction(c)).division(complex(1.0).substraction(this.production(c.conj())))); };
        i.rotate = function(theta){ return ideal(this.production(unit(theta))); };
        i.print = function(){
            console.log("Ideal: ");
            complex(this).print();
        };
        return i;
    }
};

function ideal() {
    var tmp = Ideal.createNew();
    if (arguments.length === 0) {
        tmp.set(1.0, 0.0);
        return tmp;
    }
    else if (arguments.length === 1) {
        if (arguments[0].type === "complex") {
            var c = arguments[0];
            tmp.set(c.x, c.y);
            return tmp;
        }
        else {
            var theta = arguments[0];
            tmp.x = Math.cos(theta);
            tmp.y = Math.sin(theta);
            return tmp;
        }
    }
    else if (arguments.length === 2) {
        c = complex(arguments[0], arguments[1]);
        return ideal(c.normal());
    }
}