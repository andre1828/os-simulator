import { EventBus } from "./EventBus.js"
import OSSimulator from "./OSSimulator.js"

let v = new Vue({
  el: "#app",
  data: {
    showModal: true,
    numOfCores: 1,
    numOfInitialProcesses: 0,
    schedulingAlgorithm: 3,
    processTable: [
      { id: 0, totalTime: 20 },
      { id: 1, totalTime: 20 },
      { id: 2, totalTime: 20 },
    ],
    runningProcesses: [
      { id: 0, remainingTime: 20 },
      { id: 1, remainingTime: 20 },
      { id: 2, remainingTime: 20 },
    ],
    readyProcesses: [
      { id: 0, totalTime: 20 },
      { id: 1, totalTime: 20 },
      { id: 2, totalTime: 20 },
    ],
  },
  methods: {
    startSimulation: function () {
      v.$data.showModal = false
      var osSimulator = new OSSimulator()
      osSimulator.run()
    },
  },
})

function onEvent(eventData) {
  v.$data.message = eventData
}

EventBus.$on("coffee", (eventData) => onEvent(eventData))
