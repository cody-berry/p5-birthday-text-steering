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
version comments
☒ editions: add color, display line
☐ add edges()
☐ add sound, sizes get bigger depending on p5.Beat, however it is calculated
☐ jiggling particles and lyrics with blue rectangle having right side going
 to the right starting with a rectangle with width 0, height textAscent() +
  textDescent() with the lyrics
☐ add changing velocity with random acceleration every frame
*/

let font
let vehicles = []

function preload() {
  font = loadFont('fonts/Meiryo-01.ttf');
}

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(2)
  textSize(130)
  let points = font.textToPoints('Happy birthday Liya!', 10, height/2, 50, {sampleFactor: 0.5})
  for (let i = 0; i < points.length; i++){
    vehicles.push(new Vehicle(points[i].x, points[i].y, color(map(points[i].x, 0, width-100, 0, 360), 100, 100)))
  }
}

function draw() {
  background(0, 0, 50);

  // make a line moving from right to left and whatever it has covered is shown
  let showingPosition = width-frameCount*10
  stroke(0, 0, 100)
  line(showingPosition, 0, showingPosition, height)

  for (let i = 0; i < vehicles.length; i++){
    let vh = vehicles[i]

    if (vh.pos.x >= showingPosition) {
      vh.show()
    }
    vh.update()
    vh.behaviors()
    vh.edges()
  }
}