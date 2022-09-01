import CurrentTime from "../CurrentTime/currentTime";
import "./intervals.css";
type Props = {
  times: number[];
};

export default function Intervals({ times }: Props) {
  return (
    <ul className="root-container">
      {times.map((time, index) => {
        return (
          <li key={index}>
            <h3>{index + 1}.</h3> <CurrentTime currentTime={time} />
          </li>
        );
      })}
    </ul>
  );
}
