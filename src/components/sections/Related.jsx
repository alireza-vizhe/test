import axios from "axios";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import { relatedSchema } from "../secure/relatedSchema";
import { relatedRoute } from "../utils/routes";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const RelatedAdNotification = () => {

  const [fullname, setFullname] = useState();
  const [email , setEmail] = useState();

  const [recaptchaValue , setReacaptchaValue] = useState()
  const captchaRef = useRef();

  //? Errors
  const [errors, setErrors] = useState([]);
  const [userErr, setUserErr] = useState([]);
  const [successMSG, setSuccessMSG] = useState([]);

  const handleSignRelated = async (e) => {
    e.preventDefault();
    try {
      await relatedSchema.validate(
        {
          email,
          fullname,
        },
        { abortEarly: false }
      );
      await axios.post(relatedRoute, {
        fullname,
        email,
        recaptchaValue
      }).then(async (data) => {
        setUserErr(data.data.message)
        setSuccessMSG(data.data.messageSUC)
        
      })
    } catch (error) {
      setErrors(error.inner)
    }
  }

  const onChange = (value) => {
    setReacaptchaValue(value)
  }


  return (
    <>
      <div class="contact1">
        <div class="container-contact1">
          <form class="contact1-form validate-form" onSubmit={handleSignRelated}>
            <span class="contact1-form-title">خبرنامه مهم!</span>
            <small className="related-text-samll text-secondary">
              اگر میخوای از آگهی های که در حوزه تخصص تو تازه قرار گرفته شده با
              خبر بشی حتما ثبت نام کن!
            </small>
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
            <div
              class="wrap-input1 validate-input"
              data-validate="Name is required"
            >
              <input class="input1" type="text" name="name" onChange={(e) => setFullname(e.target.value)} placeholder="نام" />
              <span class="shadow-input1"></span>
            </div>
            <div
              class="wrap-input1 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                class="input1"
                type="email"
                name="email"
                placeholder="ایمیل"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span class="shadow-input1"></span>
            </div>
            <div className="text-center justify-content-center my-3">
                  <ReCAPTCHA
                  sitekey={SITE_KEY}
                  onChange={onChange}
                  ref={captchaRef}
                  />
                  </div>
            <div class="container-contact1-form-btn">
              <button class="contact1-form-btn">
                <span>
                  <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                  ثبت نام در خبرنامه
                </span>
              </button>
            </div>
          </form>
          <div class="contact1-pic js-tilt" data-tilt>
            <img src={require("../image/relateAd.png")} alt="IMG" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedAdNotification;
