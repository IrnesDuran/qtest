import "./App.scss";
import Routes from "./routes";
import { ContextProvider } from "./store/context";

function App() {
  return (
    <ContextProvider>
      <main className="App">
        <Routes />
      </main>
    </ContextProvider>
  );
}

export default App;
