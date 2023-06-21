import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  allCoursesRoute,
  dashboardRoute,
  setSuqqestionRoute,
  usersRoute,
} from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { ClipLoader } from "react-spinners";
import Error404 from "../errors/404";

const SuqqestionsCourse = () => {
  const [userD, setUserD] = useContext(UnameIdContext);
  const [suqqestion, setSuqqestion] = useState();
    
  //* lodaer Spinner
  const [loading, setLoading] = useState(true);


  //? Search Post
  const filterContent = (posts, searchTerm) => {
    const result = posts.filter((post) => post.name.includes(searchTerm));
    console.log(result);
    setUserPost(result);
  };

  const handleTextSearch = async (e) => {
    const searchTerm = e.currentTarget.value;
    console.log(searchTerm);
    await axios.get(allCoursesRoute).then((res) => {
      if (res.data) {
        console.log(res);
        filterContent(res.data, searchTerm);
      }
    });
  };

  const turnofsubmit = (e) => {
    e.preventDefault();
  };

  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      const userGeter = localStorage.getItem("user");
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      const findedUser = userAll.find((item) => item._id === userGeter);
      setUserD(findedUser);
    };
    localStorageGeter();
  }, []);

  //* user Posts Storage
  const [userPost, setUserPost] = useState([]);
  //! Getting Let For Show User Post
  const [postShower, setPostShower] = useState(false);

  //? SetData
  const showPost = async () => {
    setLoading(true)
    setPostShower(!postShower);
    const userPosts = await axios.get(dashboardRoute);
    console.log(userPosts);
    const posts = [...userPosts.data];
    // const filterPosts = posts.filter((item) => item.userId === userD._id);
    setUserPost(posts);
  };


  useEffect(() => {
    if(userPost){
      setLoading(false)
    }
  }, [userPost])

  //   const handleSuqqestion = async (id) => {
  //     try {
  //         await axios.post(setSuqqestionRoute, {id, suqqestion})
  //     } catch (error) {

  //     }
  //   }


  return (
    <section>
     {userD ? (userD.isAdmin == "true" ? ( <div className="container my-5 questionsFont">
        <div className="row">
        <div className="shape mt-3"></div>
          <div className="shape-two"></div>
          <div className="col-md-6 sec-two-texts text-left">
            <h4>
              <span className="text-white">بخش</span>
              <a href="https://elmamouzan.ir/all-courses" className="text-dark">
                مدیریت تخفیف ها
              </a>
            </h4>
            <h5>بهترین سرمایه گذاری سرمایه گذاری روی خود است...</h5>
          </div>
          <div className="col-md-6 my-4">
            <Link to="/contact-us">
              <button className="btn-nav">پشتیبانی</button>
            </Link>
          </div>
          <div class="col-xl-12 col-lg-12 col-12 text-left">
            <div class="card shadow mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                {/* <h6 class="m-0 font-weight-bold text-primary">پست ها</h6> */}
                <form
                  onSubmit={turnofsubmit}
                  class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
                >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bg-secondary border-0 small"
                      placeholder="جستجوی دوره ها ..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      onChange={handleTextSearch}
                    />
                    <div class="input-group-append">
                      <button class="btn btn-primary" type="button">
                        <i class="fa fa-search fa-sm"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <span>
                  <i class="fa fa-folder fa-sm fa-fw text-gray-400"></i>
                </span>
              </div>

              <div class="card-body">
                <div class="chart-area heighter">
                  {postShower ? (
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">عنوان پست</th>
                          <th scope="col">میزان تخفیف</th>
                          <th scope="col">تاریخ</th>
                          <th scope="col">وضعیت</th>
                          <th scope="col">امکانات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading ? (userPost.length > 0 ? (
                          userPost.map((item, index) => {
                            if (item.price > 0 || item.price > "0") {
                              return (
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    <Link to={`/course/${item._id}`}>
                                      {item.name}
                                    </Link>
                                  </td>
                                  <td>
                                    {parseInt(item.suqqestion) > 0 ? (
                                      <p className="badge badge-success">
                                        {item.suqqestion} تومان
                                      </p>
                                    ) : (
                                      <p className="badge badge-warning">
                                        تخفیف ندارد
                                      </p>
                                    )}
                                  </td>
                                  <td>{formatDate(item.createdAt)}</td>
                                  <td>
                                    {item.status === "public" ? (
                                      <span className="badge badge-success">
                                        عمومی
                                      </span>
                                    ) : (
                                      <span className="badge badge-warning">
                                        خصوصی
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <Link to={`/edit-course/${item._id}`}>
                                      <button className="btn btn-primary btn-sm">
                                        ویرایش
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            }
                          })
                        ) : (
                          <h6 className="my-4 w-100 text-center bg-warning p-2">
                            دوره ای ایجاد نشده است
                          </h6>
                        )) : (
                        <ClipLoader
                        color="#333"
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />)}
                      </tbody>
                    </table>
                  ) : (
                    <div className="postShowerBtnParent">
                      <button className="btn-nav shadow" onClick={showPost}>
                        مشاهده دوره های موجود
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>) : (<Error404/>)) : (<Error404/>)}
    </section>
  );
};

export default SuqqestionsCourse;
