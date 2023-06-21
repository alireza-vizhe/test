import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import {Helmet} from "react-helmet";
import { forgetPasswordRoute } from "../utils/routes";
import { forgetPassSchema } from "../secure/forgetPasswordSchema";
import { UnameIdContext } from "../context/UnameId";
import Error404 from "../errors/404";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const ForgetPassword = () => {
  //* User Detail
  const [email, setEmail] = useState();
  const [userD, setUserD] = useContext(UnameIdContext);

  //! Navigator
  const navigate = useNavigate();

  //* Refresh Page
  const refresh = () => {
    window.location.reload(true);
  };

  //? Errors
  const [errors, setErrors] = useState([]);
  const [userErr, setUserErr] = useState([]);
  const [successMSG, setSuccessMSG] = useState([]);

  //* Rest Server
  const forgetPassword = async (e) => {
    e.preventDefault();

    captchaRef.current.reset();

    //? user Login Validation
    try {
      await forgetPassSchema.validate(
        {
            email
        },
        { abortEarly: false }
      );

      //* user login Request Sender
      await axios.post(forgetPasswordRoute, {
          email,
          recaptchaValue,
        })
        .then((result) => {
            console.log(result);
            setUserErr(result.data.message)
            setSuccessMSG(result.data.messageSUC)
          });
          // toast.success("لینک تغییز رمز عبور ارسال شد");
    } catch (error) {
      console.log(error);
      setErrors(error.inner);
    }
  };

//   //! Find User Detail And Set User Id In localStorage
//   useEffect(() => {
//     const localStorageGeter = async () => {
//       const userGeter = localStorage.getItem("user");
//       const users = await axios.get("http://localhost:5000/users");
//       const userAll = [...users.data];
//       const findedUser = userAll.find((item) => item.email === email);
//       console.log(findedUser);
//     //   setUser(findedUser);
//     //   setType(findedUser);
//     };
//     localStorageGeter();
//   }, []);

  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  return (
    <>
    <Helmet>
      <title>فراموشی رمز عبور</title>
    </Helmet>
{userD ? (<Error404/>) : (<section>
    <div className="container">
        <div className="row parent-forget">
            <div className="card forgetpassword-card my-4">
                <div className="card-body">
                    <h4>فراموشی رمز عبور</h4>
                    <div className="text-center w-100">
{successMSG ? (
    successMSG.length ? (
      <p className="alert alert-success">{successMSG}</p>
    ) : null
  ) : null}

  {userErr ? (
    userErr.length ? (
      <p className="alert alert-danger">{userErr}</p>
    ) : null
  ) : null}
  {errors
    ? errors.map((error, index) => (
        <p key={index} className="alert alert-danger">
          {error.message}
        </p>
      ))
    : null}
</div>
                    <label htmlFor="email" className="mt-3">
                        ایمیل خود را وارد کنید
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="ایمیل"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                                            <div className="text-center d-flex justify-content-center mt-3">
                        <ReCAPTCHA
                          sitekey={SITE_KEY}
                          onChange={onChange}
                          ref={captchaRef}
                        />
                      </div>
                      <div className="col-12 text-center mt-3">
                            <button className="btn-nav" onClick={forgetPassword}>ارسال</button>
                          </div>
                </div>
            </div>
        </div>
    </div>
</section>)}
    </>
  );
};

export default ForgetPassword;