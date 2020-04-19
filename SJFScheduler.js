import { EventBus } from "./EventBus.js"
export default class SJFScheduler {
  constructor(numOfCores) {
    this.cores = new Array(numOfCores).fill(null)
    this.readyQueue = []
  }

  run() {
    // start clock
    clock.postMessage("tick")
  }
  insertProcess(newProcess) {
    if (!this.readyQueue.length) {
      this.readyQueue.unshift(newProcess)
      return
    }

    let found = false
    for (let i = this.readyQueue.length - 1; i >= 0; i--) {
      if (newProcess.totalTime < this.readyQueue[i].totalTime) {
        this.readyQueue.splice(i + 1, 0, newProcess)
        found = true
        break
      }
    }
    if (!found) {
      this.readyQueue.splice(0, 0, newProcess)
    }
    EventBus.$emit("UPDATE_READY_QUEUE", this.readyQueue)
  }
  scheduleProcess() {
    for (let i = 0; i < this.cores.length; i++) {
      if (this.cores[i] === null && this.readyQueue.length) {
        this.cores[i] = this.readyQueue.pop()
      }
    }
    EventBus.$emit("UPDATE_READY_QUEUE", this.readyQueue)
    EventBus.$emit("UPDATE_CORES", this.cores)
  }
  descheduleProcess(core) {
    const processId = this.cores[core].id
    this.cores[core] = null
    console.log("sending message to kill proc:" + processId)
    EventBus.$emit("KILL_PROCESS", processId)
  }
  tick() {
    console.log("scheduler tick")
    for (let i = 0; i < this.cores.length; i++) {
      if (this.cores[i]) {
        this.cores[i].remainingTime > 0 && this.cores[i].remainingTime--
        if (this.cores[i].remainingTime === 0) {
          // deschedule process
          this.descheduleProcess(i)
        }
      }
    }
    this.scheduleProcess()
    EventBus.$emit("UPDATE_CORES", this.cores)
  }
}
