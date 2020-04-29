import { EventBus } from "./EventBus.js"
import Kernel from "./Kernel.js"

export default class OSSimulator {
  constructor(numOfCores, quantum = 20) {
    this.kernel = null
    this.numOfCores = numOfCores
    this.quantum = quantum
    this.numOfInitialProcesses = null
    this.schedulingAlgorithm = null
  }

  run() {
    this.kernel = new Kernel(
      this.numOfCores,
      this.schedulingAlgorithm,
      this.quantum
    )
    this.kernel.run(this.numOfInitialProcesses)
  }
  createRandomProcess(processId, totalTime) {
    // create process
    this.kernel.createProcess(processId, totalTime)
  }
  setNumOfInitialProcesses(numOfProcesses) {
    this.numOfInitialProcesses = numOfProcesses
  }
  setSchedulingAlgorithm(schedulingAlgorithm) {
    this.schedulingAlgorithm = schedulingAlgorithm
  }
  tick() {
    this.kernel.tick()
    this.createRandomProcess(
      ++this.kernel.processId,
      Math.floor(Math.random() * 21) || 1
    )
  }
}
