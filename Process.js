export default class Process {
    constructor(id, totalTime, state) {
        this.id = id
        this.totalTime = totalTime
        this.state = state
        this.remainingTime = totalTime
    }
}
