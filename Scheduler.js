export default class Scheduler {
  constructor(numOfCores) {
    this.cores = new Array(numOfCores)
    this.readyQueue = []
  }

  run() {}
  insertProcess() {}
  scheduleProcess() {}
  descheduleProcess() {}
}
