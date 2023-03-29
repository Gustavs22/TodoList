import "./styles.css";

import TitleComp from "./TitleComp";
import TodoViewComp from "./TodoViewComp";

export default function App() {
  return (
    <div className="MainView">
      <TitleComp />
      <TodoViewComp />
    </div>
  );
}
