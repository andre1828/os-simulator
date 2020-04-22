import FIFOScheduler from "./FIFOScheduler.js"
import SJFScheduler from "./SJFScheduler.js"
import RoundRobinScheduler from "./RoundRobinScheduler.js"
import Process from "./Process.js"
import { EventBus } from "./EventBus.js"

export default class Kernel {
  constructor(numOfCores, schedulingAlgorithm, quantum) {
    this.processTable = []
    this.cpu = new Array(numOfCores)
    this.processId = 0
    switch (schedulingAlgorithm) {
      case 3:
        this.scheduler = new FIFOScheduler(numOfCores)
        break
      case 4:
        this.scheduler = new SJFScheduler(numOfCores)
        break
      case 5:
        this.scheduler = new RoundRobinScheduler(numOfCores, quantum)
      default:
        break
    }
    EventBus.$on("KILL_PROCESS", this.killProcess.bind(this))
  }

  run(numOfInitialProcesses) {
    console.log("kernel run")
    // create initial processes
    for (let i = 0; i < numOfInitialProcesses; i++) {
      this.createProcess(++this.processId, Math.floor(Math.random() * 21) || 1)
    }

    this.scheduler.run()
  }
  createProcess(id, totalTime) {
    var newProcess = new Process(id, totalTime)
    this.processTable.push(newProcess)
    EventBus.$emit("UPDATE_PROCESS_TABLE", this.processTable)
    // give process to scheduler
    this.scheduler.insertProcess(newProcess)
  }
  killProcess(processId) {
    console.log("kill process: " + processId)
    var processIndex = this.processTable.findIndex(
      (process) => process.id === processId
    )
    this.processTable.splice(processIndex, 1)
    EventBus.$emit("UPDATE_PROCESS_TABLE", this.processTable)
  }
  runProcess() {}
  tick() {
    this.scheduler.tick()
  }
}
