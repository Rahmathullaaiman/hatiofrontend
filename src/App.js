import { Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './components/Todo';
import Auth from './components/Auth';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/" element={<Auth Register/>}/>
        <Route path="/login" element={<Auth/>}/>


      </Routes>
    </div>
  );
}

export default App;
