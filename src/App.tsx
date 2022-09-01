import "./App.css";
import { useMachine } from "@xstate/react";
import { clockMachine } from "./machines/clockMachine";
import CurrentTime from "./components/CurrentTime/currentTime";
import Intervals from "./components/Intervals/intervals";

function App() {
  const [current, send] = useMachine(clockMachine);

  switch (current.value) {
    case "idle":
      return (
        <div className="App app-root">
          <h1>Timer</h1>
          <CurrentTime currentTime={current.context.currentTime} />

          {current.can("START") && (
            <button className="green" onClick={() => send("START")}>
              start
            </button>
          )}
        </div>
      );
    case "time_running":
    case "interval":
    case "stop":
      return (
        <div className="App app-root">
          <h1 data-xstate={current.value}>Timer</h1>
          <CurrentTime currentTime={current.context.currentTime} />

          <div className="buttons-group">
            {current.can("CLEAR") && (
              <button className="clear-button" onClick={() => send("CLEAR")}>
                clear all
              </button>
            )}

            {current.can("SET_INTERVAL") && (
              <button className="green" onClick={() => send("SET_INTERVAL")}>
                interval
              </button>
            )}

            {current.can("STOP_TIME") && (
              <button className="stop-button" onClick={() => send("STOP_TIME")}>
                stop time
              </button>
            )}
            {current.can("CONTINUE") && (
              <button className="green" onClick={() => send("CONTINUE")}>
                continue
              </button>
            )}
            {current.can("RESET") && (
              <button className="reset-button" onClick={() => send("RESET")}>
                reset
              </button>
            )}
          </div>

          <Intervals times={current.context.times} />
        </div>
      );
    default:
      return (
        <div className="App app-root">
          <h1>default</h1>
          {JSON.stringify(
            { value: current.value, context: current.context },
            undefined,
            2
          )}
        </div>
      );
  }
}

export default App;
