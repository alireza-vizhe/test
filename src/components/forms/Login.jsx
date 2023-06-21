import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { loginValidation } from "../secure/loginValidation";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { UnameIdContext } from "../context/UnameId";
import Error404 from "../errors/404";
import { usersRoute } from "../utils/routes";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const Login = () => {
  //? Set User Details
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [userD, setUserD] = useContext(UnameIdContext);

  //* Navigator
  const navigate = useNavigate();

    //* Refresh Page
    const refresh = () => {
      window.location.reload(true);
    }
  

  //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);

    //* lodaer Spinner
    const [loading, setLoading] = useState(false);



  //* Rest Server
  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();

    captchaRef.current.reset();

    //? user Login Validation
    try {
      await loginValidation.validate(
        {
          email,
          password,
        },
        { abortEarly: false }
      );

      //* user login Request Sender
      await axios
        .post("https://el-mcqy.onrender.com/login-user", {
          email,
          password, 
          recaptchaValue
        })
        .then(async (result) => {
          console.log(result);
            await setServerError(result.data.message);
          const users = await axios.get(usersRoute);
          const userAll = [...users.data];
          const findedUser = userAll.find(
            (item) => item._id === result.data.userId
          );
          await localStorage.setItem("user", findedUser._id);
          if(result.data.userId && result.data.token){
            if(result.data.message){
              setServerError(result.data.message)
              setError(null)
              setLoading(false)
            }else{
              navigate("/");
              toast.success("خوش اومدی");
              setLoading(false)
              refresh();
            }
          }else{
            setLoading(true)
          }
          if(result.data.message){
            setServerError(result.data.message)
              setLoading(false)
              setError(null)
          }
          
        });


    } catch (error) {
      console.log(error);
      setError(error.inner);

        setLoading(false)
  
    
    }
  };
  //* Set Captcha
  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  return (
   <>
   {!loading ? ( <>
    <Helmet>
            <title>{`ورود | علم آموزان `}</title>
          </Helmet>
    {userD ? (<Error404/>) : (<section className="sec-register">
      <div className="container">
        <div className="card register-card">
          {SUC ? (
            SUC.length ? (
              <p className="alert alert-success">{SUC}</p>
            ) : null
          ) : null}
          {error
            ? error.map((error, index) => (
                <p key={index} className="alert alert-danger">
                  {error.message}
                </p>
              ))
            : null}
          {serverError ? (
            serverError.length >= 1 ? (
              <p className="alert alert-danger">{serverError}</p>
            ) : (
              serverError.length < 1 && null
            )
          ) : null}
          <div className="container">
            <div className="card-body row">
              <div className="col-md-6">
                <h2>ورود</h2>
                <form
                  action="/register-user"
                  onSubmit={handleLogin}
                  method="POST"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل"
                    className="form-control my-2"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="گدرواژه"
                    className="form-control my-2"
                  />
                  <p>اکانت نداری؟<Link to="/register-users"> ثبت نام</Link></p>
                  <Link to="/forget-password"><small>فراموشی رمز عبور</small></Link>
                  <div className="text-center justify-content-center my-3">
                    <ReCAPTCHA
                      sitekey={SITE_KEY}
                      onChange={onChange}
                      ref={captchaRef}
                    />
                  </div>
                  <button className="btn-nav my-3" onClick={handleLogin}>
                     ورود
                  </button>
                </form>
              </div>
              <div className="col-md-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/544/544578.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
          <p className="text-secondary my-4">
            <span className="text-danger">توجه داشته باشید </span> شما{" "}
            <Link to="/rules">قوانین</Link> سایت علم آموزان را قبول کرده و وارد می
            شوید!
          </p>
        </div>
      </div>
    </section>)}
    </>) : (<div className="cliploader">
           <small className="fontandsize">درحال انجام عملیات مورد نظر</small>
           <ClipLoader
           color="#333"
           loading={loading}
           size={150}
           aria-label="Loading Spinner"
           data-testid="loader"
         /></div>)}
   </>
  );
};

export default Login;
