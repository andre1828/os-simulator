export default class FIFOScheduler {
  constructor(numOfCores) {
    this.cores = new Array(numOfCores)
    this.readyQueue = []
  }

  run() {
    clock.postMessage("tick")
  }
  insertProcess(newProcess) {
    this.readyQueue.unshift(newProcess)
  }
  scheduleProcess() {}
  descheduleProcess() {}
  tick() {
    console.log("scheduler tick")
  }
}
