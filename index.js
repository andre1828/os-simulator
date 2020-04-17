import { EventBus } from "./EventBus.js"
import OSSimulator from "./OSSimulator.js"
import Enum from "./Enums.js"

var osSimulator

let v = new Vue({
  el: "#app",
  data: {
    showModal: true,
    numOfCores: 1,
    numOfInitialProcesses: 0,
    schedulingAlgorithm: 3,
    quantum: 2,
    processTable: [
      { id: 0, totalTime: 20 },
      { id: 1, totalTime: 20 },
      { id: 2, totalTime: 20 },
    ],
    cores: [],
    readyQueue: [
      { id: 0, totalTime: 20 },
      { id: 1, totalTime: 20 },
      { id: 2, totalTime: 20 },
    ],
  },
  methods: {
    startSimulation: function () {
      v.$data.showModal = false
      osSimulator = new OSSimulator(
        v.$data.numOfCores,
        v.$data.schedulingAlgorithm === Enum.SCHEDULING_ALGORITHMS.ROUND_ROBIN
          ? v.$data.quantum
          : null
      )
      osSimulator.setNumOfInitialProcesses(v.$data.numOfInitialProcesses)
      osSimulator.setSchedulingAlgorithm(v.$data.schedulingAlgorithm)
      osSimulator.run()
    },
    toggleSimulation: function () {
      clock.postMessage("toggleSimulation")
    },
  },
})

clock.onmessage = function () {
  osSimulator.tick()
}

EventBus.$on(
  "UPDATE_READY_QUEUE",
  (newReadyQueue) => (v.$data.readyQueue = newReadyQueue)
)
EventBus.$on("UPDATE_CORES", (newCores) => (v.$data.cores = newCores))

EventBus.$on(
  "UPDATE_PROCESS_TABLE",
  (newProcessTable) => (v.$data.processTable = newProcessTable)
)
