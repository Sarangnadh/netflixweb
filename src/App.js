import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Componets/Main';
import Signin from './Componets/Signin';
import Moviedetail from './Componets/Moviedetail';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/home" element={<Main/>}/>
      <Route path="/" element={<Signin/>}/>
      <Route path="/MovieDetail" element={<Moviedetail/>}/>



    
      </Routes>
        

    </div>
    

  );
}

export default App;
