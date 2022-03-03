
class Vehicle {
    constructor(x, y, c, inverted) {
        this.pos = new p5.Vector(random(width), random(height))
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector(0, 0)
        this.r = 1
        this.target = new p5.Vector(x, y)
        this.maxSpeed = 4
        this.maxForce = 0.3

        // our color
        this.c = c

        // is our radius inverted (the amplitude maps to from 1 to 8 or from 8
        // to 1)?
        this.invert = inverted

        // this.invert's description contains "the amplitude". Here, we'll
        // define the amplitude we're talking about.
        this.p5amp = new p5.Amplitude()
    }


    // shows the vehicle
    show() {
        // now we can put our color to use!
        fill(this.c)
        stroke(this.c)

        circle(this.pos.x, this.pos.y, this.r*2)
    }


    // updates the vehicle's position, velocity, and acceleration
    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        this.acc.mult(0)

        // update our r
        this.r = map(this.p5amp.getLevel(), 0, 1, 1, 8)
        if (this.invert) {
            this.r = this.r - 8
            this.r++
        }
    }


    // applies a force to the vehicle
    applyForce(f){
        // f = ma, and m = 1 so a = f
        this.acc.add(f)
    }


    // checks the edges
    edges = function() {
        if (this.pos.x + this.r > width) { // right
            this.pos.x = this.r
        } if (this.pos.x - this.r < 0) { // left
            this.pos.x = width-this.r
        } if (this.pos.y + this.r > height) { // bottom
            this.pos.y = this.r
        } if (this.pos.y - this.r < 0) { // top
            this.pos.y = height-this.r
        }
    }


    // applies the vehicle's behaviors
    behaviors(){
        // we always want to seek our target
        let seek = this.arrive(this.target)
        // "I don't want to see the mouse!", says this.
        let mouse = new p5.Vector(mouseX, mouseY)
        let flee = this.flee(mouse)


        // scaling room {
        seek.mult(1)
        flee.mult(1)
        //              }

        // apply our forces
        this.applyForce(seek)
        if (mouseIsPressed) {
            this.applyForce(flee)
        }
    }


    // seeks the target
    seek(target){
        // get a line from us to the target, the first step of getting the
        // desired velocity
        let desired = p5.Vector.sub(target, this.pos)
        // we always want to go at our maximum speed
        desired.setMag(this.maxSpeed)
        // steering = desired - current
        desired.sub(this.vel)
        // make sure we don't apply too much force
        return desired.limit(this.maxForce)
    }


    // flees the target
    flee(target){
        // fleeing is the opposite of seeking
        if (true) {
            return this.seek(target).mult(-1)
        }
        else{
            return new p5.Vector(0, 0)
        }
    }


    // arrives at the target
    arrive(target){
        // get a line from us to the target, the first step of getting the
        // desired velocity
        let desired = p5.Vector.sub(target, this.pos)
        // we always want to go at our maximum speed, except for if we're
        // inside a perception radius
        let speed = this.maxSpeed
        if (desired.mag() < 50){
            speed = map(desired.mag(), 0, 50, 0, this.maxSpeed)
        }
        desired.setMag(speed)
        // steering = desired - current
        desired.sub(this.vel)
        // make sure we don't apply too much force
        return desired.limit(this.maxForce)
    }
}