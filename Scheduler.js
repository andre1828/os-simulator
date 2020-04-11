export default class FIFOScheduler {
  constructor(numOfCores) {
    this.cores = new Array(numOfCores)
    this.readyQueue = []
  }

  run() {}
  insertProcess(newProcess) {
    this.readyQueue.unshift(newProcess)
  }
  scheduleProcess() {}
  descheduleProcess() {}
}
