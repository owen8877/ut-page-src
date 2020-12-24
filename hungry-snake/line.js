/* global complex */
/* global ideal */
/* global point */

var Line = {
    createNew : function(){
        var l = {};
        l.left = ideal(0.0);
        l.right = ideal(Math.PI);
        l.type = "line";
        l.getLeft = function(){ return l.left; };
        l.getRight = function(){ return l.right; };
        l.isDiameter = function(){
            return (this.left.addition(this.right).abs() < 1e-6);
        };
        l.getCenter = function(){
            return complex(2.0).division(this.left.reciprocal().addition(this.right.reciprocal()));
        };
        l.getRadius = function(){
            return ((this.left.substraction(this.right)).division(this.left.addition(this.right))).abs();
        };
        l.mobius = function(c){ return line(this.left.mobius(c), this.right.mobius(c)); };
        l.rotate = function(theta){ return line(this.left.rotate(theta), this.right.rotate(theta)); };
        l.print = function(){
            console.log("Line:");
            console.log("left: ");    this.left.print();
            console.log("right: ");   this.right.print();
            if (this.isDiameter()) console.log("The line is a diameter.");
            else{
                console.log("The line is not a diameter. Its center is ");
                this.getCenter().print();
            }
        };
        return l;
    }
};

function line() {
    var tmp = Line.createNew();
    if (arguments.length === 1) {
        var c = arguments[0];
        tmp.left = ideal(complex(1.0, Math.sqrt(c.abs2() - 1.0)).division(c.conj()));
        tmp.right = ideal(complex(1.0, -Math.sqrt(c.abs2() - 1.0)).division(c.conj()));
    }
    else if (arguments.length === 2) {
        var a = arguments[0];
        var b = arguments[1];
        if (a.type === "point" && b.type === "point") {
            var u = a.conj().production(b).substraction(a.production(b.conj()));
            var v = complex(((a.substraction(b)).production(complex(1.0).substraction(a.conj().production(b)))).abs());
            var w = a.conj().production(complex(1+b.abs2())).substraction(b.conj().production(complex(1 + a.abs2())));
            tmp.left = ideal((u.addition(v)).division(w));
            tmp.right = ideal((u.substraction(v)).division(w));
        }
        else if (a.type === "point" && b.type === "ideal") {
            tmp.left = b.production(((complex(2).production(b.conj()).production(a)).substraction(complex(1+a.abs2()))).division(complex(1+a.abs2()).substraction(complex(2.0).production(b).production(a.conj()))));
            tmp.right = b;
        }
        else if (a.type === "ideal" && b.type === "point") {
            tmp.left = a;
            tmp.right = a.production(((complex(2).production(a.conj()).production(b)).substraction(complex(1+b.abs2()))).division(complex(1+b.abs2()).substraction(complex(2.0).production(a).production(b.conj()))));
        }
        else if (a.type === "ideal" && b.type === "ideal") {
            tmp.left = a;
            tmp.right = b;
        }
        else {
            var cc = complex(a, b);
            tmp.left = ideal(complex(1.0, Math.sqrt(cc.abs2() - 1.0)).division(cc.conj()));
            tmp.right = ideal(complex(1.0, -Math.sqrt(cc.abs2() - 1.0)).division(cc.conj()));
        }
    }
    return tmp;
}