var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

var rules = [{r:.5, s:.5, theta:0, phi:0, e:0, f:0},
             {r:.5, s:.5, theta:0, phi:0, e:1, f:0},
             {r:.5, s:.5, theta:0, phi:0, e:0, f:1}],   // sierblahblah

pi = Math.PI,transforms;
transforms = [[.5, .5,  pi/4,  pi/4,  0, 1],
            [.5, .5, -pi/4, -pi/4,  0, 1],
            [.001, .5,  0, 0,  0, 0],
            [.001, -.5,  0, 0,  0, 1]];     // noob tree
transforms = 
[[.05,.6,0,0,0,0],
[.05,-.5,0,0,0,1],
[.6,.5,rad(40),rad(40),0,.6],
[.5,.45,rad(20),rad(20),0,1.1],
[.5,.55,rad(-30),rad(-30),0,1],
[.55,.4,rad(-40),rad(-40),0,.7]];   // god tree

transforms=[[ .5, .5,    -pi,    -pi,  1, .5],
            [ .5, .5, pi/2,pi/2,  0, .5],
            [-.5, .5,     0,     0, .5, .5]]; // wtf

// ASSIGNMENT 2
transforms=[[1/3,1/3,0,0,0,0],
            [1/3,1/3,0,0,2/3,0],
            [1/3,1/3,0,0,0,2/3],
            [1/3,1/3,0,0,1/3,1/3],
            [1/3,1/3,0,0,2/3,2/3]]; // i
transforms=[[1/3,1/3,0,0,0,0],
            [1/3,1/3,0,0,0,2/3],
            [1/3,1/3,0,0,1/3,1/3],
            [1/3,1/3,0,0,2/3,2/3]]; // ii
transforms=[[.5,.5,0,0,0,0,     4/13],
            [.5,.5,0,0,.5,0,    4/13],
            [.5,.5,0,0,0,.5,    4/13],
            [.25,.25,0,0,.75,.75, 1/13]];   // iii
transforms=[[.5,.5,0,0,0,0],
            [-.5,.5,0,0,.5,.5],
            [-.5,.5,0,0,1,0]];  // iv
transforms=[[.5,.5,rad(-90),rad(-90),0,1],
            [-.5,.5,rad(90),rad(90),.5,.5],
            [.5,.5,rad(180),rad(180),1,.5]];    // v
transforms=[[.5,.5,0,0,0,0],
            [.5,.5,rad(-90),rad(-90),-.5,-1],
            [.5,.5,rad(180),rad(180),-.5,-1]];  // vi
transforms=[[.5,.5,0,0,.5,.5],
            [.5,.5,rad(-90),rad(-90),0,.5],
            [.5,.5,rad(180),rad(180),1,.5]];    //vi

context.translate(200, height-100);

let sierpinski = new Fractal(rules);
sierpinski.size = 250;
sierpinski.draw(context);

// let somethingElse = new Fractal(transforms);
// somethingElse.size = 400;
// somethingElse.draw(context);

function rad(deg) {return deg * pi/180;}