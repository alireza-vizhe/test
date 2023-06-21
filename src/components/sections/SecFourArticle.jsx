import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { articlesRoute, getSingleArticleArticle, usersRoute } from "../utils/routes";
import { ClipLoader } from "react-spinners";

const ArchiveBlogs = () => {

  const [artice, setArticles] = useState([]);
  const [writter, setWritter] = useState([]);
  // const [userArticles, setUserArticles] = useState([])
  // const [userCourse, setUserCourses] = useState([])
  // const [photo, setPhoto] = useState([]);

  const { id } = useParams();

      //* lodaer Spinner
      const [loading, setLoading] = useState(true);


      useEffect(() => {
        const ar = async () => {
          await axios.get(articlesRoute).then(result => {
            setArticles(result.data)
            setLoading(false)
          })
        }
        ar()
      }, {})

    return(
        <>
        {!loading ? (
          <section>
          <Helmet>
            <title>{` مقالات | علم آموزان `}</title>
          </Helmet>
      <div className="container my-4 questionsFont">
        <div className="row">
        <div className="shape mt-3"></div>
              <div className="shape-two"></div>
            <div className="col-md-6 sec-two-texts text-left my-4">
            <h4><span className="text-white">مقاله</span> های ما</h4>
            <h5>آینده خود را با یادگیری تامین کنید...</h5>
            </div>
            <div className="col-md-6 my-4">
                <Link to="/all-courses"><button className="btn-nav">همه مقالات</button></Link>
            </div>
        </div>
        <div className="row">
        {artice ? (artice.map(item => {
          if(item.status === "public"){
            console.log(item);
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(item.img.data.data))
            );
            return(
              <div className="col-md-3 my-2">
            <div className="card">
              <div className="card-body p-0 text-center">
                <img src={`data:image/png;base64,${base64String}`} className="img-fluid" alt="" />
                <h5 className="my-4 text-secondary questionAskerName">{item.articleName}</h5>
                <Link to={`/article/${item._id}`}><button className="btn btn-primary mb-3">مشاهده</button></Link>
              </div>
            </div>
          </div>
            )
          }
          
        })) : (<div className="col-md-12 article-parent ">
          <h5>هنوز مقاله ای چاپ نشده است</h5>
          <h6>
            {" "}
            درحال چاپ مقالات به بهترین شکل ممکن و با همکاری با دانشگاه های پیام
            نور و آزاد و با حمایت یک شرکت برنامه نویسی موفق
          </h6>
        </div>)}
        </div>
      </div>
    </section>
        ) : (<div className="cliploader">
        <ClipLoader
        color="#333"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>)}
        </>
    )
}

export default ArchiveBlogs;