import { EventBus } from "./EventBus.js"

let v = new Vue({
  el: "#app",
  data: {
    showModal: true,
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
    startSimulation: function() {
      v.$data.showModal = false
      console.log("BOOYA")
    }
  }
})

function onEvent(eventData) {
  v.$data.message = eventData
}

EventBus.$on("coffee", (eventData) => onEvent(eventData))
