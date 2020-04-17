self.isSimulationRunning = true
self.isFirstRun = true

onmessage = function (message) {
  if (message.data === "toggleSimulation") {
    self.isSimulationRunning = !self.isSimulationRunning
  }

  if (self.isFirstRun) {
    self.isFirstRun = false
    setTimeout(() => {
      setInterval(() => {
        if (self.isSimulationRunning) this.postMessage("tick")
      }, 1000)
    }, 3000)
  }
}
