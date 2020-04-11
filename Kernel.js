import Scheduler from "./Scheduler.js"
import Process from "./Process.js"
export default class Kernel {
  constructor(numOfCores, scheduler) {
    this.processTable = []
    this.cpu = new Array(numOfCores)
    this.processId = 0
    this.scheduler = new Scheduler(numOfCores)
  }

  run(numOfInitialProcesses) {
    console.log("kernel run")
    // create initial processes
    for (let i = 0; i < numOfInitialProcesses; i++) {
      this.createProcess(++this.processId, Math.floor(Math.random() * 21))
    }
  }
  createProcess(id, totalTime) {
    var newProcess = new Process(id, totalTime)
    this.processTable.push(newProcess)
    // give process to scheduler
    this.scheduler.insertProcess(newProcess)
  }
  killProcess() {}
  runProcess() {}
}
