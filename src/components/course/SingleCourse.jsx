import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import {
  addToCardRoute,
  allCoursesRoute,
  answerCommentRoute,
  commentRoute,
  dashboardRoute,
  deleteCommentRoute,
  editPostRoute,
  getCommentsRoute,
  getSingelCourseRoute,
  likePostRoute,
  pricesRoute,
  studentsCourseRoute,
  teacherRankRoute,
  usersRoute,
  visitCourseRoute,
} from "../utils/routes";
import { Link, useParams } from "react-router-dom";
import "../styles/style.css";
import { UnameIdContext } from "../context/UnameId";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-hot-toast";
import { CKEditor } from "ckeditor4-react";
import ReCAPTCHA from "react-google-recaptcha";
import { ClipLoader } from "react-spinners";
import { date } from "yup";
import formatDate from "../utils/formatDate";
import "../styles/style.css";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import shorten from "../utils/shorten";
import { Helmet } from "react-helmet";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const SingleCourse = () => {
  //* Set Course Detail
  const [course, setCourse] = useState();

  const [comments, setComments] = useState();
  const [answerComments, setAnswerComments] = useState();

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const getCourseData = async () => {
      await axios.get(getSingelCourseRoute + id).then((result) => {
        setCourse([result.data]);
        console.log(result);
      });
    };
    getCourseData();
  }, []);
  console.log(course);

  //TODO user Detail
  const [uForFill, setUForFill] = useState([]);
  const [findUserSended, setFinUserSended] = useState();

  useEffect(() => {
    const filterUForFill = uForFill.filter((item) => item._id === id);
    setFinUserSended(filterUForFill);
    // setFinUserSended(course);
  }, [uForFill]);

  const [filterUser, setFilterUser] = useState([]);

  const [userD, setUserD] = useContext(UnameIdContext);
  console.log(findUserSended, userD);

  //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);

  console.log(userD);
  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      const userGeter = localStorage.getItem("user");
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      const findedUser = userAll.find((item) => item._id === userGeter);
      setUserD(findedUser);
      console.log(findedUser);
      const postFilter = userAll.filter((item) => item._id === id);
      // setFilterUser(postFilter)
      if (userD) {
        setUForFill(findedUser.coursesInCard);
      } else {
      }
    };
    localStorageGeter();
  }, []);

  console.log(findUserSended);

  const buyCourse = async () => {
    // await axios.post(studentsCourseRoute + id, {}, config).then(result => {
    //   console.log(result);
    // })
    toast((t) => (
      <>
        <i className="fa fa-close my-4" onClick={() => toast.dismiss(t.id)}></i>
        <span className="toastt">
          دوره{" "}
          <span className="badge badge-success">
            {course.map((item) => item.name)}
          </span>{" "}
          با موفقیت به سبد خرید شما اضافه شد
        </span>
        <Link to="/buy-card">مشاهده سبد خرید</Link>
      </>
    ));

    await axios
      .post(addToCardRoute + id, {
        postId: course.map((item) => item._id),
        userId: userD._id,
      })
      .then((result) => {
        console.log(result);
      });
  };

  // console.log(course._id, userD._id);

  let productPR = document.querySelectorAll("#productPR");

  productPR.forEach((prices) => {
    prices.innerHTML = prices.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  //* Set Captcha
  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  //* lodaer Spinner
  const [loading, setLoading] = useState(true);

  const [postCommentsName, setPostCommentsName] = useState();
  const [postComments, setPostComments] = useState([]);

  const currentDate = new Date();

  console.log(Date.now());

  const handleComments = async (id) => {
    try {
      await axios
        .post(commentRoute, {
          id,
          comments,
          commenterName: userD.fullname,
          commentedAt: Date.now(),
          recaptchaValue,
        })
        .then((result) => {
          console.log(result);
          // setPostCommentsName(result.data.commenterName)
          if (result.data.message) {
            setServerError(result.data.message);
          } else {
            setPostComments(result.data.comments, result.data.commenterName);
            toast.success("دیدگاه شما با موفقیت ثبت شد!");
            setComments("");
          }
        });
    } catch (error) {}
  };

  const answerComment = async (id) => {
    try {
      await axios
        .post(answerCommentRoute, {
          id,
          answerComments,
          answererName: userD.fullname,
        })
        .then((result) => {
          console.log(result);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [answerCommentr, setAnswerCommentr] = useState();

  useEffect(() => {
    try {
      const getComments = async () => {
        await axios.post(getCommentsRoute, { id }).then((result) => {
          console.log(result);
          setPostCommentsName(result.data.commenterName);
          setPostComments(result.data.comments);
          setAnswerCommentr(result.data.answerComments);
        });
      };
      getComments();
    } catch (error) {
      console.log("asasas");
    }
  }, []);

  console.log(answerCommentr);
  console.log(postComments);

  const [showAnswer, setShowAnswer] = useState(false);

  const like = async () => {
    await axios.post(likePostRoute, { id }).then((result) => {
      console.log(result.data.likes);
    });
  };

  const [photo, setPhoto] = useState([]);

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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await axios.get(usersRoute).then((result) => {
        console.log(result);
        const findTeacher = result.data.filter(
          (item) => item.teacher === "true"
        );
        setUsers(findTeacher);
      });
    };
    getUsers();
  }, []);

  console.log(users);

  const [showVideo, setShowVideo] = useState(false);

  const rankUp = async () => {
    await axios.post(teacherRankRoute, {
      id: course.map((item) => item.userId),
    });
  };

  const deleteComment = async ({ commentId, postId }) => {
    console.log(commentId, postId);
    try {
      await axios.post(deleteCommentRoute, { commentId, postId });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(course);

  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      await axios.get(allCoursesRoute).then((result) => {
        setAllCourses(result.data);
      });
    };
    getAllCourses();
  }, []);

  const plusVisitCourse = async (id) => {
    await axios.post(visitCourseRoute + id).then((result) => {
      console.log(result);
    });
  };

  //* Refresh Page
  const refresh = () => {
    window.location.reload(true);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          {/* <video src={require("../../../backend/videos/01_NodeJs_2020.mp4")}></video> */}
          {course ? (
            course.map((item) => (
              <>
              <Helmet>
            <title>{`${item.name} | علم آموزان `}</title>
          </Helmet>
                <div className="col-md-8 first-video-single my-3">
                  <a href={`https://elmamouzan.ir/course/${item._id}`}>
                    <h5 className="post-name-single">{item.name}</h5>
                  </a>
                  <video src={item.overViewVideo} controls />
                  <div className="col-12 first-card-singlr-bt-video">
                    <div className="text-center my-4">
                      <button className="btn btn-secondary">
                        پشتیبانی آنلاین
                      </button>
                    </div>
                    <h4 className="course-single-title">
                      در این دوره چه چیزی یاد میگیرم؟
                    </h4>
                    <p className="single-course-des">
                      {ReactHtmlParser(item.description)}
                    </p>
                    <div className="text-left font-weight-bold border-bottom py-3">
                      ویدیو های دوره
                    </div>
                    <div className="col-12 single-course-videos border-bottom">
                      <div className="container">
                        {item.courseVideos ? (
                          item.courseVideos.map((iteme) =>
                            iteme.selling == "true" ? (
                              <div
                                className="row border mb-3 py-3"
                                onClick={() => setShowVideo(!showVideo)}
                              >
                                <div className="col-2 text-secondary">
                                  <i className="fa fa-video-camera mx-2"></i>
                                  {iteme.number}
                                </div>
                                <div className="col-4">{iteme.videoName}</div>
                                <div className="col-3 text-secondary">
                                  {iteme.videoTime}
                                </div>
                                <div className="col-3 text-secondary">
                                  {iteme.selling == "true" ? (
                                    userD ? (
                                      item.sells.includes(userD._id) ? (
                                        <>
                                          <i className="fa fa-unlock mx-2 text-success"></i>
                                        </>
                                      ) : (
                                        <>
                                          <i className="fa fa-lock mx-2 text-danger"></i>
                                          نقدی
                                        </>
                                      )
                                    ) : (
                                      <>
                                        <i className="fa fa-lock mx-2 text-danger"></i>
                                        نقدی
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <i
                                        class="fa fa-unlock mx-2 text-success"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      رایگان
                                    </>
                                  )}
                                  {/* <i className="fa fa-lock"></i> {iteme.selling == "true" ? ("نقدی") : ("رایگان")} */}
                                </div>

                                {userD ? (
                                  showVideo ? (
                                    <div className="col-md-12 my-4 courseVideos">
                                      {item.sells.includes(userD._id) ? (
                                        <video src={iteme.url} controls></video>
                                      ) : (
                                        <p className="text-center bg-warning p-2">
                                          این ویدیو نقدی می باشد برای دیدن ویدیو
                                          های آموزش ابتدا در دوره شرکت کنید
                                        </p>
                                      )}
                                    </div>
                                  ) : null
                                ) : null}
                              </div>
                            ) : (
                              <div className="row border mb-3 py-3">
                                <div className="col-2 text-secondary">
                                  <i className="fa fa-video-camera mx-2"></i>
                                  {iteme.number}
                                </div>
                                <div
                                  className="col-4"
                                  onClick={() => setShowVideo(!showVideo)}
                                >
                                  {iteme.videoName}
                                </div>
                                <div className="col-3 text-secondary">
                                  {iteme.videoTime}
                                </div>
                                <div className="col-3 text-secondary">
                                  {iteme.selling == "true" ? (
                                    item.sells.includes(userD._id) ? (
                                      <>
                                        <i className="fa fa-unlck mx-2 text-success"></i>
                                      </>
                                    ) : (
                                      <>
                                        <i className="fa fa-lock mx-2 text-danger"></i>
                                        نقدی
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <i
                                        class="fa fa-unlock mx-1 text-success"
                                        aria-hidden="true"
                                      ></i>{" "}
                                      رایگان
                                    </>
                                  )}
                                </div>
                                {showVideo ? (
                                  userD ? (
                                    <div className="col-md-12 my-4 courseVideos">
                                      <video src={iteme.url} controls></video>
                                    </div>
                                  ) : (
                                    <div className="text-center justify-content-center w-100 mt-4">
                                      <p className="alert alert-warning">
                                        برای دیدن محتوای این بخش ابتدا وارد{" "}
                                        <Link to="/login-users">
                                          حساب کاربری
                                        </Link>{" "}
                                        خود شوید
                                      </p>
                                    </div>
                                  )
                                ) : null}
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-center bg-primary text-white p-4">
                            درحال آپلود کردن ویدیو های این دوره هستیم. از
                            شکیبایی شما متشکریم
                          </p>
                        )}
                      </div>
                    </div>
                    {userD ? (
                      item.sells.includes(userD._id) ? (
                        userD ? (
                          item.examLink ? (
                            <div className="pretty-btn-parent-single mt-4">
                              <Link to={item.examLink} target="_blank">
                                <button class="button-86" role="button">
                                  آزمون بده, سطح خودت رو در این حوزه بدون و مدرک
                                  معتبر بگیر
                                </button>
                              </Link>
                            </div>
                          ) : (
                            <div className="pretty-btn-parent-single mt-4">
                              <button class="button-86" role="button">
                                درحال آماده سازی آزمون برای این دوره هستیم!
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="pretty-btn-parent-single mt-4">
                            <button class="button-86" role="button">
                              برای شرکت در آزمون این دوره ابتدا وارد{" "}
                              <Link to="/login-users">حساب کاربری</Link> خود
                              شوید
                            </button>
                          </div>
                        )
                      ) : (
                        <div className="pretty-btn-parent-single mt-4">
                          <button
                            class="button-86"
                            role="button"
                            // onClick={buyCourse}
                          >
                            برای شرکت در آزمون ابتدا در دوره شرکت کرده و به
                            اتمام برسانید
                          </button>
                        </div>
                      )
                    ) : null}
                  </div>{" "}
                  ّ
                </div>
                <div className="col-md-4">
                  <div className="col-md-12 first-card-single my-3">
                    <div class="sell_course">
                      <strong>قیمت</strong>
                      <p class="price" id="productPR">
                        <span class="woocommerce-Price-amount amount">
                        {item.suqqestion > 0 ? (<div>
                                <small className="text-danger"><del>{item.price} تومان</del></small>
                                <br />
                                <p className="text-success">{item.suqqestion} تومان</p>
                              </div>) : (item.price == 0 ? (
                                <>رایگان</>
                              ) : (
                                <>{item.price} تومان</>
                              ))}
                        </span>
                      </p>
                    </div>
                    {userD ? (
                      item.userId === userD._id ? (
                        <div className="text-center w-100 btn-single-course-disable">
                          <p>
                            این دوره متعلق به شما می باشد آقا / خانم :{" "}
                            {userD.fullname}
                          </p>
                        </div>
                      ) : item.sells.includes(userD._id) ? (
                        <div className="col-md-12 border-bottom-primary py-4 text-center">
                          <p className="alert alert-success">
                            قبلا در این دوره شرکت کرده اید
                            <i className="fa fa-check"></i>{" "}
                          </p>
                        </div>
                      ) : userD.coursesInCard.length > 0 ? (
                        <div className="col-md-12 border-bottom-primary py-4 text-center">
                          <p className="alert alert-warning">
                            در سبد خرید خود یک دوره دارید, ابتدا در همان دوره
                            شرکت و یا سبد خرید خود را خالی کنید
                            <i className="fa fa-warning"></i>{" "}
                          </p>
                        </div>
                      ) : (
                        <div className="col-md-12">
                          <button className="btn-nav w-100" onClick={buyCourse}>
                            ثبت نام در دوره
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="col-md-12 send-resume-parent py-4 text-center">
                        <small>
                          برای خرید دوره وارد
                          <Link to="/login-users" className="text-primary">
                            حساب کاربری
                          </Link>{" "}
                          خود شوید
                        </small>
                        <div className="lock-icon my-5">
                          <i className="fa fa-lock"></i>
                        </div>
                        <button className="btn-single-course-disable" disabled>
                          خرید دوره
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="second-card-single mb-3">
                    <div className="col-md-12 row mt-3">
                      <div className="col-md-6 text-left">امتیاز دوره :</div>
                      <div className="col-md-6">
                        {item.likes}{" "}
                        <img
                          src="https://parspng.com/wp-content/uploads/2023/01/5starspng.parspng.com-4.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-12 row mt-4">
                      {userD ? (
                        item.userId === userD._id ? null : (
                          <button className="btn btn-success" onClick={like}>
                            امتیاز دادن <i className="fa fa-check-circle-o"></i>
                          </button>
                        )
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 second-card-single">
                    <div class="student">
                      <img
                        src={require("../image/graduate.png")}
                        className="img-graduate-singel"
                        alt=""
                      />{" "}
                      تعداد دانشجو :
                      <span className="badge badge-secondary mx-2">
                        {item.totalStudents}
                      </span>{" "}
                      نفر
                    </div>
                    <div className="col-12 text-left mt-4 thirth-card-single">
                      <i className="fa fa-level-up"></i> سطح دوره :{" "}
                      {item.postLevel}
                    </div>
                    <div className="col-12 text-left mt-4 thirth-card-single">
                      <i className="fa fa-language"></i> زبان : {item.language}
                    </div>
                    <div className="col-12 text-left mt-4 thirth-card-single">
                      <i className="fa fa-calculator"></i> تعداد ویدیو های دوره
                      :{" "}
                      {item.courseVideos
                        ? item.courseVideos.length
                        : "درحال آپلود ویدیو"}
                    </div>
                    <div className="col-12 text-left mt-4 thirth-card-single">
                      <i className="fa fa-expand"></i> :{" "}
                      {item.ended == "true" ? (
                        <span className="text-success">
                          دوره به اتمام رسیده است
                        </span>
                      ) : (
                        <span className="text-info">
                          دوره درحال برگزاری می باشد
                        </span>
                      )}
                    </div>
                    <div className="col-12 text-left mt-4 thirth-card-single">
                      <i className="fa fa-clock-o"></i> زمان دوره : {item.time}
                    </div>
                    <div className="col-12 text-left mt-4 thirth-card-single">
                      <i className="fa fa-ticket"></i> روش پشتیانی : ارسال تیکت,
                      چت آنلاین
                    </div>
                    <div className="col-12 text-left mt-4 thirth-card-single">
                      <i className="fa fa-bar-chart"></i> درصد پیشرفت دوره :{" "}
                      {item.progress}%
                      <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar progress-bar-striped progress-bar-animated"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <Link to={`/coursequestions/${item._id}`}>
                        <button className="btn btn-info">
                          پرسش سوال در رابطه با این دوره{" "}
                          <i className="fa fa-question-circle"></i>{" "}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-12 w-100 my-3 forth-card-single">
                    <div className="col-md-6">
                      <i className="fa fa-eye"></i> {item.visits}
                    </div>
                    <div className="col-md-6">
                      <i className="fa fa-comments"></i>
                      {item.comments.length}
                    </div>
                  </div>

                  <small>
                    {users ? (
                      users.map((itemmm) => {
                        console.log(itemmm._id, item.userId);
                        if (itemmm._id === item.userId) {
                          return (
                            <div className="col-md-12 w-100 my-3 fifth-card-single">
                              <div className="col-md-6">
                                {photo.map((itemm) => {
                                  console.log(itemm, item);
                                  if (
                                    itemm.userId === item.userId &&
                                    itemm.for === "profile"
                                  ) {
                                    const base64String = btoa(
                                      String.fromCharCode(
                                        ...new Uint8Array(itemm.img.data.data)
                                      )
                                    );
                                    return (
                                      <Link
                                        to={`/teacher/${itemmm.fullname}`}
                                        className="text-dark"
                                      >
                                        <img
                                          src={`data:image/png;base64,${base64String}`}
                                          // alt={userD.fullname}
                                          className="teacher-image-single-course"
                                        />
                                      </Link>
                                    );
                                  } else {
                                  }
                                })}
                              </div>
                              <div className="col-md-6 text-left teacher-detail-in-single-course w-100">
                                <Link
                                  to={`/teacher/${itemmm.fullname}`}
                                  className="text-dark"
                                >
                                  <h6>{itemmm.fullname}</h6>
                                </Link>
                                <p>{itemmm.expertise}</p>
                                <small className="badge badge-primary fs-for-samll-single">
                                  مجموع امتیازهای استاد : {itemmm.rank}
                                </small>
                                <i
                                  className="fa fa-plus mt-3 btn btn-success"
                                  onClick={rankUp}
                                ></i>
                              </div>
                            </div>
                          );
                        } else {
                        }
                      })
                    ) : (
                      <p>تخصص استاد وارد نشده است</p>
                    )}
                  </small>
                </div>

                <h6 className="mt-5 text-left fontandsize desktop-teacher-courses-in-single">
                  دیگر دوره های استاد
                </h6>
                <div className="col-12 desktop-teacher-courses-in-single">
                  <Swiper
                    className="swipper-sec-one-parent-desktop"
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                  >
                    {allCourses.map((itemmm) => {
                      // console.log(users);
                      console.log(item, itemmm);
                      if (itemmm.userId === item.userId) {
                        return (
                          <SwiperSlide>
                            <div className="card">
                              <div className="card-body p-0 text-center">
                                {photo.map((itemmmm) => {
                                  console.log(itemmmm, item);
                                  if (
                                    itemmmm.userId === item.userId &&
                                    item.status === "public"
                                  ) {
                                    const base64String = btoa(
                                      String.fromCharCode(
                                        ...new Uint8Array(itemmm.img.data.data)
                                      )
                                    );
                                    return (
                                      <div className="col-lg-12 col-md-12 col-sm-12 my-2">
                                        <div className="card courses-card">
                                          <div className="card-body p-0">
                                            <a
                                              href={`/course/${itemmm._id}`}
                                              className="text-dark"
                                              onClick={() =>
                                                plusVisitCourse(itemmm._id)
                                              }
                                            >
                                              <img
                                                src={`data:image/png;base64,${base64String}`}
                                                alt=""
                                                className="courseImage-in-home-page"
                                              />
                                            </a>

                                            {/* <img
                                    src={}
                                    className="img-fluid"
                                    alt=""
                                  /> */}
                                            <a
                                              href={`/course/${itemmm._id}`}
                                              className="text-dark"
                                              onClick={() =>
                                                plusVisitCourse(itemmm._id)
                                              }
                                            >
                                              <h5 className="text-center my-2 font-weight-bold">
                                                {itemmm.name}
                                              </h5>
                                            </a>
                                            <small className="text-secondary text-center">
                                              {ReactHtmlParser(
                                                shorten(itemmm.description)
                                              )}
                                            </small>
                                            <div className="mb-2 px-3">
                                              <i className="fa fa-user"></i>{" "}
                                              {itemmm.userD}
                                            </div>
                                            <hr />
                                            <div className="container">
                                              <div className="row bottom-in-card pb-3">
                                                <div className="col-md-6 text-left">
                                                  <i className="fa fa-users"></i>
                                                  {itemmm.totalStudents}
                                                </div>
                                                <div
                                                  className="col-md-6"
                                                  id="productPR"
                                                >
                                                  {itemmm.price == 0 ? (
                                                    <>رایگان</>
                                                  ) : (
                                                    <>{itemmm.price} تومان</>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  } else {
                                  }
                                })}
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    })}
                  </Swiper>
                </div>
                <h6 className="mt-5 text-left fontandsize responsive-teacher-courses-in-single">
                  دیگر دوره های استاد
                </h6>
                <div className="col-12 responsive-teacher-courses-in-single">
                  <Swiper
                    className="swipper-sec-one-parent-desktop"
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                  >
                    {allCourses.map((itemmm) => {
                      // console.log(users);
                      console.log(item._id, itemmm._id);
                      if (itemmm.userId === item.userId) {
                        return (
                          <SwiperSlide>
                            <div className="card">
                              <div className="card-body p-0 text-center">
                                {photo.map((itemmmm) => {
                                  console.log(itemmmm, item);
                                  if (
                                    itemmmm.userId === item.userId &&
                                    item.status === "public"
                                  ) {
                                    const base64String = btoa(
                                      String.fromCharCode(
                                        ...new Uint8Array(itemmm.img.data.data)
                                      )
                                    );
                                    return (
                                      <div className="col-lg-12 col-md-12 col-sm-12 my-2">
                                        <div className="card courses-card">
                                          <div className="card-body p-0">
                                            <a
                                              href={`/course/${itemmm._id}`}
                                              className="text-dark"
                                              onClick={() =>
                                                plusVisitCourse(itemmm._id)
                                              }
                                            >
                                              <img
                                                src={`data:image/png;base64,${base64String}`}
                                                alt=""
                                                className="courseImage-in-home-page"
                                              />
                                            </a>

                                            {/* <img
                                    src={}
                                    className="img-fluid"
                                    alt=""
                                  /> */}
                                            <a
                                              href={`/course/${itemmm._id}`}
                                              className="text-dark"
                                              onClick={() =>
                                                plusVisitCourse(itemmm._id)
                                              }
                                            >
                                              <h5 className="text-center my-2 font-weight-bold">
                                                {itemmm.name}
                                              </h5>
                                            </a>
                                            <small className="text-secondary text-center">
                                              {ReactHtmlParser(
                                                shorten(itemmm.description)
                                              )}
                                            </small>
                                            <div className="mb-2 px-3">
                                              <i className="fa fa-user"></i>{" "}
                                              {itemmm.userD}
                                            </div>
                                            <hr />
                                            <div className="container">
                                              <div className="row bottom-in-card pb-3">
                                                <div className="col-md-6 text-left">
                                                  <i className="fa fa-users"></i>
                                                  {itemmm.totalStudents}
                                                </div>
                                                <div
                                                  className="col-md-6"
                                                  id="productPR"
                                                >
                                                  {itemmm.price == 0 ? (
                                                    <>رایگان</>
                                                  ) : (
                                                    <>{itemmm.price} تومان</>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  } else {
                                  }
                                })}
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    })}
                  </Swiper>
                </div>

                <div className="col-md-8 text-left single-comments mt-5">
                  <h5>
                    <i className="fa fa-comments"></i> نظرات کاربران در رابطه با
                    این دوره{" "}
                  </h5>
                  {SUC ? (
                    SUC.length ? (
                      <p className="alert alert-success text-center">{SUC}</p>
                    ) : null
                  ) : null}
                  {error
                    ? error.map((error, index) => (
                        <p
                          key={index}
                          className="alert alert-danger text-center"
                        >
                          {error.message}
                        </p>
                      ))
                    : null}
                  {serverError ? (
                    serverError.length >= 1 ? (
                      <p className="alert alert-danger text-center">
                        {serverError}
                      </p>
                    ) : (
                      serverError.length < 1 && null
                    )
                  ) : null}
                  {userD ? (
                    <>
                      <div class="form-group has-error">
                        <label htmlFor="">نظر خود را وارد کنید</label>
                        <p className="alert alert-info">
                          توجه داشته باشید در این بخش فقط تجربه و نظر خود را در
                          این دوره به اشتراک بگذارید برای پرسش سوال به بخش پرسش
                          و پاسخ مراجعه کنید
                        </p>
                        <CKEditor
                          onChange={(e) => setComments(e.editor.getData())}
                          name={comments}
                        />
                        {/* <textarea rows="5" class="form-control" name="description" placeholder="درباره پست خود توضیح دهید (لطفا بیشتر از 50 کاراکتر باشد)" onChange={(e) => setDescription(e.target.value)}></textarea> */}
                      </div>
                      <div className="text-center justify-content-center my-3">
                        <ReCAPTCHA
                          sitekey={SITE_KEY}
                          onChange={onChange}
                          ref={captchaRef}
                        />
                      </div>
                      <button
                        className="btn-nav mb-4"
                        onClick={() => handleComments(item._id)}
                      >
                        ثبت دیدگاه شما
                      </button>
                    </>
                  ) : (
                    <Link to="/login-users">
                      <button className="btn-nav w-100 my-4">
                        برای ارسال نظر ابتدا وارد سایت شوید
                      </button>
                    </Link>
                  )}
                  {postComments.map((itemre) => (
                    <>
                      <div className="card my-2">
                        <div className="card-body py-1 row">
                          <div className="col-md-2">
                            <img
                              src={require("../image/logo.png")}
                              className="comments-img"
                              alt=""
                            />
                          </div>
                          <div className="col-md-8">
                            <p className="text-left commenter-name">
                              {itemre.name}
                            </p>
                          </div>
                          <div className="col-md-2">
                            <p className="text-right text-secondary commenter-name">
                              {formatDate(itemre.commentedAt)}
                            </p>
                          </div>
                          <div className="col-md-12 text-center mt-2">
                            {ReactHtmlParser(itemre.message)}
                          </div>
                          {userD ? (
                            userD.isAdmin == "true" ? (
                              <div className="col-md-12 text-right my-3">
                                {/* <button
                              className="btn btn-success mx-2"
                              onClick={() => setShowAnswer(!showAnswer)}
                            >
                              پاسخ
                            </button> */}
                                <button
                                  className="btn btn-danger mx-2"
                                  onClick={() =>
                                    deleteComment({
                                      commentId: itemre.id,
                                      postId: item._id,
                                    })
                                  }
                                >
                                  پاک کردن
                                </button>
                              </div>
                            ) : null
                          ) : null}
                        </div>
                      </div>
                      {/* {answerCommentr.length > 0 ? (
                        <div className="card">
                          <div className="card-body">
                            {ReactHtmlParser(
                              answerCommentr.map((item) => item)
                            )}
                          </div>
                        </div>
                      ) : null} */}
                    </>
                  ))}
                </div>
                {showAnswer ? (
                  <div
                    className="text-center answer-ckeditor-parent"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    <div class="form-group has-error">
                      <label htmlFor="" className="text-white">
                        پاسخ خود را وارد کنید
                      </label>
                      <CKEditor
                        onChange={(e) => setAnswerComments(e.editor.getData())}
                      />
                      {/* <textarea rows="5" class="form-control" name="description" placeholder="درباره پست خود توضیح دهید (لطفا بیشتر از 50 کاراکتر باشد)" onChange={(e) => setDescription(e.target.value)}></textarea> */}
                      <div className="text-center justify-content-center my-3">
                        <ReCAPTCHA
                          sitekey={SITE_KEY}
                          onChange={onChange}
                          ref={captchaRef}
                        />
                      </div>
                      <div className="text-center mt-3">
                        <button
                          className="btn-nav mb-4"
                          onClick={() => answerComment(item._id)}
                        >
                          ثبت پاسخ شما
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            ))
          ) : (
            <div className="cliploader">
              <ClipLoader
                color="#333"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleCourse;
