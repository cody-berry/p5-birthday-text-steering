/*
@author Cody
@date 2021.09.16

version comments
. program shell: basic setup, draw. css styling
. load a font, use text
. font.textToPoints » display all points
. vehicle with: pos, vel, acc, r, maxspeed, maxforce, target
. vehicle.update,
. vehicle.applyforce
. vehicle.seek, flee » behaviors
. vehicle.arrive
. textpoints afraid of mouse
 play with optional parameters to textToPoints
 making the vehicles rainbow
*/

let font
let vehicles = []

function preload() {
  font = loadFont('fonts/Meiryo-01.ttf');
}

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  fill(210, 50, 100)
  stroke(210, 50, 100)
  strokeWeight(5)
  textSize(130)
  let points = font.textToPoints('Train', 10, height/2, 130, {samples: 1})
  for (let i = 0; i < points.length; i++){
    vehicles.push(new Vehicle(points[i].x, points[i].y))
  }
}

function draw() {
  background(0, 0, 50);
  for (let i = 0; i < vehicles.length; i++){
    let vh = vehicles[i]
    vh.show()
    vh.update()
    vh.behaviors()
  }
}