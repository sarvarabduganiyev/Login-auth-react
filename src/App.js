import { useAuth } from "./hook/useAuth";
import Private from "./Private-app";
import Public from "./Public-app";

function App() {
  const [token] = useAuth();
  if (token) {
    return <Private />;
  }
  return <Public />;
}
export default App;
