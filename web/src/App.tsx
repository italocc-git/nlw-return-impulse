import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import { Router } from "./Router";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App;
