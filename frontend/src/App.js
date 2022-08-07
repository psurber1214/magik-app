import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Create from './pages/Create'
import Hello from './pages/Hello'

function App() {
  return (
    <Router>
      <div>
        <Navbar></Navbar>
        <main className='container mx-auto px-3 pb-12 '>
          <Routes>
            <Route path='/' element={<Hello />}></Route>
            {/* <!-- <Route path='/letterman/:lettermanId' element={<Letterman />} /> --> */}
            <Route path='/letterman/create' element={<Create />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
