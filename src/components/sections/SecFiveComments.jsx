import { Link } from "react-router-dom";

const SecFiveComments = () => {
  return (
    <section>
      <div className="container my-5">
        <div className="row commentsMainPage">
        <div className="shape mt-3"></div>
              <div className="shape-two"></div>
            <div className="col-md-6 sec-two-texts text-left my-4">
            <h4><span className="text-white"> برخی</span>از نظرات دانشجویان </h4>
            <h5>بهترین سرمایه گذاری سرمایه گذاری روی خود است...</h5>
            </div>
            <div className="col-md-6 my-4">
                <Link to="/all-courses"><button className="btn-nav">همه نظر ها</button></Link>
            </div>
          <div className="col-md-6 my-2 texts">
           <div className="card some-comments-card">
            <div className="card-body">
            <p className="border-bottom text-secondary">
              من برنامه نویسی رو با سایت علم آموزان شروع کردم و الان به حوزه وب فرانت اند مسلط هستم و نه تنها از بهترین اساتید آموزش دیدم و تاز تجربشون استفاده کردن در پایان دوره یک آزمونی دادم و تونستم نقطه ضعف های خودمو بدونم و روی آنها کر کنم و بعد از اینکه استاد دروه ای که من آزمون دادم بازخورد رو دید در جاهایی که من ضعف داشتم به صورت منتورشیپ کمکم کرد تا مسیر یادگیری خودم رو تکمیل کردم و مدرگ ملی معتبر دریافت کردم
            </p>

                        <i className="fa fa-user-circle-o"><span className="icon-font"> سینا داغانی</span></i> 
            </div>
           </div>

          </div>
          <div className="col-md-6 my-2 texts">
           <div className="card some-comments-card">
            <div className="card-body">
            <p className="border-bottom text-secondary">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
              نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
              دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>

            <i className="fa fa-user-circle-o"><span className="icon-font"> سینا داغانی</span></i> 
            </div>
           </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SecFiveComments;
