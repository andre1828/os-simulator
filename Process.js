import Enum from "./Enums.js"
export default class Process {
  constructor(id, totalTime) {
    this.id = id
    this.totalTime = totalTime
    this.state = Enum.PROCESS_STATES.READY
    this.remainingTime = totalTime
  }
}
