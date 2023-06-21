import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/style.css";
import Error404 from "../errors/404";
import ReCAPTCHA from "react-google-recaptcha";

import { Helmet } from "react-helmet";
import { resetPassSchema } from "../secure/resetPassSchema";
import { UnameIdContext } from "../context/UnameId";
import { resetPassRoute } from "../utils/routes";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const ResetPassword = () => {
  //* User Detail
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [userD, setUserD] = useContext(UnameIdContext);

  //! Navigator
  const navigate = useNavigate();

  const { id } = useParams();

  //* Refresh Page
  const refresh = () => {
    window.location.reload(true);
  };

  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  //? Errors
  const [errors, setErrors] = useState([]);
  const [userErr, setUserErr] = useState([]);
  const [successMSG, setSuccessMSG] = useState([]);

  //* Rest Server
  const handleResetPassword = async (e) => {
    console.log(id);
    e.preventDefault();

    captchaRef.current.reset();

    //? user Login Validation
    try {
      await resetPassSchema.validate(
        {
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      //* user login Request Sender
      await axios
        .post(resetPassRoute + id, {
          confirmPassword,
          password,
          recaptchaValue,
        })
        .then(async (result) => {
          console.log(result);
          setUserErr(result.data.message);
          setSuccessMSG(result.data.messageSUC);
          if (result.data.message) {
            return;
          } else {
            navigate("/login-users");
          }
        });
    } catch (error) {
      console.log(error);
      setErrors(error.inner);
    }
  };

  //! Find User Detail And Set User Id In localStorage
  //   useEffect(() => {
  //     const localStorageGeter = async () => {
  //       const userGeter = localStorage.getItem("user");
  //       const users = await axios.get("http://localhost:5000/users");
  //       const userAll = [...users.data];
  //       const findedUser = userAll.find((item) => item._id === userGeter);
  //       setUser(findedUser);
  //       setType(findedUser);
  //     };
  //     localStorageGeter();
  //   }, []);

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  return (
    <>
    <Helmet>
            <title>{`تغییر رمز عبور | علم آموزان `}</title>
          </Helmet>
      {userD ? (
        <Error404 />
      ) : (
        <section>
          <Helmet>
            <title>{`تغییر رمز عبور | TeamsYab`}</title>
          </Helmet>
          <div className="container">
            <div className="row parent-forget">
              <div className="card forgetpassword-card mt-5">
                <div className="card-body">
                  <h4 className="mt-3 mb-5">پسورد جدید خود را وارد کنید</h4>
                  <div className="container">
                    <div className="row register-imgs-parent">
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
                      <form
                        action="/users"
                        className="w-100 px-4"
                        method="POST"
                        onSubmit={handleResetPassword}
                      >
                        <label htmlFor="password" className="mt-3">
                          پسورد خود را وارد کنید
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="پسورد"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label htmlFor="password" className="mt-3">
                          پسورد خود را تکرار کنید
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="تکرار پسورد"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-center d-flex justify-content-center mt-3">
                          <ReCAPTCHA
                            sitekey={SITE_KEY}
                            onChange={onChange}
                            ref={captchaRef}
                          />
                        </div>
                        <div className="container-fluid mt-4">
                          <div className="row">
                            <div className="col-12 text-center">
                              <button className="btn-nav"> ویرایش</button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ResetPassword;
