import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { teacherRoute } from "../utils/routes";
import { hiringTeacher } from "../secure/hiringTeacherSchema";
import { toast } from "react-hot-toast";

const HiringTeacher = () => {

    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [phone , setPhone] = useState();
    const [experience, setExperience] = useState();

    const navigate = useNavigate();
  
      //! Messages
      const [error, setError] = useState([]);
      const [SUC, setSUC] = useState([]);
      const [serverError, setServerError] = useState([]);

      const sendrequest = async (e) => {
        e.preventDefault()
        try {
            await hiringTeacher.validate({
                fullname,
                email,
                phone,
                message,
                experience
            }, {abortEarly: false})
            await axios.post(teacherRoute, {fullname, email, message, phone, experience}).then(result => {
                console.log(result);
                if(result.data.message){
                    setServerError(result.data.message)
                }else{
                    toast.success("درخواست شما با موفقیت ارسال شد و به زودی جواب را دریافت خواهید کرد")
                }
            })
        } catch (error) {
            setError(error.inner)
        }
      }

    return(
        <>
        <Helmet>
          <title>همکاری مدرسین | علم آموزان</title>
        </Helmet>
        <div class="contact1">
          <div class="container-contact1">
            <form class="contact1-form validate-form" onSubmit={sendrequest}>
            
              <span class="contact1-form-title">فرم <a href="https://elmamouzan.ir/teacher-hire" className="text-dark">استخدام مدرسین</a></span>
              <small className="related-text-samll text-secondary">
                برای کسب درامد و بالا بردن رتبه خود و دانشگاه در رنکینگ کشوری با ما همکاری کنید, افزایش تجربه, دانشجوهای جدید, درامد بیشتر, محبوبیت بیشتر, فرصت های بهتر و جدید.
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
              <div
                class="wrap-input1 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  class="input1"
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="شماره تماس"
                />
                <span class="shadow-input1"></span>
              </div>
              <div
                class="wrap-input1 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  class="input1"
                  type="text"
                  name="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="حوزه تخصص و فعالیت"
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
                  placeholder="درباره فعالیت خود و تخصص خود در حوزه کاری که میخواهید همکاری کنید و درباره خود به ما شرح دهید"
                  rows="10"
                ></textarea>
                <span class="shadow-input1"></span>
              </div>
              <small className="related-text-samll text-secondary">در صورت قبولی بعد از 24 تا 48 ساعت دیگر با شما تماس خواهیم گرفت</small>
              <div class="container-contact1-form-btn">
                <button class="contact1-form-btn" onClick={sendrequest}>
                  <span>
                    <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                    ارسال پینشهاد
                  </span>
                </button>
              </div>
              <div className="text-center ff-b mt-2">
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
            </div>
            </form>
            <div class="contact1-pic js-tilt" data-tilt>
              <img src="https://cdn3d.iconscout.com/3d/premium/thumb/job-recruitment-application-5241932-4390949.png" className="img-fluid" alt="IMG" />
            </div>
          </div>
        </div>
      </>
    )
}

export default HiringTeacher;