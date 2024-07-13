
import './App.css'
import AddGameForm from './components/AddGameForm'
import EditGameForm from './components/EditGameForm'
import Footer from './components/Footer'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
     <Navbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/add-game" element={<AddGameForm/>}/>
    <Route path="/edit-game/:id" element={<EditGameForm/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
