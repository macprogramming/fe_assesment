import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Listview from './components/Listview';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <div className='row my-5'>
          <div className='col-md-6 offset-md-3'>
            <h3 className='mb-5 text-center'>FactWise Assessment Visual Reference</h3>
            <Listview />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
