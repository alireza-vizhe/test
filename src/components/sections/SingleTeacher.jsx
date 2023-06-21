import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  allCoursesRoute,
  articlesRoute,
  teacherRankRoute,
  usersRoute,
  visitCourseRoute,
} from "../utils/routes";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { UnameIdContext } from "../context/UnameId";
import { ClipLoader } from "react-spinners";
import Pagination from "../helpers/Pagination";
import { paginate } from "../utils/paginate";
import { Helmet } from "react-helmet";

const SingleTeacher = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState([]);
  const [userD, setUserD] = useContext(UnameIdContext);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [teacherArticles, setTeacherArticles] = useState([])
  console.log(id);

  //* lodaer Spinner
  const [loading, setLoading] = useState(true);

  // useEffect(() => {

  //   getAllCourses();
  // }, [])

  const getAllCourses = async () => {
    setLoading(true)
    setShowCourses(!showCourses);
    await axios.get(allCoursesRoute).then((result) => {
      setCourses(result.data);
      console.log(result);
      const filterCourses = result.data.filter(
        (item) => item.userId == teacher.map((item) => item._id)
      );
      setTeacherCourses(filterCourses);
      setLoading(false);
    });
  };

  const [teacherId, setTeacherId] = useState();

  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const getTeacher = async () => {
      await axios.get(usersRoute).then((result) => {
        console.log(result);
        const filterTeacher = result.data.filter(
          (item) => item.fullname === id
        );
        setTeacher(filterTeacher);
        setLoading(false);
      });
    };
    getTeacher();
  }, []);

  console.log(teacher, teacherCourses);

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

  const [courses, setCourses] = useState([]);

  const plusVisitCourse = async (id) => {
    await axios.post(visitCourseRoute + id).then((result) => {
      console.log(result);
    });
  };

  console.log(teacher);

  const rankUp = async () => {
    await axios.post(teacherRankRoute, { id: teacher.map((item) => item._id) });
  };

  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexCourses = paginate(teacherCourses, currentPage, perPage);

  const getArticle = async () => {await axios.get(articlesRoute).then(result => {
    // console.log(writter.map(item => item._id), result.data.map(item => item.writterId));
    setTeacherArticles(result.data.filter(item => item.writterId == teacher.map(item => item._id)))
  })}
  getArticle();


  return (
    // <section>
    //     <div className="container">
    //         <div className="row">
    //             {teacher.map(item => (
    //                 <p>{item.fullname}</p>
    //             ))}
    //         </div>
    //     </div>
    // </section>
  <>
  {!loading ? (
    <section>
    <div class="container py-5">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-md-5">
          <div class="card single-teachers-card">
            {teacher.map(item => item._id === userD._id ? (null) : (<button className="my-3 mx-2 btn-nav" onClick={rankUp}>
              امتیاز دادن به استاد
            </button>))}
            <div class="card-body p-4">
              <div class="text-black">
                
                  {photo ? (
                    photo.map((item) => {
                      console.log(item, id);
                      if (
                        item.userId == teacher.map((item) => item._id) &&
                        item.for === "profile"
                      ) {
                        const base64String = btoa(
                          String.fromCharCode(
                            ...new Uint8Array(item.img.data.data)
                          )
                        );
                        return (
                          <div className="text-left mx-4">
                           
                            <img
                            src={`data:image/png;base64,${base64String}`}
                            alt={teacher.map(item => item.fullname)}
                            className="profile-visit-img"
                          />
                          </div>
                        );
                      } else {
                      }
                    })
                  ) : (
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      class="profile-visit-img"
                    />
                  )}
               
                {teacher.map((item) => (
                  <div className="row">
                     <Helmet>
          <title>{` استاد ${item.fullname} | علم آموزان `}</title>
        </Helmet>
                    <div class="col-8 text-left">
                      <h5 class="mb-1 english-font">{item.fullname}</h5>
                      <p class="mb-2 pb-1 english-font badge badge-success">
                        {item.expertise}
                      </p>

                    </div>
                    <div class="flex-shrink-0 about">
                      <small className="badge badge-primary">
                        {showCourses ? (`${teacherCourses.length} دوره برگزار شد`) : (<small onClick={getAllCourses} className="c-p">نمایش تعداد دوره ها</small>)}
                      </small>
                      <br />
                      <small className="badge badge-primary">
                        {item.rank} امتیاز استاد
                      </small>
                      <br />
                      <small className="badge badge-primary">
                        {teacherArticles.length} مقاله نوشته شده
                      </small>
                    </div>
                      <div class="col-12 justify-content-start rounded-3 p-2 mb-2 w-100">
                        <div className="text-center about text-secondary w-100">
                          <h5 className="text-dark text-left mt-4">توضیحات تجربه استاد:</h5>
                          {item.about ? (
                            ReactHtmlParser(item.about)
                          ) : (
                            <p>
                              درحال حاظر این استاد در مورد خود شرحی نداده است.
                            </p>
                          )}
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 row">
          {showCourses ? (
            indexCourses.map((item) => {
              if (item.status === "public") {
                const base64String = btoa(
                  String.fromCharCode(...new Uint8Array(item.img.data.data))
                );
                return (
                  <div className="col-md-6 my-2">
                    <div className="card courses-card">
                      <div className="card-body p-0">
                        <img
                          src={`data:image/png;base64,${base64String}`}
                          alt=""
                          className="courseImage-in-home-page"
                        />

                        {/* <img
                          src={}
                          className="img-fluid"
                          alt=""
                        /> */}
                        <Link
                          to={`/course/${item._id}`}
                          className="text-dark"
                          onClick={() => plusVisitCourse(item._id)}
                        >
                          <h5 className="text-center my-2">{item.name}</h5>
                        </Link>
                        <div className="mt-4 mb-2 px-3">
                          <i className="fa fa-user"></i> {item.userD}
                        </div>
                        <hr />
                        <div className="container">
                          <div className="row bottom-in-card pb-3">
                            <div className="col-md-6 text-left">
                              <i className="fa fa-users"></i>
                              {item.students}
                            </div>
                            <div className="col-md-6" id="productPR">
                            {item.suqqestion > 0 ? (<div>
                              <small className="text-danger"><del>{item.price} تومان</del></small>
                              <br />
                              <p className="text-success">{item.suqqestion} تومان</p>
                            </div>) : (item.price == 0 ? (
                              <>رایگان</>
                            ) : (
                              <>{item.price} تومان</>
                            ))}
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
              }
            })
          ) : (
            <div className="cliploader">
              <button className="btn-nav" onClick={getAllCourses}>
                برای مشاهده دوره های استاد کلیک کنید{" "}
                <i className="fa fa-file"></i>
              </button>
            </div>
          )}
        </div>
        <Pagination
        totalPosts={teacherCourses.length}
        currentPage={currentPage}
        perPage={perPage}
        onPageChange={handlePageChange}
      />
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

export default SingleTeacher;

{
  /* <div className="container">
                        {item.selling == "true" ? (<div className="row" onClick={() => setShowVideo(!showVideo)}>
                          <div className="col-1">
                            <i className="fa fa-video-camera"></i>
                          </div>
                          <div className="col-9">
                            {item.videoName}
                          </div>
                          <div className="col-2">
                            <i className="fa fa-lock"></i> خصوصی
                          </div>


                          {showVideo ? (<div className="col-md-12 my-4 courseVideos">
                            {findUserSended.length > 0 ? (<video src={item.url} controls></video>) : (<p className="text-center bg-warning p-2">این ویدیو نقدی می باشد برای دیدن ویدیو های آموزش ابتدا در دوره شرکت کنید</p>)}
                          </div>) : (null)}
                        </div>) : (item.courseVideos.map(iteme => (
                          <div className="row mb-5 border p-3" onClick={() => setShowVideo(!showVideo)}>
                          <div className="col-2 text-secondary">
                            <i className="fa fa-video-camera mx-2"></i>
                            {iteme.number}
                          </div>
                          <div className="col-6">
                            {iteme.videoName}
                          </div>
                          <div className="col-2 text-secondary">
                            {iteme.videoTime}
                          </div>
                          <div className="col-2 text-secondary">
                            <i className="fa fa-lock"></i> {iteme.selling == "true" ? ("نقدی") : ("رایگان")}
                          </div>
                          {showVideo ? (<div className="col-md-12 my-4 courseVideos">
                            <video src={iteme.url} controls></video>
                          </div>) : (null)}
                        </div>
                        )))}


                      </div> */
}
