import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThere, setShowThere] = useState(false);

  const beZoodi = () => {
    toast.success("به زودی این قابلیت اضافه و در دسترس عموم قرار خواهد گرفت!");
  };

  return (
    <footer>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h4 className="font-weight-bold footer-top-text">
              سوالات متداول درباره{" "}
              <a href="https://elmamouzan.ir" className="text-white">
                {" "}
                سایت علم آموزان
              </a>
            </h4>
          </div>
          <div className="col-md-6">
            <div
              className="questions-parent my-2"
              onClick={() => setShow(!show)}
            >
              <small>چگونه می توانم با پشتیبانی هماهنگ کنم؟</small>
            </div>
            {show ? (
              <small className="question-answers">
                در بخش پشتیبانی آنلاین در صفحه اول تمامی دوره ها و یا ارسال تیکت
                در بخش تماس با ما و یا سمت راست پایین میتوانید روی علامت چت
                یزنید و آنلاین و بصورت رایگان مشاوره و پشتیبانی دریافت کنید
              </small>
            ) : null}
            <div
              className="questions-parent my-2"
              onClick={() => setShowTwo(!showTwo)}
            >
              <small>آیا مدرک بعد از دوره معبتر است؟</small>
            </div>
            {showTwo ? (
              <small className="question-answers">
                بله, مدرکی که بعد از پاس کردن آزمون مد نظر دریافت میکنید از طرف
                4 مشترک حمایت و امضا میشه, دانشگاه پیام نور, دانشگاه آزاد, شرکت
                علم آموزان, و یک شرکت برنامه نویسی قدرتمند و موفق
              </small>
            ) : null}
            <div
              className="questions-parent my-2"
              onClick={() => setShowThere(!showThere)}
            >
              <small>دوره ها برگزار شده اساتید دانشگاه هستند؟</small>
            </div>
            {showThere ? (
              <small className="question-answers">
                بله, دوره های برگزار شده از طرف اساتید مورد تایید دانشگاه های
                مشترک علم آموزان و یا متخصص های مورد تایید این شرکت می باشند.
              </small>
            ) : null}
          </div>
          <div className="col-md-6 col-lg-6 col-xl-6 col-12 row m-0">
            <div className="col-lg-3 col-xl-3 my-1 col-6 px-1">
              <div className="card footer-sponsers-image">
                <div className="card-body">
                  <img
                    src="https://cdn.nody.ir/files/2023/03/01/nody-azad-university-1677659719.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xl-3 col-6 my-1 px-1">
              <div className="card footer-sponsers-image">
                <div className="card-body px-0">
                  <img src={require("../image/javaneh.jpeg")} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xl-3 col-6 my-1 px-1">
              <div className="card footer-sponsers-image">
                <div className="card-body px-0">
                  <img src={require("../image/teamsYab2.jpeg")} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-3  col-xl-3 col-6 my-1 px-1">
              <div className="card footer-sponsers-image">
                <div className="card-body px-0">
                  <img src="https://parspng.com/wp-content/uploads/2023/01/zarin-palpng.parspng.com_.png" alt="" />
                
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 footer-col-8 my-4">
            <div className="col-md-8 my-4">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <ul className="p-0">
                      <h6 className="font-weight-bold">دانشجویان</h6>
                      <br />
                      <li>
                        <Link to="/archive/teams-posts" className="text-white">
                          <small>دوره های دارای مدرک</small>
                        </Link>
                      </li>
                      <li>
                        <small>ثبت نام در خبر نامه</small>
                      </li>
                      <li>
                        <Link to="/archive/teams-posts" className="text-white">
                          <small>پرسش و پاسخ سوال</small>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <ul className="p-0">
                      <h6 className="font-weight-bold">اساتید</h6>
                      <br />
                      <li>
                        <Link to="/archive/users-post" className="text-white">
                          <small>پرسش و پاسخ</small>
                        </Link>
                      </li>
                      <li>
                        <small>ثبت نام در خبر نامه</small>
                      </li>
                      <li>
                        <Link to="/teacher-hire" className="text-white">
                          <small>همکاری</small>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <ul className="p-0">
                      <h6 className="font-weight-bold">علم آموزان</h6>
                      <br />
                      <li>
                        <Link to="/about-us" className="text-white">
                          <small>درباره ما</small>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact-us" className="text-white">
                          <small>تماس با ما</small>
                        </Link>
                      </li>
                      <li>
                        <Link to="/rules" className="text-white">
                          <small>قوانین</small>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <h6>علم آموزان در شبکه های اجتماعی</h6>
              <div className="container footer-images">
                <div className="row my-4">
                  <div className="col-3">
                    <img
                      src="https://img.icons8.com/fluency/48/instagram-new.png"
                      className="img-fluid"
                      alt="اینستاگرام علم آموزان"
                    />
                  </div>
                  <div className="col-3">
                    <img
                      src="https://img.icons8.com/fluency/48/telegram-app.png"
                      className="img-fluid"
                      alt="تلگرام علم آموزان"
                    />
                  </div>
                  <div className="col-3">
                    <a
                      href="https://web.rubika.ir/#c=c0B527E033357fa74da29689c3d9e9ff"
                      target="_blank"
                    >
                      <img
                        src="data:image/jpeg;base64,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"
                        className="img-fluid"
                        alt="روبیکا علم آموزان"
                      />
                    </a>
                  </div>
                  <div className="col-3">
                    <a
                      href="https://web.igap.net/app?q=%40TeamsYab1"
                      target="_blank"
                    >
                      <img
                        src="https://assets.myket.ir/icons/xlarge/net.iGap_7faa24d0-e2a5-40f4-a94b-e0e92be1bb9c.png"
                        className="img-fluid"
                        alt="ایگپ علم آموزان"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <a href="https://elmamouzan.ir" className="text-white">
                      <h6 className="site-logo-footer">ElmAmouzan</h6>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={require("../image/logo2.jpeg")}
                      className="img-fluid my-2"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <p className="p-footer">
                از معتبر ترین اساتید آموزش ببین و معتبر ترین مدرک رو دریافت کن و
                استخدام شو
              </p>
            </div>
          </div>
          <div className="col-12 copyright">
            <p>
              تمام حقوق مادی و معنوی این سایت متعلق به شرکت علم آموزان می باشد
              هر گونه کپی برداری غیر قانونی محسوب میشود{" "}
              <i className="fa fa-copyright"></i>{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
