import axios from "axios";
import {
  allCoursesRoute,
  dashboardRoute,
  deleteCourse,
  usersRoute,
} from "../utils/routes";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { UnameIdContext } from "../context/UnameId";
import Error404 from "../errors/404";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const UsersSolutions = () => {
  const [users, setUsers] = useState([]);
  //! Getting Let For Show User Post
  const [postShower, setPostShower] = useState(false);
    
  //* lodaer Spinner
  const [loading, setLoading] = useState(true);


  //? SetData
  const showPost = async () => {
    setLoading(true)
    setPostShower(!postShower);
    const user = await axios.get(usersRoute);
    console.log(user);
    const posts = [...user.data];
    // const filterPosts = posts.filter((item) => item.userId === userD._id);
    setUsers(posts);
  };

  useEffect(() => {
    if(users){
      setLoading(false)
    }
  }, [users])

  //? Search Post
  const filterContent = (posts, searchTerm) => {
    const result = posts.filter((post) => post.fullname.includes(searchTerm));
    console.log(result);
    setUsers(result);
  };

  const handleTextSearch = async (e) => {
    const searchTerm = e.currentTarget.value;
    console.log(searchTerm);
    await axios.get(usersRoute).then((res) => {
      if (res.data) {
        console.log(res);
        filterContent(res.data, searchTerm);
      }
    });
  };

  const turnofsubmit = (e) => {
    e.preventDefault();
  };

  const [userD, setUserD] = useContext(UnameIdContext);

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

  return (
    <section>
       <Helmet>
            <title>{` دسترسی کاربران | علم آموزان `}</title>
          </Helmet>
    {userD ? (userD.isAdmin == "true" ? (
        <div className="container">
        <div className="row my-5 questionsFont">
          <div className="shape mt-3"></div>
          <div className="shape-two"></div>
          <div className="col-md-6 sec-two-texts text-left">
            <h4>
              <span className="text-white">بخش</span>
              <a href="https://elmamouzan.ir/all-courses" className="text-dark">
                مدیریت دسترسی کاربران
              </a>
            </h4>
            <h5>بهترین سرمایه گذاری سرمایه گذاری روی خود است...</h5>
          </div>
          <div className="col-md-6 my-4">
            <Link to="/contact-us">
              <button className="btn-nav">پشتیبانی</button>
            </Link>
          </div>
          <div class="col-xl-12 col-lg-12 col-12 text-left mt-3">
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
                      placeholder="جستجوی کاربران  ..."
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

              <div class="card-body solutionscard">
                <div class="chart-area">
                  {postShower ? (
                    <table class="table table-striped ">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">نام</th>
                          <th scope="col">ایمیل</th>
                          <th scope="col">تاریخ</th>
                          <th scope="col">معرفی دانشگاه</th>
                          <th scope="col">وضعیت</th>
                          <th scope="col">مدرس</th>
                          <th scope="col">امکانات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading ? (users.length > 0 ? (
                          users.map((item, index) => {
                            if(item.id !== "646cd2076b8bfb4854633f45" && item.email !== "alirezavizhe@gmail.com"){
                              return(
                                <tr>
                              <th scope="row">{index}</th>
                              <td>
                              <Link
                                  to={`/teacher/${item.fullname}`}
                                >
                                  <h6>{item.fullname}</h6>
                                </Link>
                              </td>
                              <td>{item.email}</td>
                              <td>{formatDate(item.createdAt)}</td>
                              <td>
                                {item.teacher == "true" ? (item.fromUniversity == "true" ? (
                                  <span className="badge badge-info">
                                    استاد دانشگاه
                                  </span>
                                ) : (
                                  <span className="badge badge-primary">
                                    استاد علم آموزان
                                  </span>
                                )) : (<span className="badge badge-secondary">
                                کاربر
                              </span>)}
                              </td>
                              <td>
                                {item.isAdmin == "true" ? (
                                  <span className="badge badge-success">
                                    ادمین
                                  </span>
                                ) : (
                                  <span className="badge badge-warning">
                                    عادی
                                  </span>
                                )}
                              </td>
                              <td>
                                {item.teacher == "true" ? (
                                  <span className="badge badge-success">
                                    بله
                                  </span>
                                ) : (
                                  <span className="badge badge-warning">
                                    خیر
                                  </span>
                                )}
                              </td>
                              <td>
                                <Link to={`/update-user/${item._id}`}>
                                  <button className="btn btn-primary btn-sm">
                                    ویرایش
                                  </button>
                                </Link>
                              </td>
                            </tr>
                              )
                            }
                            
})
                        ) : (
                          <h6 className="my-4 w-100 text-center bg-warning p-2">
                            استادی وجود ندارد
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
                      مشاهده تمام کاربران علم آموزان
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (<Error404/>)) : (<Error404/>)}
    </section>
  );
};

export default UsersSolutions;
