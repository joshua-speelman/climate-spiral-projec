// NASA dataset: reference: https://data.giss.nasa.gov/gistemp/
let table;

// Declaring gradient background globals
let topColour, bottomColour;

// Declaring the months of the year
let monthArray;

// setting radii as global variables
let zeroRad = 75;
let oneRad = 150;

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
  circle(0, 0, zeroRad * 2);
  fill(255);
  noStroke();
  text("0°", zeroRad + 10, 0);
  
  // Second innermost circle
  stroke(255);
  strokeWeight(2);
  noFill();
  circle(0, 0, oneRad * 2);
  fill(255);
  noStroke();
  text("1°", oneRad + 10, 0);
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
    textAlign(CENTER, CENTER);
    textSize(24);
    let angle = TWO_PI * (i / monthArray.length) - PI/2;
    
    let x = 260 * cos(angle);
    let y = 260 * sin(angle);
    
    push();
    
    translate(x, y);
    rotate(angle + HALF_PI);
    text(monthArray[i], 0, 0);
    
    pop();  
  }
  
  // getting the anomaly value for every single month from the data set, per row
  // The code below draws is modular and allows for the year to change as the dataset is sketched
  let row = table.getRow(0);
  let year = row.get("Year");
  text(year, 0, 0);
  
  // Beginning the spiral based on year input
  beginShape();
  noFill();
  stroke(255);
  
  // indicating where 0° begins. 50 degrees from the centre. 1° is 100 degrees from the center
  for (let p = 0; p < table.getRowCount(); p++) {
    let row = table.getRow(0);
    // todo: currently getRow(p) should work, but returns undefined. I think it's due to the null values in the dataset
    // let row = table.getRow(p);
    // let year = row.get("Year");
    // textAlign(CENTER, CENTER);
    // text(year, 0, 0);
    
    for (let i = 0; i < monthArray.length; i++) {

      let anomalyValue = row.getNum(monthArray[i]);
      let angle = TWO_PI * (i / monthArray.length) - PI/2;

      // need to map the circle points to the ACTUAl degrees in the dataset
      // need to know the actual pixel values from 0 degrees to 1 degrees
      let r = map(anomalyValue, 0, 1, 75, 150);

      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
  }
  endShape(CLOSE);
  noLoop(); 
}