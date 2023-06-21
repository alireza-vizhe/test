import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import {
  allCoursesRoute,
  answerQuestioner,
  deleteAnswerRoute,
  deleteQuestionRoute,
  getSingelQuestion,
  usersRoute,
  visitCourseRoute,
} from "../utils/routes";
import { Link, useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import ReactHtmlParser from "react-html-parser";
import { UnameIdContext } from "../context/UnameId";
import ReCAPTCHA from "react-google-recaptcha";
import { CKEditor } from "ckeditor4-react";
import shorten from "../utils/shorten";
import { ClipLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const SingleQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState([]);
  const [userD, setUserD] = useContext(UnameIdContext);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState();
  const [courses, setCourses] = useState([]);

    //! Messages
    const [error, setError] = useState([]);
    const [SUC, setSUC] = useState([]);
    const [serverError, setServerError] = useState([]);
  

  useEffect(() => {
    const getAllCourses = async () => {
      await axios.get(allCoursesRoute).then((result) => {
        setCourses(result.data);
        setLoading(false);
      });
    };
    getAllCourses();
  }, []);

  console.log(courses);

  useEffect(() => {
    const getQuestion = async () => {
      await axios.post(getSingelQuestion + id).then((result) => {
        setQuestion([result.data]);
      });
    };
    getQuestion();
  }, []);

  //* Set Captcha
  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  const deleteQuestion = async (id) => {
    try {
      await axios.post(deleteQuestionRoute, { id });
      await axios.post(getSingelQuestion + id).then((result) => {
        setQuestion([result.data]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const answerQuestion = async (id) => {
    console.log(userD);
    try {
      await axios.post(answerQuestioner, {
        id,
        answer,
        fullname: userD.fullname,
        userId: userD._id,
        date: Date.now(),
        answerId: uuidv4(),
        recaptchaValue
      }).then(result => {
        if(result.data.message){
          setServerError(result.data.message)
        }else{
        setServerError(null)
          setSUC(result.data.messageSUC)
      }
      })
    } catch (error) {
      console.log(error);
    }
  };

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

  const deleteAnswer = async (ansId) => {
    try {
      await axios.post(deleteAnswerRoute, { questionId: id, answerId: ansId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      {!loading ? (
        <div className="container">
          <div className="row my-5">
            <div className="col-md-8 questionAskerName">
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
              {question.map((item) => (
                <>
                  <div className="card questionAskerName">
                    <div className="card-body row text-left">
                      <Link className="text-dark"><h2 className="w-100 my-4 font-weight-bold">{item.questionTitle}</h2></Link>
                      <div className="col-md-6">
                        <h6 className="text-secondary">{item.fullname}</h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="text-secondary text-right">
                          {formatDate(item.createdAt)}
                        </h6>
                      </div>
                      <div className="col-md-12 my-4">
                        <h5>{ReactHtmlParser(item.question)}</h5>
                      </div>
                    </div>
                    <div className="col-md-12 text-right mb-3">
                      {userD ? (
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => setShowAnswer(!showAnswer)}
                        >
                          پاسخ
                        </button>
                      ) : (
                        <Link to="/login-users"><button
                        className="btn btn-warning mx-2"
                      >
                        برای پاسخ دادن ابتدا وارد سایت شوید
                      </button></Link>
                      )}
                      {userD ? (
                        userD.isAdmin == "true" ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteQuestion(item._id)}
                          >
                            حذف
                          </button>
                        ) : null
                      ) : null}
                    </div>
                    <hr />
                    <div className="col-md-12 text-left">
                      <h6 className="mb-4">جواب این سوال</h6>
                      {item.answer.map((item) => (
                        <div className="row border my-2 mx-2">
                          <div className="col-md-6 text-secondary">
                            {item.fullname}
                          </div>
                          <div className="col-md-6 text-secondary text-right">
                            {formatDate(item.date)}
                          </div>
                          <h5 className="p-3">
                            {ReactHtmlParser(item.answer)}
                          </h5>
                          {userD ? (
                            userD.isAdmin == "true" ? (
                              <div className="col-md-12 text-right">
                                <button
                                  className="btn btn-danger mb-2"
                                  onClick={() => deleteAnswer(item.answerId)}
                                >
                                  حذف
                                </button>
                              </div>
                            ) : null
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                  {showAnswer ? (
                    <div
                      className="text-center answer-ckeditor-parent"
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      <div class="form-group has-error">
                        <label htmlFor="" className="text-dark">
                          پاسخ خود را وارد کنید
                        </label>
                        <CKEditor
                          onChange={(e) => setAnswer(e.editor.getData())}
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
                            onClick={() => answerQuestion(item._id)}
                          >
                            ثبت پاسخ شما
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
            <div className="col-md-4">
              <section>
                <div className="container">
                  <div className="row">
                    <div className="shape mt-3"></div>
                    <div className="shape-two"></div>
                    <div className="col-md-12 sec-two-texts text-left my-4">
                      <h4>
                        <span className="text-white">محبوب</span> ترین دوره
                      </h4>
                      <h5>
                        <a
                          href="https://elmamouzan.ir/all-courses"
                          className="text-dark font-weight-bold"
                        >
                          کسب کار
                        </a>{" "}
                        شما با یادگیری پیشرفت میکند...
                      </h5>
                    </div>
                    {courses.map((item) => {
                      if (
                        item.status === "public" &&
                        item._id === "646f99fb118da3320c39d6bb"
                      ) {
                        const base64String = btoa(
                          String.fromCharCode(
                            ...new Uint8Array(item.img.data.data)
                          )
                        );
                        return (
                          <div className="col-md-12 col-sm-6 my-2">
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
                                  <h5 className="text-center my-2">
                                    {item.name}
                                  </h5>
                                </Link>
                                <small className="text-secondary text-center">
                                  {ReactHtmlParser(shorten(item.description))}
                                </small>
                                <div className="mb-2 px-3">
                                  <i className="fa fa-user"></i> {item.userD}
                                </div>
                                <hr />
                                <div className="container">
                                  <div className="row bottom-in-card pb-3">
                                    <div className="col-md-6 text-left">
                                      <i className="fa fa-users"></i>
                                      {item.totalStudents}
                                    </div>
                                    <div className="col-md-6" id="productPR">
                                      {item.price == 0 ? (
                                        <>رایگان</>
                                      ) : (
                                        <>{item.price} تومان</>
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
              </section>
            </div>
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

export default SingleQuestion;
