void setup() {
  size(350,350); // set the size of the canvas
  noLoop(); // we do not need animations
}

void draw() {
  ex1test();
  // ex2test();
  // ex3test();
}

void ex1test() {
  drawIFS(TCT, 0, 0, 8);
}

void ex2test() {
  drawIFS(sierpinski, 0, 0, 8);
}

void ex3test() {
  drawSnowFlake(7, new Point(50, 75), new Point(300, 75));
  drawSnowFlake(7, new Point(300, 75), new Point(175, 325));
  drawSnowFlake(7, new Point(175, 325), new Point(50, 75));	
}

// exercise 1 //////////////////////////////////

double TCT[][] = 
 {{0  , -0.5, 0.5 , 0  , 0.5 , 0},
  {0  , 0.5 , -0.5, 0  , 0.5 , 0.5},
  {0.5, 0   , 0   , 0.5, 0.25, 0.5}};
	
double dragon[][]	=
  {{0  , 0.577, -0.577, 0, 0.0951 , 0.5893},
   {0  , 0.577, -0.577, 0, 0.4413, 0.7893},
   {0  , 0.577, -0.577, 0, 0.0952, 0.9893}};
	
double crystal[][]=
  {{0.382, 0, 0, 0.382, 0.3072, 0.619 },
   {0.382, 0, 0, 0.382, 0.6033, 0.4044},
   {0.382, 0, 0, 0.382, 0.0139, 0.4044},
   {0.382, 0, 0, 0.382, 0.1253, 0.0595},
   {0.382, 0, 0, 0.382, 0.492 , 0.0595}};

double tree[][]=
 {{0.195 , -0.488, 0.344 , 0.443 , 0.4431, 0.2452},
  {0.462 , 0.414 , -0.252, 0.361 , 0.2511, 0.5692},
  {-0.058, -0.07 , 0.453 , -0.111, 0.5976, 0.0969},
  {-0.035, 0.07  , -0.469, -0.022, 0.4884, 0.5069},
  {-0.637, 0     , 0     , 0.501 , 0.8662, 0.2513}};

double fern[][]=
  {{0.849, 0.037 , -0.037, 0.849, 0.075, 0.183 },
   {0.197, -0.226, 0.226 , 0.197, 0.4  , 0.049 },
   {-0.15, 0.283 , 0.26  , 0.237, 0.575, -0.084},
   {0    , 0     , 0     , 0.16 , 0.5  , 0     }};
	   
double maze[][]=
 {{1.0/3, 0     , 0 , 1.0/3, 1.0/3, 2.0/3},
  {0    , 1.0/3 , 1 , 0    , 2.0/3, 0    },
  {0    , -1.0/3, -1, 0    , 1.0/3, 1    }};

void drawIFS(double function[][], double x, double y, int depth) {
}

// exercise 2 //////////////////////////////////

double sierpinski[][] =
 {{0, 0, 0, 0, 0, 0  },
  {0, 0, 0, 0, 0, 0  },
  {0, 0, 0, 0, 0, 0  }};

// exercise 3 //////////////////////////////////
	
void drawSnowFlake(int depth, Point p1, Point p5) {
}

// utilities ///////////////////////////////////

class Point {
  public double x, y;	
  public Point(double x, double y) {
    this.x=x;
    this.y=y;
  }
}