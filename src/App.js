import { Toaster } from "react-hot-toast";
import MainLayout from "./components/layouts/MainLayout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import UnameId from "./components/context/UnameId";


function App() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("progress", {
      value: 100,
      scrollTrigger: {
        scrub: 0.5
      }
    })
  }, [])

  

  return (
    <div className="Parent-all">
     <UnameId>
     <MainLayout/>
      <Toaster position="bottom-center"
  reverseOrder={false}/>
     </UnameId>
    </div>
  );
}

export default App;
