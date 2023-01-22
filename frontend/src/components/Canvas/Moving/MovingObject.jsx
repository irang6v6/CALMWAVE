export class MovingObject {
  constructor(canvasWidth, canvasHeight, x, y, color) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.liik = createVector(0, 0)
    this.looking = false
    this.moving = true
    this.color = color
  }

  animate() {}
}
