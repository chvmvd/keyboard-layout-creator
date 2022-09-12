import { useState } from "react";
import Keyboard from "./components/keyboard";

export default function App() {
  const [functional, setFunctional] = useState<string>("qwerty");
  const [physical, setPhysical] = useState<string>("jis109");
  return (
    <>
      <select
        value={functional}
        onChange={(e) => setFunctional(e.target.value)}
      >
        <option value="qwerty" selected>
          QWERTY
        </option>
        <option value="dvorak">Dvorak</option>
      </select>
      <select value={physical} onChange={(e) => setPhysical(e.target.value)}>
        <option value="jis109" selected>
          JIS109
        </option>
      </select>
      <Keyboard functional={functional} physical={physical}></Keyboard>
    </>
  );
}
