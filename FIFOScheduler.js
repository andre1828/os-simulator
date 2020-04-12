import { EventBus } from "./EventBus.js"
export default class FIFOScheduler {
  constructor(numOfCores) {
    this.cores = new Array(numOfCores)
    this.readyQueue = []
  }

  run() {
    // start clock
    clock.postMessage("tick")
  }
  insertProcess(newProcess) {
    this.readyQueue.unshift(newProcess)
    EventBus.$emit("UPDATE_READY_QUEUE", this.readyQueue)
  }
  scheduleProcess() {}
  descheduleProcess() {}
  tick() {
    console.log("scheduler tick")
  }
}
