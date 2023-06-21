import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  buyCourseRoute,
  deletePostInCardRoute,
  usersRoute,
} from "../utils/routes";
import ReactHtmlParser from "react-html-parser";
import Error404 from "../errors/404";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

// let headers = {"Access-Control-Allow-Origin": "*"}

const BuyCard = () => {
  const [userD, setUserD] = useState();

  //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
    //* lodaer Spinner
    const [loading, setLoading] = useState(true);


  const navigate = useNavigate();

  //* Refresh Page
  const refresh = () => {
    window.location.reload(true);
  };

  //* Get LocalStorage Data

  const localStorageGeter = async () => {
    const userGeter = localStorage.getItem("user");
    const users = await axios.get(usersRoute);
    const userAll = [...users.data];
    const findedUser = userAll.find((item) => item._id === userGeter);
    setPrice(findedUser.prices);
    setUserD(findedUser);
    setLoading(false)
  };
  localStorageGeter();

  const handleRemove = async (id) => {
    await axios
      .post("https://el-mcqy.onrender.com/delete-post-in-card", {
        postId: id,
        userId: userD._id,
      })
      .then((result) => {
        console.log(result);
        setSUC(result.data.messageSUC);
      });
    //* Get LocalStorage Data
    localStorageGeter();
    refresh();
  };

  let productPR = document.querySelectorAll("#productPR");

  productPR.forEach((prices) => {
    prices.innerHTML = prices.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  const buyFreeCourse = async () => {
    await axios
      .post(buyCourseRoute, {
        postId: userD.coursesInCard.map((item) => item._id),
        userId: userD._id,
      })
      .then((result) => {
        console.log(result);
        if(result.data.messageURL){
          window.location = result.data.messageURL
        }
        setSUC(result.data.messageSUC);
        if(userD.map(item => item.userPrices == 0)){
          toast.success("دانشجوی دوره شدی!")
        }
      });
  };

  return (
<>
{!loading ? (
      <section>
      <Helmet>
            <title>{`سبد خرید | علم آموزان `}</title>
          </Helmet>
     {userD ? ( <div class="container py-5 buy-card-parent">
        <div class="row justify-content-center mb-3">
          <div className="shape mt-3"></div>
          <div className="shape-two"></div>
          <div className="col-md-6 sec-two-texts text-left my-4">
            <h4>
              <span className="text-white"> همه</span>دوره های خریداری شده شما
            </h4>
            <h5>روی خود سرمایه گذاری کنید آینده شما تامین می شود...</h5>
          </div>
          <div className="col-md-6 my-4">
            <Link to="/all-courses">
              <button className="btn-nav">همه دوره ها</button>
            </Link>
          </div>
          {SUC ? (
            SUC.length ? (
              <p className="alert alert-success">{SUC}</p>
            ) : null
          ) : null}
          {userD ? (
            userD.coursesInCard.map((item) => (
              <div class="col-md-12 col-xl-10 my-2" dir="rtl">
                <div class="card shadow-0 border rounded-3">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div class="bg-image hover-zoom ripple rounded ripple-surface">
                          <img
                            src={`data:image/png;base64,${item.img.data}`}
                            class="buy-card-product-image"
                          />
                          <a href="#!">
                            <div class="hover-overlay">
                              <div class="mask"></div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-6 col-xl-6">
                        <Link to={`/course/${item._id}`} className="text-dark">
                          <h5>{item.name}</h5>
                        </Link>
                        <div class="d-flex flex-row">
                          <div class="text-danger mb-1 me-2">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                          </div>
                          <span>{item.likes}</span>
                        </div>
                        <p class="text-truncate mb-4 mb-md-0">
                          {ReactHtmlParser(item.description)}
                        </p>
                      </div>
                      <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div
                          class="d-flex flex-row align-items-center mb-1"
                          id="productPR"
                        >
                          <h4 class="mb-1 me-1" id="productPR">
                          {item.suqqestion > 0 ? (<div>
                                <small className="text-danger"><del>{item.price} تومان</del></small>
                                <br />
                                <p className="text-success">{item.suqqestion} تومان</p>
                              </div>) : (item.price == 0 ? (
                                <>رایگان</>
                              ) : (
                                <>{item.price} تومان</>
                              ))}
                          </h4>
                          <span class="text-danger">
                            {/* <s>2,100,000</s> */}
                          </span>
                        </div>
                        <h6 class="text-secondary">خرید راحت و امن</h6>
                        <div class="d-flex flex-column mt-4">
                          <Link
                            to={`/course/${item._id}`}
                            className="text-white"
                          >
                            <button
                              class="btn btn-primary btn-sm w-100"
                              type="button"
                            >
                              جزعیات
                            </button>
                          </Link>
                          <button
                            class="btn btn-danger btn-sm my-2"
                            type="button"
                            onClick={() => handleRemove(item._id)}
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>هنوز در دوره ای شرکت نکرده اید</p>
          )}
        </div>
        <div className="text-center row align-items-center total-price-parent">
          <div className="card w-100">
            <div className="card-body row">
              <div className="col-md-6 text-right">
                {price ? (
                  <h6 id="productPR" className="">
                    جمع کل سبد خرید: {price} تومان
                  </h6>
                ) : null}
              </div>
              <div className="col-md-6 text-left">
                {userD ? (
                  userD.coursesInCard.length > 0 ? (
                    price == 0 ? (
                      <button className="btn-nav" onClick={buyFreeCourse}>
                        نهایی کردن خرید
                      </button>
                    ) : (
                      <button className="btn-nav" onClick={buyFreeCourse}>نهایی کردن خرید</button>
                    )
                  ) : (
                    "درحال حاظر در دوره ای شرکت نکرده اید"
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>) : (<Error404/>)}
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

export default BuyCard;
