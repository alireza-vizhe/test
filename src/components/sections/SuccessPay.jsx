import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { UnameIdContext } from "../context/UnameId";
import { paymentCheckerRoute, usersRoute } from "../utils/routes";
import axios from "axios";
import { toast } from "react-hot-toast";

const SuccessPay = () => {

  const [userD, setUserD] = useContext(UnameIdContext);
  const [ok, setOk] = useState();


  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      const userGeter = localStorage.getItem("user");
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      const findedUser = userAll.find((item) => item._id === userGeter);
      setUserD(findedUser);
      if(ok === "OK"){
        await axios.post(paymentCheckerRoute, {courseId: findedUser.coursesIdGeted, userId: localStorage.getItem("user")})
      }else{
        toast.error("پروسه پرداخت با موفقیت انجام نشد")
      }
    };
    localStorageGeter();
  }, []);

  useEffect(() => {
    const sendReq = async () => {
    }
    sendReq()
  }, [])


    const location = useLocation();

    console.log(userD);

    console.log(location.search.split("=")[2]);

    useEffect(() => {
        setOk(location.search.split("=")[2])
    }, [])



    return(
        <>
        {ok === "OK" ? (<div id="notfound" className="mx-3">
  <div class="notfound">
         <Helmet>
            <title>{` پرداخت موفق | علم آموزان `}</title>
          </Helmet>
  <div class="notfound-100">
  <h1>پرداخت موفق</h1>
  </div>
  <h2>پرداخت شما با موفقیت انجام شد, با موفقیت میتوانید دوره را تماشا کنید</h2>
  
  <Link to="/"><button className="btn-nav">برگرد به صفحه اصلی</button></Link>
  
  </div>
  </div>) : (<div id="notfound" className="mx-3">
  <Helmet>
            <title>{`پرداخت ناموفق | علم آموزان `}</title>
          </Helmet>
  <div class="notfound">
  <div class="notfound-500">
  <h1>پرداخت ناموفق</h1>
  </div>
  <h2>پرداخت شما با موفقیت انجام نشد, لطفا مجددا تلاش نمایید</h2>
  
  <Link to="/"><button className="btn-nav">برگرد به صفحه اصلی</button></Link>
  
  </div>
  </div>)}
      </>
    )
}

export default SuccessPay;