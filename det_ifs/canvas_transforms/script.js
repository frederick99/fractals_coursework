let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasWidth = canvas.width = window.innerWidth,
    canvasHeight = canvas.height = window.innerHeight;
    pi = Math.PI, rad = deg => deg * pi/180;

let transforms = [
    [.5, .5, 0, 0, 0, 0],
    [.5, .5, 0, 0,.5, 0],
    [.5, .5, 0, 0, 0,.5],
];  // sierblahblah

// ASSIGNMENT 2
transforms=[
    [1/3,1/3,0,0,  0,  0],
    [1/3,1/3,0,0,2/3,  0],
    [1/3,1/3,0,0,  0,2/3],
    [1/3,1/3,0,0,1/3,1/3],
    [1/3,1/3,0,0,2/3,2/3] //, 6
];  // i
transforms=[
    [1/3,1/3,0,0,  0,  0],
    [1/3,1/3,0,0,  0,2/3],
    [1/3,1/3,0,0,1/3,1/3],
    [1/3,1/3,0,0,2/3,2/3] //, 6
];  // ii
transforms=[
    [ .5, .5,0,0,  0,  0],
    [ .5, .5,0,0, .5,  0],
    [ .5, .5,0,0,  0, .5],
    [.25,.25,0,0,.75,.75]
];  // iii
transforms=[
    [ .5,.5,0,0, 0, 0],
    [-.5,.5,0,0,.5,.5],
    [-.5,.5,0,0, 1, 0]
];  // iv
transforms=[
    [ .5,.5,rad(-90),rad(-90), 0, 1],
    [-.5,.5,rad( 90),rad( 90),.5,.5],
    [ .5,.5,rad(180),rad(180), 1,.5]
];  // v
// transforms=[
//     [.5,.5,0,0,0,0],
//     [.5,.5,rad(-90),rad(-90),-.5,-1],
//     [.5,.5,rad(180),rad(180),-.5,-1] //, 9, [1,1] transfor origin
// ];  // vi
// transforms=[
//     [.5,.5,0,0,.5,.5],
//     [.5,.5,rad(-90),rad(-90),0,.5],
//     [.5,.5,rad(180),rad(180),1,.5] //, 10
// ];  //vi


let numIterations = 10;
let [width, height] = [400, 400];
let [xi,yi] = [0, 0];   // transform origin

let [x0, y0] = [(canvasWidth-width)/2, (canvasHeight-height)/2];
xi *= width;
yi *= height;


let DEBUG = false;

let rules = [];
for (let i=0; i<transforms.length; i++) {
    let [r, s, theta, phi, e, f] = transforms[i];
    let a = r*Math.cos(theta), c = -s*Math.sin(phi),
        b = r*Math.sin(theta), d = s*Math.cos(phi);
    rules.push([a,b,c,d,e,f]);
}

// initiator
context.fillStyle = DEBUG?'#0004':'#000';
context.fillRect(x0, y0, width, height);
if (DEBUG) {
    context.fillStyle = '#f004';
    context.fillRect(x0, y0, width/2, height/2);
}

// generator
let colors = ['magenta', 'green', 'lightblue', 'red', 'blue', 'black'];
let tempCanvas = document.createElement('canvas'),
    tempContext = tempCanvas.getContext('2d');
tempCanvas.width=width;
tempCanvas.height=height;
if (DEBUG) {
    tempCanvas.style = 'background:#fff;transform:scaleY(-1)';
    document.body.appendChild(tempCanvas);
}
for (let j = 0; j < numIterations; j++) {
    // getImageData
    let imgData = context.getImageData(x0, y0, width, height);
    tempContext.putImageData(imgData,0,0);
    if(!DEBUG)context.clearRect(0,0,canvasWidth,canvasHeight);
    for (let i = 0; i < rules.length; i++) {
        let [a, b, c, d, e, f] = rules[i];
        // transform(a, b, c, d, e, f)
        context.setTransform(a, b, c, d, e*width, f*height);

        // putImageData
        let [x, y] = [x0 + xi, y0 + yi];
        let [x1,y1] = [(d*(x-e)-c*(y-f))/(a*d-b*c),(b*(x-e)-a*(y-f))/(b*c-a*d)];
        context.drawImage(tempCanvas, x1 - xi, y1 - yi);
 
        // context.fillStyle = colors[i];
        // [x, y] = [x0, y0];
        // [x1,y1] = [(d*(x-e)-b*(y-f))/(a*d-b*c),(c*(x-e)-a*(y-f))/(b*c-a*d)];
        // context.fillRect(x1-10, y1-10, 20, 20);
    }
    context.resetTransform();
}
