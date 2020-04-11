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
    this.kernel = new Kernel(this.numOfCores)
    this.kernel.run(this.numOfInitialProcesses)
  }
  createRandomProcess() {
    // create process
    this.kernel.createProcess(/* random process*/)
  }
  setNumOfInitialProcesses(numOfProcesses) {
    this.numOfInitialProcesses = numOfProcesses
  }
  setSchedulingAlgorithm(schedulingAlgorithm) {
    this.schedulingAlgorithm = schedulingAlgorithm
  }
}

EventBus.$emit("coffee", "coffee is dope")
