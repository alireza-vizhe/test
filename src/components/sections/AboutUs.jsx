import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";

const AboutUs = () => {
  const reserve = () => {
    toast.success(
      "از طریق شبکه های اجتماعی علم آموزان که آدرس تمام شبکه ها اجتماعی موجود در بخش فوتر قرار داده شده است می توانید انجام بدهید"
    );
  };

  return (
    <div class="aboutus-section">
      <Helmet>
        <title>درباره ما | علم آموزان</title>
      </Helmet>
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="aboutus">
              <h2 class="aboutus-title">درباره ما</h2>
              <p class="aboutus-text">

              برتری علم آموزان در مقایسه با سایت های تقریبا مشابه داشتن ارایه
                مدرک معتبر , داشتن اساتید دانشگاهی و
                اطلاع بیشتر مستقیم با خود اساتید مورد نظر, داشتن امکان آزمون
               برای دریافت مدرک و تایین سطح
              </p>
              <hr />
              <p class="aboutus-text">
              درسال 1402 وبسایت علم آموزان تاسیس شد و برای فراهم کردن نیازمندی
                های پیشرفت در حوزه کامپیوتر و برای فراهم کردن مدرک معتبر تاسیس گردید
              </p>
              <a class="aboutus-more" onClick={reserve}>
                سفارش طراحی سایت
              </a>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="aboutus-banner">
              <img
                src={require("../image/aboutusimage.webp")}
                className="img-fluid"
                alt="درباره تیمزیاب"
              />
            </div>
          </div>
          <div class="col-md-5 col-sm-6 col-xs-12">
            <div class="feature">
              <div class="feature-box">
                <div class="clearfix">
                  <div class="iconset shadow">
                    <img
                      src={require("../image/logo.png")}
                      className="img-fluid p-2"
                      alt="لگو علم آموزان"
                    />
                  </div>
                  <div class="feature-content">
                    <a href="https://elmamouzan.ir">
                      <h4>وب سایت علم آموزان</h4>
                    </a>
                    <p>
                      وب سایت علم آموزان با مشارکت دانشگاه آزاد و دانشگاه پیام نور و یک شرکت برنامه نویسی معتبر در سال 1402/3/29 ایجاد شد
                    </p>
                  </div>
                </div>
              </div>
              <div class="feature-box mt-5">
                <div class="clearfix">
                  <div class="iconset shadow">
                    <img
                      src={require("../image/servicesImage.jpg")}
                      className="img-fluid p-2"
                      alt="خدمات"
                    />
                  </div>
                  <div class="feature-content">
                    <a href="https://elmamouzan.ir">
                      <h4>خدمات علم آموزان</h4>
                    </a>
                    <p>
                      ایجاد دوره های جدید با کیفیت بسیار بالا و دانشگاهی, اساتید
                      دانشگاهی مدرس دوره های علم آموزان, دریافت مدرک بسیار معتبر
                      بعد از گذراندن آزمون پایانی تایید شده در دانشگاه پیام نور,
                      دانشگاه آزاد, شرکت علم آموزان, شرکت معتبر برنامه نویسی
                    </p>
                  </div>
                </div>
              </div>
              <div class="feature-box mt-5">
                <div class="clearfix">
                  <div class="iconset shadow">
                    <img
                      src={require("../image/supportImage.png")}
                      className="img-fluid p-2"
                      alt="پشتیبانی"
                    />
                  </div>
                  <div class="feature-content">
                    <a href="https://elmamouzan.ir">
                      <h4>پشتیبانی علم آموزان</h4>
                    </a>
                    <p>
                      با استفاده از چت آنلاین در گوشه صفحه سمت راست میتوانید
                      پشتیبانی از طرف مدیر سایت دریافت کنید و همینطور در شبکه
                      های اجتماعی نیز در خدمت شما عزیزان هستیم
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
