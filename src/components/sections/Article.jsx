import { useContext, useEffect, useState } from "react";
import { UnameIdContext } from "../context/UnameId";
import axios from "axios";
import { allCoursesRoute, articlesRoute, getSingleArticleArticle, usersRoute } from "../utils/routes";
import { Link, useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { ClipLoader } from "react-spinners";
import ReactHtmlParser from "react-html-parser";

const Article = () => {
  const [artice, setArticle] = useState([]);
  const [writter, setWritter] = useState([]);
  const [userArticles, setUserArticles] = useState([])
  const [userCourse, setUserCourses] = useState([])
  const [photo, setPhoto] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getArticle = async () => {
      await axios.post(getSingleArticleArticle + id).then(async (result) => {
        console.log(result);
        setArticle([result.data]);
        const users = await axios.get(usersRoute);
        const userAll = [...users.data];
        setWritter(
         [ userAll.find(
            (item) => item._id == result.data.writterId)]
        )
        setLoading(false)
      });
    };
    getArticle();
  }, []);

    //* Get User Image
    useEffect(() => {
        const getImage = async () => {
          await axios.get("https://el-mcqy.onrender.com/images").then((result) => {
            console.log(result.data);
            setPhoto(result.data);
            console.log(photo);
          });
        };
        getImage();
      }, []);

    //* lodaer Spinner
    const [loading, setLoading] = useState(true);

//   useEffect(() => {
    const getArticle = async () => {await axios.get(articlesRoute).then(result => {
        // console.log(writter.map(item => item._id), result.data.map(item => item.writterId));
        setUserArticles(result.data.filter(item => item.writterId == writter.map(item => item._id)))
      })}
      getArticle();
//   } , [])



    const setuserCourses = async () => {
        await axios.get(allCoursesRoute).then((result) => {
            // setUserCourses(result.data);
            console.log(result);
            const filterCourses = result.data.filter(
              (item) => item.userId == writter.map((item) => item._id)
            );
            setUserCourses(filterCourses);
            setLoading(false);
          });
    }
    setuserCourses();


  console.log(writter);
  console.log(artice);

  return (
   <>
   {!loading ? (
     <section>
     <div className="container">
       <div className="row my-5">
         <div className="card w-100 questionsFont">
   {!loading ? (artice.map((item) => (
             <div className="card-body row">
               <div className="col-md-8">
                 <div className="card w-100 my-3">
                  <div className="card-body w-100 row">
                  <div className="col-md-8 text-left">
                   <span className="text-secondary">
                     عنوان مقاله: {item.articleName}
                   </span>
                 </div>
                 <div className="col-md-4 text-right">
                   <span className="text-secondary">
                     تاریخ انتشاز: {formatDate(item.createdAt)}
                   </span>
                 </div>
                 <div className="col-md-12 text-left">
                    <p className="py-5">
                    {ReactHtmlParser(item.articleContent)}
                    </p>
                 </div>
                  </div>
                 </div>
               </div>
               <div className="col-md-4 writter-card">
                 {writter.map(itemm => {
                   return(
                    <div class="card">
                   <div class="card-body text-center">
                     <div class="mt-3 mb-4">
                     {photo ? (
                      photo.map((item) => {
                        console.log(item, id);
                        if (
                          item.userId == writter.map((item) => item._id) &&
                          item.for === "profile"
                        ) {
                          const base64String = btoa(
                            String.fromCharCode(
                              ...new Uint8Array(item.img.data.data)
                            )
                          );
                          return (
                            <div className="text-center mx-4">
                             
                              <img
                              src={`data:image/png;base64,${base64String}`}
                              alt={writter.map(item => item.fullname)}
                              className="profile-img-in-blog"
                            />
                            </div>
                          );
                        } else {
                        }
                      })
                    ) : (
                      <img
                        src={require("../image/loves.png")}
                        alt="Generic placeholder image"
                        class="profile-visit-img"
                      />
                    )}
                     </div>
                     <h4 class="mb-2">{itemm.fullname}</h4>
                     <p class="text-muted mb-4">
                       {itemm.expertise ? (itemm.expertise) : ("تخصص وارد نشده است")} <span class="mx-2">|</span>{" "}
                       {itemm.teacher == "true" ? (itemm.fromUniversity == "true" ? (
                                 <span className="badge badge-info">
                                   استاد دانشگاه
                                 </span>
                               ) : (
                                 <span className="badge badge-primary">
                                   استاد علم آموزان
                                 </span>
                               )) : (<span className="badge badge-secondary">
                               مقاله نویس
                             </span>)}
                     </p>
                     <div class="mb-4 pb-2">
                       <Link to={`/teacher/${itemm.fullname}`}>
                       <button
                         type="button"
                         class="btn btn-outline-primary btn-floating"
                       >
                         <i class="fa fa-user"> </i> پروفایل
                       </button>
                       </Link>
                     </div>
                     <div class="d-flex justify-content-between text-center mt-5 mb-2">
                       {userCourse && itemm.teacher == "true" ? (
                        <>
                        <div>
                        <p class="mb-2 h5">{userArticles.length}</p>
                        <p class="text-muted mb-0">مقاله نوشته شده</p>
                      </div>
                      <div class="px-3">
                        <p class="mb-2 h5">{userCourse.length}</p>
                        <p class="text-muted mb-0">دوره برگزار شده</p>
                      </div>
                        </>
                       ) : ("درحال جستجوی دوره و مقاله های استاد")}
                     </div>
                   </div>
                 </div>
                   )
                 })}
               </div>
             </div>
           ))) : (<div className="cliploader">
           <ClipLoader
           color="#333"
           loading={loading}
           size={150}
           aria-label="Loading Spinner"
           data-testid="loader"
         /></div>)}
         </div>
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
  );
};

export default Article;
