
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { useEffect, useState } from 'react';




function App() {
  const [data, setDada] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    setDada(data.results);
  }

  console.log(data)

  return (
    
    <div className="App">
      <Routes>
        <Route path='/' element={<Home data={data}/>}/>
        <Route path='/characters/:id' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
