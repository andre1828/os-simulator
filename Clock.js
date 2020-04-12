onmessage = function () {
  setTimeout(() => {
    setInterval(() => {
      this.postMessage("tick")
    }, 1000)
  }, 3000)
}
