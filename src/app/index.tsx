import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "~/shared/ui/button";
import "./index.css";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Click me!</Button>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
