import { useState, useEffect } from 'react'
import Home from './page/home'
import Loading from './components/loaders/loading';
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/sign-up.jsx';

function App() {
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false,
      });
  
  
    } , []);
  
  return ( 
  <> 
     {loading && (
        <Loading finishLoading={() => setLoading(false)}
        coverImage="../assets/images/store-icon.png" />
      )}

      {!loading && ( 
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sign-up" element={<SignUp/>} />
          </Routes>
      )}
      
    </>

  );
}


export default App;
