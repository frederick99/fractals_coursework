var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

var rules = [{
    'a': .85,
    'b': .04,
    'c':-.04,
    'd': .85,
    'e': 0,
    'f': 1.6,
    'weight': .65,
    'color': 'red'
   },{
    'a':-.15,
    'b': .28,
    'c': .26,
    'd': .24,
    'e': 0,
    'f': .44,
    'weight': .07,
    'color': 'green'
   },{
    'a': .2,
    'b':-.26,
    'c': .23,
    'd': .22,
    'e': 0,
    'f': 1.6,
    'weight': .07,
    'color': 'blue'
   },{
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0.16,
    'e': 0,
    'f': 0,
    'weight': .21,
    'color': 'yellow'
   }];

var x = Math.random(),
    y = Math.random();

context.translate(width/2, height);
iterate();

function iterate() {
    for (let i = 0; i < 100; i++) {
        let rule = getRule();
        let x1 = x * rule.a + y*rule.b + rule.e;
        let y1 = x * rule.c + y*rule.d + rule.f;
        x = x1; y = y1;
        plot(x, y, rule.color);
    }
    requestAnimationFrame(iterate); 
}

function getRule() {
    let rand = Math.random();
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        rand -= rule.weight;
        if (rand < 0)
            return rule;
    }
}

function plot(x, y, color) {
    // context.fillStyle = color;
    context.fillRect(50*x, -50*y, .5, .5);
}