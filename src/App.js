import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Userconsole from './Components/UserConsole/Userconsole';
import AddUser from './Components/NewUser/AddUser';
import EditUser from './Components/EditUser/EditUser';


function App() {
  return (
    <div className="App">
      {/* <Userconsole /> */}
      <Routes>
        <Route path="/" element={<Userconsole />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
