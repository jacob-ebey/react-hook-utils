/**
 * Creates a new event that allows subscribers to add and remove event handlers.
 * @return {function}
 * @property {function(handler: function)} add Add a new event handler.
 * @property {function(handler: function)} remove Remove an event handler.
 */
export default function createEvent() {
  let invokeList = [];

  const event = (...args) => {
    for (const e of invokeList) {
      e(...args);
    }
  };

  event.add = e => {
    invokeList = [...invokeList, e];
  };

  event.remove = e => {
    invokeList = invokeList.filter(c => c !== e);
  };

  return event;
}
