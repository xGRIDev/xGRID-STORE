import { useState, useEffect } from 'react'
import Home from './page/home'
import Loading from './components/loaders/loading';
import './index.css'
import AOS from 'aos';
import 'aos/dist/aos.css'


function App() {
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false,
      });
  
  
    } , []);
  if(loading)
  
  return <>
     {loading && (
        <Loading finishLoading={() => setLoading(false)}
        coverImage="../assets/images/store-icon.png" />
      )}

      {!loading && <Home />}
    </>;

    return <Home/>;
}


export default App
