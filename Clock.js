onmessage = function () {
  setInterval(() => {
    this.postMessage("tick")
  }, 1000)
}
