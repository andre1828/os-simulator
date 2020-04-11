import Scheduler from "./Scheduler.js"
export default class Kernel {
  constructor(numOfCores) {
    this.processTable = []
    this.cpu = new Array(numOfCores)
    this.processId = 0
  }

  run(numOfInitialProcesses) {
    console.log("kernel run")
    // instantiate scheduler
  }
  createProcess() {}
  killProcess() {}
  runProcess() {}
}
