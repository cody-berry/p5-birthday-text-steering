/*
@author Cody
@date 2022.02.22

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
☒ add edges()
☐ add sound, sizes get bigger depending on p5.Beat, however it is calculated
☐ jiggling particles and lyrics with blue rectangle having right side going
 to the right starting with a rectangle with width 0, height textAscent() +
  textDescent() with the lyrics
☐ add changing velocity with random acceleration every frame
*/

let font
let vehicles = []

// here's our theme song for Liya's birthday: Daniel's Tiger Neighborhood!
let dtnThemeSong
let playing = false

// the amount of milliseconds before the song started
let songStartMillis


function preload() {
  font = loadFont('fonts/Meiryo-01.ttf')
  dtnThemeSong = loadSound('dtnthemesong.mp3')
}


function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  strokeWeight(4)
  textSize(130)

  let points = font.textToPoints(
      'Happy birthday Liya!', 10, height/2, 50,
      {sampleFactor: 0.3, simplifyThreshold: 0})

  for (let i = 0; i < points.length; i++){
    vehicles.push(
        new Vehicle(
            points[i].x, points[i].y,
            color(map(points[i].x, 0, width-100, 0, 360), 100, 100),
            round(random())))
  }
}


function draw() {
  background(234, 24, 34)

  // // make a line moving from right to left and whatever it has covered is shown
  // let showingPosition = width-frameCount*10
  // stroke(0, 0, 100)
  // line(showingPosition, 0, showingPosition, height)
  //
  // for (let i = 0; i < vehicles.length; i++){
  //   let vh = vehicles[i]
  //
  //   if (vh.pos.x >= showingPosition) {
  //     vh.show()
  //   }
  //
  //   vh.update()
  //   // 45000 is the amount of milliseconds the song lasts for.
  //   if (millis() - songStartMillis > 45000) {
  //     vh.behaviors()
  //     dtnThemeSong.stop()
  //     console.log("Solute! Stopping.")
  //     noLoop()
  //   }
  //
  //   vh.edges()
  // }

  // console.log(dtnThemeSong.isPlaying())
}





function keyPressed() {
  if (key === 's') {
    // console.log(dtnThemeSong.volume())
    console.log("the song is about to play!")
    dtnThemeSong.play()
    songStartMillis = millis()
    playing = true
  }

  // console.log("the mouse has been pressed!")
}


function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume().then(r => {});
  }
}