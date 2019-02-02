let redrawBtn = document.getElementById('redraw-btn'),
    numItersSlider = document.getElementById('numIters'),
    numPointsSlider = document.getElementById('numPoints'),
    foliageDensitySlider = document.getElementById('foliageDensity'),
    colorChkBox = document.getElementById('color'),
    bgChkBox = document.getElementById('bg'),
    showBtn = document.getElementById('show-btn'),
    controlsContainerClassList = document.getElementById('controls-container').classList,
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasWidth = canvas.width = Math.max(window.innerWidth, 500),
    canvasHeight = canvas.height = Math.max(window.innerHeight, 600);
    pi = Math.PI, rad = deg => deg * pi/180;

let animId, stack;
let numIterations;
let numPointsPerFrame;
let drawColors, drawBG;
let [width, height] = [300, 300];
let x0, y0;
let [xi, yi] = [0.5, 0]; // transform origin
let t0;
let foliageDensity, branchDensity;


let transforms = [
    [.05,.59,0,0,0,0],
    [.05,-.5,0,0,0,1],
    [.6,.5,rad(40),rad(40),0,.6],
    [.5,.45,rad(20),rad(20),0,1.1],
    [.5,.55,rad(-30),rad(-30),0,1],
    [.55,.4,rad(-40),rad(-40),0,.7]
];
let rules = [];
for (let i=0; i<transforms.length; i++) {
    let [r, s, theta, phi, e, f] = transforms[i];
    let a = r*Math.cos(theta), c = s*Math.sin(-phi),
        b = r*Math.sin(theta), d = s*Math.cos(phi);
    rules.push([a,b,c,d,e,f]);
}

window.onload = main();

function main() {
    numIterations = parseInt(numItersSlider.value);
    numPointsPerFrame = parseInt(numPointsSlider.value);
    drawColors = colorChkBox.checked;
    drawBG = bgChkBox.checked;
    foliageDensity = parseInt(foliageDensitySlider.value);

    canvasWidth = canvas.width = Math.max(window.innerWidth, 500);
    canvasHeight = canvas.height = Math.max(window.innerHeight, 600);
    [x0, y0] = [(canvasWidth-250)/2, (canvasHeight-600)/2];
    t0 = new Date().getTime();
    branchDensity = numIterations-foliageDensity;
 
    context.translate(x0 + xi*width, y0 + yi*height);
    context.fillStyle = '#000000';

    if (drawBG) makeBG();

    stack=[{x: 0, y: 0, depth: numIterations, rule: 0, isntLeaf: false}];
    if (drawColors)
        drawColoredTree();
    else drawBWTree();
}

function showCoords() {
    let p = document.createElement('p');
    p.style = 'position:fixed;left:0;bottom:0;font-family:monospace;padding:5px 10px;color:white';
    document.body.appendChild(p);
    addEventListener('mousemove', e=>{
        p.innerText = `${e.clientX}, ${canvasHeight-e.clientY}`;
    }, false);
}

function makeBG() {
    let colors = drawColors? ['#040', '#050', '#060', '#688', '#99c', '#ddf']:
        ['#111', '#222', '#242424', '#aaa', '#eee', '#fff'];
    context.save();
    context.resetTransform();
    let bg = context.createLinearGradient(0,0,0,canvasHeight);
    bg.addColorStop(0, colors[0]);
    bg.addColorStop(.05, colors[1]);
    bg.addColorStop(.1, colors[2]);
    bg.addColorStop(.13, colors[3]);
    bg.addColorStop(.4, colors[4]);
    bg.addColorStop(1, colors[5]);
    context.fillStyle = bg;
    context.fillRect(0,0,canvasWidth,canvasHeight)
    context.restore();
}

function iterIFS(stack, numPoints) {
    for (let i = 0; i < numPoints;) {
        let {x, y, depth, rule, isntLeaf} = stack[0];
        if (rule >= rules.length) {
            stack.shift();
            if (stack.length > 0)
                stack[0].rule++;
            else return;
            continue;
        }
        let _rule = rules[rule];
        let x1 = x*_rule[0] + y*_rule[2] + _rule[4],
            y1 = x*_rule[1] + y*_rule[3] + _rule[5];
        if (depth > 0) {
            stack.unshift({x:x1,y:y1,depth:depth-1,rule:0,isntLeaf:isntLeaf||(depth<=branchDensity && rule <2)})
        } else {
            context.fillStyle = isntLeaf||(depth<=branchDensity && rule<2) ? '#704330': '#279430'; 
            context.fillRect(x1*width, y1*height, .5, .5);
            stack[0].rule++;
            i++;
        }
    }
}
function drawColoredTree() {
    if (stack.length == 0) {
        console.log('Finished in', (new Date().getTime()-t0)/1000, 'seconds.');
        return cancelAnimationFrame(animId);
    }
    iterIFS(stack, numPointsPerFrame);
    animId = requestAnimationFrame(drawColoredTree);
}

function iterIFSBW(stack, numPoints) {
    for (let i = 0; i < numPoints;) {
        let {x, y, depth, rule} = stack[0];
        if (rule >= rules.length) {
            stack.shift();
            if (stack.length > 0)
                stack[0].rule++;
            else return;
            continue;
        }
        let _rule = rules[rule];
        let x1 = x*_rule[0] + y*_rule[2] + _rule[4],
            y1 = x*_rule[1] + y*_rule[3] + _rule[5];
        if (depth > 0) {
            stack.unshift({x:x1,y:y1,depth:depth-1,rule:0})
        } else {
            context.fillRect(x1*width, y1*height, .5, .5);
            stack[0].rule++;
            i++;
        }
    }
}
function drawBWTree() {
    if (stack.length == 0) {
        console.log('Finished in', (new Date().getTime()-t0)/1000, 'seconds.');
        return cancelAnimationFrame(animId);
    }
    iterIFSBW(stack, numPointsPerFrame);
    animId = requestAnimationFrame(drawBWTree);
}

redrawBtn.onclick = () => {
    cancelAnimationFrame(animId);
    main();
};

showBtn.onclick = () => {
    console.log('toggling');
    if (controlsContainerClassList.contains('hidden'))
        controlsContainerClassList.remove('hidden');
    else controlsContainerClassList.add('hidden')
};
