var c = document.getElementById("canvas"),
  ctx = c.getContext("2d")

function animate() {
  requestAnimationFrame(animate)
  draw()
}

//Draws each piece in order: background, raindrops, then animates the drops.
function draw() {
  drawBackground()
  renderEntities()
  updateEntities()
}

function drawBackground() {
  ctx.fillStyle = "#FFFDF7"
  ctx.fillRect(0, 0, 500, 500)
  drawUmbrella()
}

//create a RainDrop object
var RainDrop = function () {
  this.x = Math.random() * 500
  this.y = -Math.random() * 500
  this.linearOptions = [3, 4, 5, 6, 7, 8]
  this.linearSpeed = this.newSpeed()
  this.fillColors = ["#66ccff", "#7CA3F3", "#176FF1"]
  this.fill = this.fillColors[Math.round(Math.random() * 2)]
}

//draw each raindrop with the following specs
RainDrop.prototype.render = function () {
  ctx.fillStyle = this.fill
  ctx.beginPath()
  ctx.arc(this.x, this.y, 8, 0 * Math.PI, 1 * Math.PI)
  ctx.lineTo(this.x, this.y - 20)
  ctx.lineTo(this.x + 8, this.y)
  ctx.closePath()
  ctx.fill()
}

//create a random starting speed for each drop
RainDrop.prototype.newSpeed = function () {
  var startSpeed = this.linearOptions[Math.round(Math.random() * 5)]
  return startSpeed
}

//update the movement of each drop and resets the location if the drop hits the umbrella or reaches the bottom.
RainDrop.prototype.update = function () {
  if (this.y > 500 || (this.x > 290 && this.x < 480 && this.y > 300)) {
    this.y = 0
    this.x = Math.random() * 500 + 50
    this.linearSpeed = this.newSpeed()
  }
  this.y += this.linearSpeed
}

//create a bunch of new RainDrops and push it into an array.

var rainVolume = 19
var allDrops = []

for (var i = 0; i < rainVolume; i++) {
  allDrops.push(new RainDrop())
}

//manage the button clicks
function addClickHandler(obj) {
  obj.onclick = function () {
    rainVolume = obj.value
    allDrops = []
    for (var i = 0; i < rainVolume; i++) {
      allDrops.push(new RainDrop())
    }
  }
}

addClickHandler(document.getElementById("little"))
addClickHandler(document.getElementById("medium"))
addClickHandler(document.getElementById("plenty"))
addClickHandler(document.getElementById("pour"))

function renderEntities() {
  allDrops.forEach(function (raindrop) {
    raindrop.render()
  })
}

function updateEntities() {
  allDrops.forEach(function (raindrop) {
    raindrop.update()
  })
}

function drawUmbrella() {
  //handle
  ctx.strokeStyle = "#A55A33"
  ctx.lineWidth = "15"
  ctx.beginPath()
  ctx.moveTo(390, 390)
  ctx.lineTo(350, 460)
  ctx.arc(330, 450, 30, 0.4 * Math.PI, -0.9 * Math.PI)
  ctx.stroke()

  //umbrella top
  ctx.fillStyle = "#A86CF6"
  ctx.beginPath()
  ctx.arc(380, 400, 100, -0.9 * Math.PI, 0.08 * Math.PI)
  ctx.fill()
  ctx.save()
  ctx.clip()

  //circles that cut out the bottom of the umbrella
  ctx.fillStyle = "#FFFDF7"
  ctx.beginPath()
  ctx.arc(305, 390, 30, 0 * Math.PI, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(358, 405, 30, 1.9 * Math.PI, 1.87 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(410, 422, 30, -0.74 * Math.PI, -1.9 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(458, 438, 30, 0 * Math.PI, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}

animate()
