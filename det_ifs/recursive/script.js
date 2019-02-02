let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasWidth = canvas.width = window.innerWidth,
    canvasHeight = canvas.height = window.innerHeight;
    pi = Math.PI, rad = deg => deg * pi/180;

let transforms = [
    [.5, .5, 0, 0, 0, 0],
    [.5, .5, 0, 0,.5, 0],
    [.5, .5, 0, 0, 0,.5],  // 10
];  // sierblahblah

// ASSIGNMENT 2
transforms=[
    [1/3,1/3,0,0,  0,  0],
    [1/3,1/3,0,0,2/3,  0],
    [1/3,1/3,0,0,  0,2/3],
    [1/3,1/3,0,0,1/3,1/3],
    [1/3,1/3,0,0,2/3,2/3]  // 7
];  // i
transforms=[
    [1/3,1/3,0,0,  0,  0],
    [1/3,1/3,0,0,  0,2/3],
    [1/3,1/3,0,0,1/3,1/3],
    [1/3,1/3,0,0,2/3,2/3] // 7
];  // ii
transforms=[
    [ .5, .5,0,0,  0,  0],
    [ .5, .5,0,0, .5,  0],
    [ .5, .5,0,0,  0, .5],
    [.25,.25,0,0,.75,.75] // 8
];  // iii
transforms=[
    [ .5,.5,0,0, 0, 0],
    [-.5,.5,0,0,.5,.5],
    [-.5,.5,0,0, 1, 0] // 10
];  // iv
transforms=[
    [ .5,.5,rad(-90),rad(-90), 0, 1],
    [-.5,.5,rad( 90),rad( 90),.5,.5],
    [ .5,.5,rad(180),rad(180), 1,.5] // 10
];  // v
// transforms=[
//     [.5,.5,0,0,0,0],
//     [.5,.5,rad(-90),rad(-90),-.5,-1],
//     [.5,.5,rad(180),rad(180),-.5,-1] //, 10, [1,1] transfor origin
// ];  // vi
// transforms=[
//     [.5,.5,0,0,.5,.5],
//     [.5,.5,rad(-90),rad(-90),0,.5],
//     [.5,.5,rad(180),rad(180),1,.5] //, 10
// ];  //vi


let numIterations = 9;
let [width, height] = [400, 400];
let [x0, y0] = [(canvasWidth-width)/2, (canvasHeight-height)/2];
let [xi, yi] = [0, 0]; // transform origin


context.translate(x0 + xi*width, y0 + yi*height);
let rules = [];
for (let i=0; i<transforms.length; i++) {
    let [r, s, theta, phi, e, f] = transforms[i];
    let a = r*Math.cos(theta), c = s*Math.sin(-phi),
        b = r*Math.sin(theta), d = s*Math.cos(phi);
    rules.push([a,b,c,d,e,f]);
}

// function drawIFS(x, y, depth) {
//     if (depth) {
//         for (let i = rules.length - 1; i >= 0; i--) {
//             // let [a, b, c, d, e, f] = rules[i];
//             // drawIFS(x*a + y*c + e, x*b + y*d + f, depth-1);
//             let rule = rules[i];
//             drawIFS(x*rule[0] + y*rule[2] + rule[4], x*rule[1] + y*rule[3] + rule[5], depth-1)
//         }
//     } else context.fillRect(x*width, y*height, .5, .5);
// }
//
// drawIFS(0, 0, numIterations)


let animId, stack=[{x:0,y:0,depth:numIterations,rule:0}];

function iterIFS(numPoints) {
    for (let i = 0; i < numPoints;) {
        let {x, y, depth, rule} = stack[0];
        if (rule >= rules.length) {
            stack.shift();
            if (stack.length > 0)
                stack[0].rule++;
            else return;
            continue;
        }
        let [a, b, c, d, e, f] = rules[rule];
        let x1 = x*a + y*c + e,
            y1 = x*b + y*d + f;
        if (depth > 0) {
            stack.unshift({x:x1,y:y1,depth:depth-1,rule:0})
        } else {
            context.fillRect(x1*width, y1*height, .5, .5);
            stack[0].rule++;
            i++;
        }
    }
}

function iterate() {
    if (stack.length == 0) {
        console.log('Finished in', (new Date().getTime()-t0)/1000, 'seconds.');
        return cancelAnimationFrame(animId);
    }
    iterIFS(2000);
    animId = requestAnimationFrame(iterate);
}

let t0 = new Date().getTime();
iterate();