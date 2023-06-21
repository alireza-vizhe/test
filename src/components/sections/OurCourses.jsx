import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { allCoursesRoute, visitCourseRoute } from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { paginate } from "../utils/paginate";
import { ClipLoader } from "react-spinners";
import shorten from "../utils/shorten";

const OurCourses = () => {
  const [courses, setCourses] = useState([]);
  const [userD, setUserD] = useContext(UnameIdContext);

  useEffect(() => {
    const getAllCourses = async () => {
      await axios.get(allCoursesRoute).then((result) => {
        setCourses(result.data);
        // console.log(result);
        setLoading(false)
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

  const plusVisitCourse = async (id) => {
    await axios.post(visitCourseRoute + id).then((result) => {
      console.log(result);
    });
  };

  let productPR = document.querySelectorAll("#productPR");

  productPR.forEach((prices) => {
    prices.innerHTML = prices.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const indexCourses = paginate(courses, currentPage, perPage);

  //* lodaer Spinner
  const [loading, setLoading] = useState(true);

  return (
    <section>
      {!loading ? (
        <div className="container">
          <div className="row">
            <div className="shape mt-3"></div>
            <div className="shape-two"></div>
            <div className="col-md-6 sec-two-texts text-left my-4">
              <h4>
                <span className="text-white">دوره</span> های ما
              </h4>
              <h5><a href="https://elmamouzan.ir/all-courses" className="text-dark font-weight-bold">کسب کار</a> شما با یادگیری پیشرفت میکند...</h5>
            </div>
            <div className="col-md-6 my-4">
              <Link to="/all-courses">
                <button className="btn-nav">همه دوره ها</button>
              </Link>
            </div>
            {indexCourses.map((item) => {
              if (item.status === "public") {
                const base64String = btoa(
                  String.fromCharCode(...new Uint8Array(item.img.data.data))
                );
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6 my-2">
                    <div className="card courses-card">
                      <div className="card-body p-0">
                        <Link to={`/course/${item._id}`}
                          className="text-dark"
                          onClick={() => plusVisitCourse(item._id)}>
                        <img
                          src={`data:image/png;base64,${base64String}`}
                          alt=""
                          className="courseImage-in-home-page"
                        />
                        </Link>

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
                          <h5 className="text-center my-2 font-weight-bold">{item.name}</h5>
                        </Link>
                            <small className="text-secondary text-center">
                          {ReactHtmlParser(shorten(item.description))}
                            </small>
                        <div className="mb-2 px-3">
                          <i className="fa fa-user"></i> {item.userD}
                        </div>
                        <hr />
                        <div className="container">
                          <div className="row bottom-in-card prices-parent-in-courses">
                            <div className="col-md-4 text-left">
                              <i className="fa fa-users"></i>
                              {item.totalStudents}
                            </div>
                            <div className="col-md-8" id="productPR">
                              {item.suqqestion > 0 ? (<div>
                                <small className="txt-d"><del className="delesh">{item.price} تومان</del></small>
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

export default OurCourses;