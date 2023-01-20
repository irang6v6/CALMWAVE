$(function () {
  var exportObj = {}

  function initAll() {
    if ($.browser.msie && parseInt($.browser.version) < 10) {
      return
    }

    function SiriWave(opt) {
      this.opt = opt || {}
      this.K = 0.5
      this.F = 15
      this.speed = this.opt.speed || 0.1
      this.noise = this.opt.noise || 30
      this.phase = this.opt.phase || 0
      if (!window.devicePixelRatio) {
        devicePixelRatio = 1
      }
      this.width = devicePixelRatio * (this.opt.width || 320)
      this.height = devicePixelRatio * (this.opt.height || 100)
      this.MAX = this.height / 2 - 4
      this.canvas = $("#wave")[0]
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.canvas.style.width = this.width / devicePixelRatio + "px"
      this.canvas.style.height = this.height / devicePixelRatio + "px"
      this.ctx = this.canvas.getContext("2d")
      this.run = false
    }
    SiriWave.prototype = {
      _globalAttenuationFn: function (x) {
        return Math.pow(
          (this.K * 4) / (this.K * 4 + Math.pow(x, 4)),
          this.K * 2
        )
      },
      _drawLine: function (attenuation, color, width, noise, F) {
        this.ctx.moveTo(0, 0)
        this.ctx.beginPath()
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = width || 1
        var x, y
        F = F || this.F
        noise = noise * this.MAX || this.noise
        for (var i = -this.K; i <= this.K; i += 0.01) {
          i = parseFloat(parseFloat(i).toFixed(2))
          x = this.width * ((i + this.K) / (this.K * 2))
          y =
            this.height / 2 +
            noise *
              Math.pow(Math.sin(i * 10 * attenuation), 1) *
              Math.sin(F * i - this.phase)
          this.ctx.lineTo(x, y)
        }
        this.ctx.lineTo(this.width, this.height)
        this.ctx.lineTo(0, this.height)
        this.ctx.fillStyle = color
        this.ctx.fill()
      },
      _clear: function () {
        this.ctx.globalCompositeOperation = "destination-out"
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.ctx.globalCompositeOperation = "source-over"
      },
      _draw: function () {
        if (!this.run) {
          return
        }
        this.phase = (this.phase + this.speed) % (Math.PI * 64)
        this._clear()
        this._drawLine(0.5, "rgba(0, 168, 150, 0.5)", 1, 0.35, 6)
        this._drawLine(1, "rgba(2, 128, 144, 0.5)", 1, 0.25, 6)
        this._drawLine(1.5, "rgba(5, 102, 141, 0.5)", 1, 0.25, 6)
        clearAnimationFrame = requestAnimationFrame(this._draw.bind(this), 1000)
      },
      start: function () {
        this.phase = 0
        this.run = true
        this._draw()
      },
      stop: function () {
        this.run = false
        this._clear()
      },
      setNoise: function (v) {
        this.noise = Math.min(v, 1) * this.MAX
      },
      setSpeed: function (v) {
        this.speed = v
      },
      set: function (noise, speed) {
        this.setNoise(noise)
        this.setSpeed(speed)
      },
    }
    var SW = new SiriWave({
      width: $(window).width(),
      height: 200,
    })
    SW.setSpeed(0.008)
    SW.start()
    exportObj.SiriWave = SiriWave
  }
  initAll()

  function optimiztionResize(fn, time) {
    var timer = null,
      __self = this
    return function () {
      if (!timer) {
        timer = setTimeout(function () {
          clearTimeout(timer)
          timer = null
          fn.apply(__self)
        }, time || 500)
      }
    }
  }
  $(window).resize(
    optimiztionResize(function () {
      if ($.browser.msie && parseInt($.browser.version) < 10) {
        return
      }
      cancelAnimationFrame(clearAnimationFrame)
      var SW = new exportObj.SiriWave({
        width: $(window).width(),
        height: 200,
      })
      SW.setSpeed(0.01)
      SW.start()
    }, 100)
  )
})
