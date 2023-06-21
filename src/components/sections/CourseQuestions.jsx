import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import {
  allCoursesRoute,
  deleteQuestionRoute,
  getQuestionsRoute,
  questionsCourseRoute,
  visitCourseRoute,
} from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { CKEditor } from "ckeditor4-react";
import ReCAPTCHA from "react-google-recaptcha";
import { questionSchema } from "../secure/questionsSchema";
import formatDate from "../utils/formatDate";
import Pagination from "../helpers/Pagination";
import { paginate } from "../utils/paginate";
import { Helmet } from "react-helmet";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const CourseQuestions = () => {
  const [courses, setCourses] = useState([]);
  const [userD, setUserD] = useContext(UnameIdContext);
  const [questionTitle, setQuestionTitle] = useState();
  const [question, setQuestion] = useState();
  const [questions, setQuestions] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getAllCourses = async () => {
      await axios.get(allCoursesRoute).then((result) => {
        setCourses(result.data);
        // console.log(result);
        setLoading(false);
      });
    };
    getAllCourses();
  }, []);

  console.log(courses);

  // const img = () => {
  //   const base64String = btoa(
  //     String.fromCharCode(
  //       ...new Uint8Array(item.img.data.data)
  //     )
  //   );
  //   return (
  //     <img
  //       src={`data:image/png;base64,${base64String}`}
  //       alt=""
  //       width={100}
  //     />
  //   );
  // }

  //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);

  const plusVisitCourse = async (id) => {
    await axios.post(visitCourseRoute + id).then((result) => {
      console.log(result);
    });
  };

  let productPR = document.querySelectorAll("#productPR");

  productPR.forEach((prices) => {
    prices.innerHTML = prices.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  //* lodaer Spinner
  const [loading, setLoading] = useState(true);

  const handleQuestion = async () => {
    console.log(question);
    try {
      await questionSchema.validate(
        {
          fullname: userD.fullname,
          email: userD.email,
          question,
          questionTitle,
        },
        { abortEarly: false }
      );
      await axios
        .post(questionsCourseRoute, {
          courseId: id,
          userId: userD._id,
          fullname: userD.fullname,
          email: userD.email,
          question,
          questionTitle,
          recaptchaValue,
        })
        .then((result) => {
          console.log(result);
          if (result.data.message) {
            setServerError(result.data.message);
          } else {
            setServerError(null);
            setSUC(result.data.messageSUC);
            setError(null);
          }
        });
    } catch (error) {
      setError(error.inner);
    }
  };

  //* Set Captcha
  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  useEffect(() => {
    const getQuestions = async () => {
      await axios.get(getQuestionsRoute).then((result) => {
        setQuestions(result.data.filter((item) => item.courseId == id));
        console.log(result.data.filter((item) => item.courseId == id));
      });
    };
    getQuestions();
  }, []);

  console.log(questions);

  const deleteQuestion = async (id) => {
    try {
      await axios.post(deleteQuestionRoute, { id });
      await axios.get(getQuestionsRoute).then((result) => {
        setQuestions(result.data.filter((item) => item.courseId == id));
        // console.log(result.data.filter(item => item.courseId == id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexCourses = paginate(questions, currentPage, perPage);

  return (
    <section>
      {!loading ? (
        <div className="container my-4">
          <div className="row">
            <div className="shape mt-3"></div>
            <div className="shape-two"></div>
            <div className="col-md-6 sec-two-texts text-left my-4">
              <h4>
                <span className="text-white">بخش</span> پرسش و پاسخ
              </h4>
              <h5>کسب کار شما با یادگیری پیشرفت میکند...</h5>
            </div>
            <div className="col-md-6 my-4">
              <Link to="/all-courses">
                <button className="btn-nav">همه دوره ها</button>
              </Link>
            </div>
            {courses.map((item) => {
              if (item.status === "public" && item._id === id) {
                const base64String = btoa(
                  String.fromCharCode(...new Uint8Array(item.img.data.data))
                );
                return (
                  <div className="col-md-12 d-md-flex">
                    <Helmet>
            <title>{`علم آموزان | پرسش و پاسخ دوره ${item.name}`}</title>
          </Helmet>
                    <div className="col-md-6 p-0 questions-bax-course">
                      <h2 className="mb-4">سوالات دوره {item.name}</h2>
                      {/* اشتباه در نمایش سوالات دوره که نشون نمیدهد */}
                      {questions
                        ? indexCourses.map((itemq) => {
                            console.log(itemq);
                            return (
                              <div className="col-md-12 my-3">
                                <div className="card">
                                  <div className="card-body row">
                                    <div className="col-md-4">
                                      {" "}
                                      <img
                                        src={`data:image/png;base64,${base64String}`}
                                        alt=""
                                        className="courseImage-in-home-page"
                                      />
                                    </div>
                                    <>
                                      <div className="col-md-8">
                                        <Link
                                          to={`/question/${itemq._id}`}
                                          className="text-dark"
                                        >
                                          <h5 className="font-weight-bold questionAskerName">{itemq.questionTitle}</h5>
                                        </Link>
                                        <div className="col-md-6 mt-4 text-secondary">
                                          {formatDate(itemq.createdAt)}
                                        </div>
                                        <div className="col-md-6 text-secondary questionAskerName">
                                          {itemq.fullname}
                                        </div>
                                      </div>
                                    </>
                                  </div>
                                  <div className="col-md-12 text-right mb-3">
                                    {userD ? (
                                      userD.isAdmin == "true" ? (
                                        <button
                                          className="btn btn-danger"
                                          onClick={() =>
                                            deleteQuestion(itemq._id)
                                          }
                                        >
                                          حذف
                                        </button>
                                      ) : null
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                          : null}
                          <Pagination
    totalPosts={questions.length}
    currentPage={currentPage}
    perPage={perPage}
    onPageChange={handlePageChange}
  />
                    </div>
                    <div className="col-md-6 p-0 col-sm-6 my-2">
                      <div className="card courses-card ask-question-bax">
                        {userD ? (
                          <div className="card-body">
                            <p className="text-start badge badge-success">
                              پرسش سوال
                            </p>

                            {/* <img
                      src={`data:image/png;base64,${base64String}`}
                      alt=""
                      className="courseImage-in-home-page"
                    />
                  
                            
                            <Link to={`/course/${item._id}`} className="text-dark" onClick={() => plusVisitCourse(item._id)}><h5 className="text-center my-2">{item.name}</h5></Link>
              
              
                            <div className="mt-4 mb-2 px-3">
                              <i className="fa fa-user"></i> {item.userD}
                            </div>
                            <hr />
                            <div className="container">
                              <div className="row bottom-in-card pb-3">
                                  <div className="col-md-6 text-left">
                                      <i className="fa fa-users"></i>{item.students}
                                  </div>
                                  <div className="col-md-6" id="productPR">
                                     {item.price == 0 ? (<>رایگان</>) : (<>{item.price} تومان</>)}
                                  </div>
                              </div>
                            </div> */}
                            {SUC ? (
                              SUC.length ? (
                                <p className="alert alert-success text-center">
                                  {SUC}
                                </p>
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
                            <input
                              type="text"
                              placeholder="عنوان سوال خود را وارد کنید"
                              onChange={(e) => setQuestionTitle(e.target.value)}
                              className="form-control"
                            />
                            <div class="form-group has-error">
                              <label htmlFor="" className="text-white">
                                سوال خود را وارد کنید
                              </label>
                              <CKEditor
                                onChange={(e) =>
                                  setQuestion(e.editor.getData())
                                }
                                name={question}
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
                                  onClick={handleQuestion}
                                >
                                  ثبت سوال شما
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="card-body ask-q-first-login">
                            <h4>
                              برای پرسش سوال ابتدا وارد{" "}
                              <Link to="/login-users">حساب کاربری</Link> خود
                              شوید <i className="fa fa-user-circle"></i>
                            </h4>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else {
              }
            })}
          </div>
        </div>
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
      
    </section>
  );
};

export default CourseQuestions;
