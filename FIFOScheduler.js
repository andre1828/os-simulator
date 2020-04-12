import { EventBus } from "./EventBus.js"
export default class FIFOScheduler {
  constructor(numOfCores) {
    this.cores = new Array(numOfCores).fill(null)
    this.readyQueue = []
  }

  run() {
    // start clock
    clock.postMessage("tick")
    // schedule processes
    for (let i = 0; i < this.readyQueue.length; i++) {
      this.scheduleProcess()
    }
  }
  insertProcess(newProcess) {
    this.readyQueue.unshift(newProcess)
    EventBus.$emit("UPDATE_READY_QUEUE", this.readyQueue)
  }
  scheduleProcess() {
    for (let i = 0; i < this.cores.length; i++) {
      if (this.cores[i] === null) {
        this.cores[i] = this.readyQueue.pop()
        break
      }
    }
  }
  descheduleProcess() {}
  tick() {
    console.log("scheduler tick")
    for (let i = 0; i < this.cores.length; i++) {
      if (this.cores[i]) {
        this.cores[i].remainingTime--
        if (this.cores[i].remainingTime === 0) {
          // kill process
        }
      }
    }
    EventBus.$emit("UPDATE_CORES", this.cores)
  }
}
