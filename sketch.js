// NASA dataset: reference: https://data.giss.nasa.gov/gistemp/
let table;

// Declaring gradient background globals
let topColour, bottomColour;

// Declaring the months of the year
let monthArray;

// Load in the table
function preload() {
  table = loadTable("data.csv", "csv", "header");
}

function setup() {
  
  pixelDensity(2);
  centerX = width / 2;
  centerY = height / 2;
  radius = 150;
  
  // Gradient background
  createCanvas(windowWidth, windowHeight);
  topColour = color(50);
  bottomColour = color(30, 20, 55, 55);
  
  for(let y=0; y<height; y++) {
    n = map(y, 0, height, 0, 1);
    let newColour = lerpColor(topColour, bottomColour, n);
    stroke(newColour);
    line(0, y, width, y);
  }
  
  // Array of the all the months of the year, used in the dataset
  monthArray = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  
}

function draw() {
  
  // Base pattern params
  translate(width/2, height/2);
  
  // Innermost circle
  stroke(200);
  strokeWeight(2);
  noFill();
  circle(0, 0, 100);
  fill(255);
  noStroke();
  text("0°", 54, 0);
  
  // Second innermost circle
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 300);
  fill(255);
  noStroke();
  text("1°", 154, 0);
  noLoop();
 
  // Outer circle
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, 500);
  
  // Polar coordinates are needed to map the outer layer's months, based on the source material:
  // https://ed-hawkins.github.io/climate-visuals/spirals.html
  // I want to describe a set of points following a radial path around the centre in translate
  // So I want to talk about these points in terms of their radius and angle relative to the  horizontal axis
  //x = r*cos(angle)
  //y = r*sin(angle)
  
  // looping through each month in the array and dispersing them based on the above function
  for (let i = 0; i < monthArray.length; i++) {
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(24);
    let angle = TWO_PI * (i / monthArray.length) - PI/2;
    
    let x = 260 * cos(angle);
    let y = 260 * sin(angle);
    
    push();
    
    translate(x, y);
    rotate(angle + HALF_PI);
    text(monthArray[i], 0, 0);
    
    pop();
  
    // todo: need to account for the data now that the base shape is applied
    
  }
}