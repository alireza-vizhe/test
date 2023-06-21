import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { contactUsRoute } from "../utils/routes";
import { contactUsSchema } from "../secure/contatcUsSchema";

const ContactUs = () => {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();

    //! Messages
    const [error, setError] = useState([]);
    const [SUC, setSUC] = useState([]);
    const [serverError, setServerError] = useState([]);
  

  const sendEmail = async (e) => {
    e.preventDefault();
   try {
    await contactUsSchema.validate({
      fullname,
      email,
      message
    }, { abortEarly: false })
    await axios.post(contactUsRoute, {
      fullname,
      email,
      message,
    }).then(result => {
      toast.success("پیام شما با موفقیت ارسال شد. به زودی جواب را دریافت خواهید کرد");
      navigate("/")
    })
   } catch (error) {
    setError(error.inner)
   }
  };

  return (
    <>
      <Helmet>
        <title>تماس با ما | علم آموزان</title>
      </Helmet>
      <div class="contact1">
        <div class="container-contact1">
          <form class="contact1-form validate-form">
          <div className="text-center ff-b">
          {error
            ? error.map((error, index) => (
                <p key={index} className="alert alert-danger">
                  {error.message}
                </p>
              ))
            : null}
          </div>
            <span class="contact1-form-title">تماس با ما</span>
            <small className="related-text-samll text-secondary">
              برای پیشنهاد, همکاری, انتقاد, سوال, مشکلات, و هر چیزی که میخوای
              میتونی باهامون به اشتراگ بزاری
              <br />
              منتظرت هستیم!
            </small>
            <div
              class="wrap-input1 validate-input"
              data-validate="Name is required"
            >
              <input
                class="input1"
                type="text"
                name="name"
                placeholder="نام"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل"
              />
              <span class="shadow-input1"></span>
            </div>
            <div class="wrap-input1 validate-input">
              <textarea
                name="subject"
                class="input1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="subject"
                cols="30"
                placeholder="متن پیام مورد نظر"
                rows="10"
              ></textarea>
              <span class="shadow-input1"></span>
            </div>
            <div class="container-contact1-form-btn">
              <button class="contact1-form-btn" onClick={sendEmail}>
                <span>
                  <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                  ارسال پیام
                </span>
              </button>
            </div>
          </form>
          <div class="contact1-pic js-tilt" data-tilt>
            <img src={require("../image/sendEmail.png")} alt="IMG" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
