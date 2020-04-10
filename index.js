import { EventBus } from "./EventBus.js"

let v = new Vue({
  el: "#app",
  data: {
    message: "bla",
  },
})

function onEvent(eventData) {
  v.$data.message = eventData
}

EventBus.$on("coffee", (eventData) => onEvent(eventData))
