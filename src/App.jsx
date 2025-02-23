import { useState } from 'react'
import './App.css'
import { Helmet, HelmetProvider} from "react-helmet-async";
import Map from './Map.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <HelmetProvider>
      <Helmet>
        <title>WiscEvents</title> {/* ✅ Set the tab title */}
        <meta name="description" content="Explore UW-Madison events on an interactive map." />
      </Helmet>
      <header style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>WiscEvents</h1>
        <p>Explore UW-Madison events on an interactive map.</p>
      </header>
      <Map/>
      </HelmetProvider>
    </>
  )
}

export default App
