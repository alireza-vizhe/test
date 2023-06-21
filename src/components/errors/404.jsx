import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
    <Helmet>
            <title>{`صفحه پیدا نشد | علم آموزان `}</title>
          </Helmet>
      <div id="notfound" className="mx-3">
<div class="notfound">
<div class="notfound-404">
<h1>4<span>0</span>4</h1>
</div>
<h2>متاسفانه صفحه درخواستی شما قابل دسترسی نمی باشد</h2>

<Link to="/"><button className="btn-nav">برگرد به صفحه اصلی</button></Link>

</div>
</div>
    </>
  );
};

export default Error404;
