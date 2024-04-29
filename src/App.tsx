import { FC } from "react";
import InputOTP from "./components/InputOTP";
import "./App.css";

const App: FC = () => {
  return (
    <div className="wrapper">
      <InputOTP inputNumbers={6} />
    </div>
  );
};

export default App;
