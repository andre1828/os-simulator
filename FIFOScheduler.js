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
    for (let i = 0; i < this.cores.length; i++) {
      this.scheduleProcess()
    }
  }
  insertProcess(newProcess) {
    this.readyQueue.unshift(newProcess)
    EventBus.$emit("UPDATE_READY_QUEUE", this.readyQueue)
  }
  scheduleProcess() {
    for (let i = 0; i < this.cores.length; i++) {
      if (this.cores[i] === null && this.readyQueue.length) {
        this.cores[i] = this.readyQueue.pop()
        // this.cores[i] = this.readyQueue[this.readyQueue.length - 1 - i]
        // this.readyQueue[this.readyQueue.length - 1 - i] = null
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
