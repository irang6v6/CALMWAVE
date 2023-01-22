class Dude {
  _time = 0
  _rot = 0
  _mag = 0
  _debounce = 0

  constructor(x, y, c) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.look = createVector(0, 0)

    this.looking = false
    this.moving = true
    this.color = c || "#96A884"
  }

  lookAt(dude) {
    if (dude == null) this.looking = false
    else if (this._debounce <= 0) {
      this._debounce = 500
      this.look.set(dude.pos?.x, dude.pos?.y)
      this.looking = true
    }
  }

  _drawWalkCycle() {
    const rot_step = sin(this._rot),
      abs_step = abs(rot_step),
      walk_mag = this._mag

    // draw & warp shadow
    fill("rgba(190, 190, 190, 0.6)")
    ellipse(0, 23, 50 + abs_step * 4, 16 - abs_step * 2)

    // hippity hoppity the dude
    if (walk_mag <= 0.05) rotate(0)
    else if (this.moving) {
      translate(0, -abs_step * 5 * (walk_mag * 0.4))
      rotate(rot_step * 0.2 * (walk_mag * 0.4))

      if (this._time > max(30, 175 / walk_mag)) {
        // smaller increment => smoother motion
        this._rot = (this._rot + HALF_PI) % TWO_PI
        this._time = 0
      }
    }
  }

  _drawDude() {
    push()
    translate(-30, -38)

    // draw the body
    fill(this.color)
    beginShape()
    vertex(60.5, 30)
    bezierVertex(60.5, 46.5685, 47.0685, 54.2857, 30.5, 54.2857)
    bezierVertex(13.9315, 54.2857, 0.5, 46.5685, 0.5, 30)
    bezierVertex(0.5, 13.4315, 13.9315, 0, 30.5, 0)
    bezierVertex(47.0685, 0, 60.5, 13.4315, 60.5, 30)
    endShape()

    // draw the legs
    rect(14, 42, 10, 20, 100)
    rect(35, 42, 10, 20, 100)

    // draw the eyes
    fill(255)
    circle(18, 26, 20)
    circle(42, 26, 20)

    // draw pupils & look towards direction
    const look_dir =
      this.looking && p5.Vector.sub(this.pos, this.look).normalize().mult(4)

    fill(20)
    translate(18, 26)
    circle(-look_dir.x || 0, -look_dir.y || 0, 11)
    translate(24, 0)
    circle(-look_dir.x || 0, -look_dir.y || 0, 11)

    // draw mask
    image(mask_img, -43, 3)

    pop()
  }

  draw() {
    push()
    noStroke()
    translate(this.pos.x, this.pos.y)
    scale(0.8)

    this._drawWalkCycle()
    this._drawDude()

    // fill(255, 0, 0)
    // circle(0, 0, 5)
    pop()

    this._mag = this.vel.mag()
    this._time += deltaTime
    this._debounce -= deltaTime
    this.pos.add(this.vel)
  }

  update(fn) {
    if (fn) fn.call(this, this)
    this.draw()
  }
}

/* static vars */
const NUM_DUDES = Math.round(innerWidth / 75), // how many 🧍‍?
  WARP_MARGINS = 24 // how much off-screen margin 🧍‍ warps to other side
const REACT_DIST = 250, // 🧍‍ <-- distance --> 🧍‍ will react
  REPEL_FORCE = 200 // how strong the repulsion when too close?

/* canvas elements */
let mask_img
let npcs = []

/* P5 setup & draw */
function setup() {
  createCanvas(windowWidth, windowHeight)

  const temp = document.getElementById("mask_img")
  mask_img = createImage(temp.width, temp.height)
  mask_img.drawingContext.drawImage(temp, 0, 0)

  for (let i = 0; i < NUM_DUDES; i++) {
    npcs.push(
      new Dude(
        random(0, windowWidth),
        random(0, windowHeight),
        `hsb(${floor(random(0, 360))}, 35%, ${random(50, 80)}%)`
      )
    )
  }
}

function draw() {
  background("#FBF9F4")

  let dude, closest, mag
  for (let i = 0; i < NUM_DUDES; i++) {
    ;(dude = npcs[i]), (mag = Infinity)

    dude.update(function () {
      // find dude closest to the main dude
      let other, dist
      for (let j = 0; j < NUM_DUDES; j++) {
        if (i !== j) {
          other = npcs[j]
          dist = dude.pos.dist(other.pos)

          if (dist <= mag) {
            mag = dist
            closest = other
          }
        }
      }

      // apply random walk with perlin noise
      this.xoff = (this.xoff || random(-20, 20)) + random(-0.03, 0.03)
      this.angle =
        (this.angle || 0) + sin(noise(this.xoff) * TWO_PI) * random(0, 0.05)
      let speed = random(2, 4) * min(mag / REACT_DIST, 1)

      let nx = speed * cos(this.angle),
        ny = speed * sin(this.angle)
      this.vel.set(nx, ny)

      // warp to other side if out of bounds
      if (dude.pos.x < -WARP_MARGINS) dude.pos.x = windowWidth + WARP_MARGINS
      else if (dude.pos.x > windowWidth + WARP_MARGINS)
        dude.pos.x = -WARP_MARGINS
      if (dude.pos.y < -WARP_MARGINS) dude.pos.y = windowHeight + WARP_MARGINS
      else if (dude.pos.y > windowHeight + WARP_MARGINS)
        dude.pos.y = -WARP_MARGINS

      if (mag <= REACT_DIST) {
        dude.lookAt(closest)

        // apply repulsion if too close
        const F_repel = p5.Vector.sub(dude.pos, closest.pos)
        F_repel.setMag((REPEL_FORCE * 100) / max(F_repel.magSq(), 100))
        dude.pos.add(F_repel)

        // distance line:
        // line(dude.pos.x, dude.pos.y, closest.pos.x, closest.pos.y)
      } else dude.lookAt(null)
    })
  }
}

/* Event Listeners */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
