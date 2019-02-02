// TODO:
// maxIterations, xOrigin, yOrigin
// navigation

class Fractal {
    constructor(rules) {
        this.rules = Fractal.makeRules(rules);
        this.size = 100;
    }

    draw(context) {
        this.context = context;
        try{setup();} catch{}
        this.x = Math.random();
        this.y = Math.random();
        this.iterate();
    }

    getRule() {
        let rand = Math.random();
        for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];
            rand -= rule.weight;
            if (rand < 0)
                return rule;
        }
        console.log('nothing');
    }

    iterate() {
        for (let i = 0; i < 100; i++) {
            let rule = this.getRule();
            let x1 = this.x * rule.a + this.y*rule.b + rule.e;
            let y1 = this.x * rule.c + this.y*rule.d + rule.f;
            this.x = x1;
            this.y = y1;
            this.plot();
        }
        requestAnimationFrame(()=>this.iterate()); 
    }

    plot(x, y) {
        this.context.fillRect(this.size*this.x, -this.size*this.y, .5, .5);
    }

    static makeRules(rules) {
        for (let i=0; i<rules.length; i++) {
            let rule = rules[i];
            if (rule instanceof Array) {
                rule.r = rule[0];
                rule.s = rule[1];
                rule.theta = rule[2];
                rule.phi = rule[3];
                rule.e = rule[4];
                rule.f = rule[5];
                if (typeof(rule[6])!='undefined') rule.weight = rule[6];
            }
            let {r, s, theta, phi} = rule;
            let a = r*Math.cos(theta), b = -s*Math.sin(phi),
                c = r*Math.sin(theta), d = s*Math.cos(phi);
            rule.a = a; rule.b = b; rule.c = c; rule.d = d;
            rule.weight = rule.weight||1.0/rules.length;
        }
        return rules;
    }
}

function log(...l) {
    console.log(...l);
}