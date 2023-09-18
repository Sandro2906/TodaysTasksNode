import Fotter from "./pages/Fotter";
import NavBar from "./pages/NavBar";
import TasksPage from "./pages/TasksPage";
import axios from 'axios'

axios.defaults.baseURL = 'https://todays-tasks-node-tt5m.vercel.app'
axios.defaults.withCredentials = true 
function App() {
  return (
    <div className="App">
      <NavBar />
      <TasksPage />
      <Fotter />
    </div>
  );
}

export default App;
