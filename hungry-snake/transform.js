/* global complex */
/* global point */
/* global line */

var Transform = {
    createNew : function(){
        var t = {};
        t.tr = function(a){
            if (a.type === "point") {
                return point(unit(this.th).production(a.substraction(this.com)).division(complex(1.0).substraction(a.production((this.com).conj()))));
            }
            else if (a.type === "line") {
                return line(a.getLeft().mobius(this.com).rotate(this.th), a.getRight().mobius(this.com).rotate(this.th));
            }
            else if (a.type === "ideal") {
                return a.mobius(this.com).rotate(this.th);
            }
            else if (a.type === "transform") {
                var e = unit(a.th);
                return transform(this.th+((e.addition(a.com.conj().production(this.com))).division((complex(1.0).addition(a.com.production(this.com.conj().production(e)))))).arg(),((e.production(a.com)).addition(this.com)).division((e.addition(a.com.conj().production(this.com)))));
            }
        }
        t.type = "transform";
        t.th = 0.0;
        t.com = complex(0.0);
        t.inversion = function(){
            return transform( -this.th, this.com.production(unit(this.th+Math.PI)) );
        };
        t.production = function(a){
            var e = unit(a.th);
            return transform(this.th+((e.addition(a.com.conj().production(this.com))).division((complex(1.0).addition(a.com.production(this.com.conj().production(e)))))).arg(),((e.production(a.com)).addition(this.com)).division((e.addition(a.com.conj().production(this.com)))));
        };
        t.print = function(){
            console.log("c is :");
            this.com.print();
            console.log(this);
        }
        return t;
    }
}

function transform() {
    var tmp = Transform.createNew();
    if (arguments.length === 1) {
        var a = arguments[0];
        if (a.type === "complex" || a.type === "point") {
            tmp.com = a;
        }
        else {
            tmp.th = a;
        }
    }
    else if (arguments.length === 2) {
        tmp.th = arguments[0];
        tmp.com = arguments[1];
    }
    return tmp;
}
