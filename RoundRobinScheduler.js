import { EventBus } from "./EventBus.js"
export default class RoundRobinScheduler {
  constructor(numOfCores, quantum) {
    this.cores = new Array(numOfCores).fill(null)
    this.quantum = quantum
    this.coresQuantum = new Array(numOfCores).fill(quantum)
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
    const process = this.cores[core]
    this.cores[core] = null
    if (process.remainingTime === 0) {
      console.log("sending message to kill proc:" + process.id)
      EventBus.$emit("KILL_PROCESS", process.id)
    } else {
      this.insertProcess(process)
      EventBus.$emit("UPDATE_READY_QUEUE", this.readyQueue)
      EventBus.$emit("UPDATE_CORES", this.cores)
    }
  }
  tick() {
    console.log("scheduler tick")
    for (let i = 0; i < this.cores.length; i++) {
      if (this.cores[i]) {
        this.cores[i].remainingTime > 0 && this.cores[i].remainingTime--
        this.coresQuantum[i]--
        if (this.cores[i].remainingTime === 0 || this.coresQuantum[i] === 0) {
          // deschedule process
          this.descheduleProcess(i)
          // reset core quantum
          this.coresQuantum[i] = this.quantum
        }
      }
    }
    this.scheduleProcess()
    EventBus.$emit("UPDATE_CORES", this.cores)
  }
}
