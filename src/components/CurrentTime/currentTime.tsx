import {
  millisecondsToSeconds,
  millisecondsToMinutes,
  millisecondsToHours,
  getMilliseconds,
} from "date-fns";
import "./currentTime.css";

type Props = {
  currentTime: number;
};

export default function CurrentTime(props: Props) {
  const milliseconds = props.currentTime;
  const seconds = millisecondsToSeconds(milliseconds);
  const minutes = millisecondsToMinutes(milliseconds);
  const hours = millisecondsToHours(milliseconds);
  return (
    <div className="root">
      {hours > 0 && <h3>{getTimeWithZeros(hours, 2)} H, </h3>}
      <h3>{getTimeWithZeros(minutes, 2)} m,</h3>
      <h3>{getTimeWithZeros(seconds, 2)} s,</h3>
      <h3>{getTimeWithZeros(getMilliseconds(milliseconds), 3)} ms</h3>
    </div>
  );
}

function getTimeWithZeros(val: number, length: number) {
  let stringVal = String(val);
  while (stringVal.length !== length) {
    stringVal = "0" + stringVal;
  }
  return stringVal;
}
