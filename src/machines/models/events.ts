import { createModel } from "xstate/lib/model";

export const clockModel = createModel(
  // Initial context
  {
    currentTime: 0,
    times: [] as number[], // explicit type
  },
  {
    // Event creators
    events: {
      TICK: () => ({}), // no payload
      START: () => ({}), // no payload
      STOP_TIME: () => ({}), // no payload
      RESET: () => ({}), // no payload
      SET_INTERVAL: () => ({}), // no payload
      CLEAR: () => ({}), // no payload
      CONTINUE: () => ({}), // no payload
    },
  }
);
