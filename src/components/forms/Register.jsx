import { Link, useNavigate } from "react-router-dom";
import { registerValidator } from "../secure/registerValidation";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import Error404 from "../errors/404";
import { UnameIdContext } from "../context/UnameId";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f"

const Register = () => {
  //? Set User Details
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [userD, setUserD] = useContext(UnameIdContext);

  //* Navigator
  const navigate = useNavigate();

  //TODO Seting Progress
  const [percent, setPercent] = useState();

  //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);

      //* lodaer Spinner
      const [loading, setLoading] = useState(false);


    //* Refresh Page
    const refresh = () => {
      window.location.reload(true);
    }
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await registerValidator.validate(
        {
          fullname,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );
      await axios.post("https://el-mcqy.onrender.com/register-user", {
        fullname,
        email,
        password,
        recaptchaValue
      }).then(result => {
        setServerError(result.data.message);
        setSUC(result.data.messageSUC);
        console.log(result);
        if(result.data.fullname){
          if(result.data.message){
            setServerError(result.data.message)
            setError(null)
            setLoading(false)
          }else{
            navigate("/login-users");
        //   toast.success("با موفقیت به مجموعه ما عضو شدی");
            setLoading(false)
          }
        }else{
          setLoading(true)
        }
        if(result.data.message){
          setServerError(result.data.message)
            setLoading(false)
            setError(null)
        }
        // if(result.data.message){
        //   return
        // }else{
        //   navigate("/login-users");
        //   toast.success("با موفقیت به مجموعه ما عضو شدی");
        // }
      })
    } catch (error) {
      setError(error.inner);
      console.log(error);
      setLoading(false)
    }
  };

    //* Set Captcha
    const [recaptchaValue , setReacaptchaValue] = useState()
    const captchaRef = useRef();
  
    const onChange = (value) => {
      setReacaptchaValue(value)
    }
  

  console.log(userD);

  const writing = (e) => {
    setPassword(e.target.value);
    setPercent(e.target.value.split("").length);
  };

  return (
   <>
   {!loading ? ( <>
    <Helmet>
            <title>{`عضویت | علم آموزان `}</title>
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
           {serverError ?
                serverError.length >= 1 ? (<p  className="alert alert-danger">
                  {serverError}
                </p>) : serverError.length < 1 && null
            : null} 
          <div className="container">
            <div className="card-body row">
              <div className="col-md-6">
                <h2>عضویت</h2>
              <form action="/register-user"
                      onSubmit={handleRegister}
                      method="POST">
              <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="نام و نام خانوادگی"
                  className="form-control my-2"
                />
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
                  onChange={writing}
                  placeholder="گدرواژه"
                  className="form-control my-2"
                />
                {percent >= 1 ? (<div
                  className="progress"
                  role="progressbar"
                  aria-label="Animated striped example"
                  aria-valuenow={
                    percent >= 2
                      ? "20"
                      : percent >= 4
                      ? "40"
                      : percent >= 6
                      ? "60"
                      : percent >= 8
                      ? "80"
                      : "0"
                  }
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className={
                        percent == 2
                          ? "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                          : percent == 4 || percent == 3
                          ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                          : percent == 6 || percent == 5
                          ? "progress-bar progress-bar-striped progress-bar-animated bg-info"
                          : percent == 8 || percent == 7 || percent == 9
                          ? "progress-bar progress-bar-striped progress-bar-animated bg-primary"
                          : percent >= 10
                          ? "progress-bar progress-bar-striped progress-bar-animated bg-success"
                          : "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                      }
                    style={{
                      width: `${
                        percent == 2
                          ? "20%"
                          : percent == 4 || percent == 3
                          ? "40%"
                          : percent == 6 || percent == 5
                          ? "60%"
                          : percent == 8 || percent == 7 || percent == 9
                          ? "80%"
                          : percent >= 10
                          ? "100%"
                          : "0%"
                      }`,
                    }}
                  ></div>
                </div>) : (null)}
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="تکرار گذرواژه"
                  className="form-control my-2"
                />
                <small>اکانت داری؟ <Link to="/login-users">وارد شو</Link></small>
                 <div className="text-center justify-content-center my-3">
                  <ReCAPTCHA
                  sitekey={SITE_KEY}
                  onChange={onChange}
                  ref={captchaRef}
                  />
                  </div>
                <button className="btn-nav" onClick={handleRegister}>
                  ثبت نام
                </button>
              </form>
              </div>
              <div className="col-md-6">
                <img
                  src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
          <p className="text-secondary my-4">
            <span className="text-danger"> توجه داشته باشید </span>با ثبت نام کردن
            در این سایت شما <Link to="/rules">قوانین</Link> سایت علم آموزان را
            قبول داشته و وارد شده اید!{" "}
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

export default Register;
