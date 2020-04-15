import Scheduler from "./FIFOScheduler.js"
import Process from "./Process.js"
import { EventBus } from "./EventBus.js"
export default class Kernel {
  constructor(numOfCores, scheduler) {
    this.processTable = []
    this.cpu = new Array(numOfCores)
    this.processId = 0
    this.scheduler = new Scheduler(numOfCores)
    EventBus.$on("KILL_PROCESS", this.killProcess.bind(this))
  }

  run(numOfInitialProcesses) {
    console.log("kernel run")
    // create initial processes
    for (let i = 0; i < numOfInitialProcesses; i++) {
      this.createProcess(++this.processId, Math.floor(Math.random() * 21))
    }

    this.scheduler.run()
  }
  createProcess(id, totalTime) {
    var newProcess = new Process(id, totalTime)
    this.processTable.push(newProcess)
    // give process to scheduler
    this.scheduler.insertProcess(newProcess)
  }
  killProcess(processId) {
    console.log("kill process: " + processId)
    var processIndex = this.processTable.findIndex(
      (process) => process.id === processId
    )
    this.processTable[processIndex] = null
    // EventBus.$emit("UPDATE_PROCESS_TABLE", this.processTable)
  }
  runProcess() {}
  tick() {
    this.scheduler.tick()
  }
}
