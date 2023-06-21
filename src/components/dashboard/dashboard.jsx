import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Error404 from "../errors/404";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import {
  allCoursesRoute,
  articlesRoute,
  dashboardRoute,
  deleteArticleRoute,
  deleteCourse,
  teacherRequests,
  usersRoute,
} from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import UserProfileDash from "../sections/UserProfleDash";
import "../styles/dashboardStyle.css";
import { ClipLoader } from "react-spinners";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const Dahsboard = () => {
  //TODO user Details
  const [fullname, setFullname] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [userD, setUserD] = useContext(UnameIdContext);
  const [photo, setPhoto] = useState([]);
  const [allTeacher, setAllTeacher] = useState([]);
  const [articles, setArticles] = useState([]);

  //* lodaer Spinner
  const [loading, setLoading] = useState(true);

  //! Getting Let For Show User Post
  const [postShower, setPostShower] = useState(false);

  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      const userGeter = localStorage.getItem("user");
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      const findedUser = userAll.find((item) => item._id === userGeter);
      setUserD(findedUser);
      setAllTeacher(users.data.filter((item) => item.teacher == "true"));
    };
    localStorageGeter();
  }, []);

  //* user Posts Storage
  const [userPost, setUserPost] = useState([]);
  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      const userGeter = localStorage.getItem("user");
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      console.log(users);
      const findedUser = userAll.find((item) => item._id === userGeter);
      setUserD(findedUser);
    };
    if (userD) {
      localStorageGeter();
    } else {
    }
  }, []);

  //? sidebar Menu
  const [sidebarShower, setSidebarShower] = useState(false);

  //! Server Error
  const [err, setErr] = useState();

  // useEffect(() => {
  //   // const getUser = async () => {
  //   //   await axios.post(usersRoute, {}, config).then(result => {
  //   //     console.log(result);
  //   //     setUserD(result.data.userid)
  //   //   })
  //   // }
  //   // console.log(userD);
  //   // getUser();
  //   showPost()
  // }, [])

  console.log(err);

  //* Log out
  const HandleLogOut = async () => {
    localStorage.removeItem("user");
  };
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

  //? Search blog
  const filterContentblog = (posts, searchTerm) => {
    console.log(posts);
    const result = posts.filter((post) => post.articleName.includes(searchTerm));
    setArticles(result);
    setLoading(false)
  };

  const handleTextSearchblog = async (e) => {
    const searchTerm = e.currentTarget.value;
    console.log(searchTerm);
    await axios.get(articlesRoute).then((res) => {
      if (res.data) {
        console.log(res);
        filterContentblog(res.data, searchTerm);
      }
    });
  };


  //? SetData
  const showPost = async () => {
    setLoading(true);
    setPostShower(!postShower);
    const userPosts = await axios.get(dashboardRoute);
    console.log(userPosts);
    const posts = [...userPosts.data];
    // const filterPosts = posts.filter((item) => item.userId === userD._id);
    setUserPost(posts);
  };

  useEffect(() => {
    if (userPost) {
      setLoading(false);
    }
  }, [userPost]);

  console.log(userD);
  console.log(userPost);

  //! Delete post
  const handleDeletePost = (id) => {
    try {
      axios.delete(deleteCourse + id, config);
      showPost();
      const userPoste = [...userPost];
      const filterPost = userPoste.filter((item) => item._id !== id);
      toast((t) => (
        <span dir="rtl">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-danger"
          >
            باشه
          </button>
          <br />
          پست <p className="badge badge-success">{filterPost.name}</p> با موفقیت
          حذف شد
        </span>
      ));
    } catch (error) {
      console.log(error);
    }
  };

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
  const [teachers, setTeachers] = useState([]);

  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      // const userGeter = localStorage.getItem("user");
      await axios.get(usersRoute).then((result) => {
        console.log(result);
        const fu = result.data.filter((item) => item.teacher === "true");
        // console.log(fu);
        const uf = result.data.filter((item) => item.teacher == "false");
        setTeachers(fu);
        setUsers(uf);
      });
    };
    localStorageGeter();
  }, []);

  const [teacherRequest, setTeacherRequest] = useState([]);

  useEffect(() => {
    const getTeacherRequests = async () => {
      await axios.get(teacherRequests).then((result) => {
        setTeacherRequest(result.data);
      });
    };
    getTeacherRequests();
  }, []);

  console.log(teacherRequest);

  window.addEventListener("scroll", () => {
    console.log(window.pageYOffset);
    if (window.pageYOffset >= 250) {
      const ul = document.getElementById("ul-fixible");
      ul.classList.add("ul-fixing");
      const resNav = document.getElementById("res-nav-res");
      resNav.classList.add("res-nav-fixing");
      const fixNav = document.getElementById("fix-nav");
      fixNav.classList.add("res-nav-fixing");
    } else {
      const ul = document.getElementById("ul-fixible");
      ul.classList.remove("ul-fixing");
      const resNav = document.getElementById("res-nav-res");
      resNav.classList.remove("res-nav-fixing");
      const fixNav = document.getElementById("fix-nav");
      fixNav.classList.remove("res-nav-fixing");
    }
  });

  const handleDeleteArticle = async (id) => {
    await axios.post(deleteArticleRoute, { id }).then((result) => {
      console.log(result);
      toast.success("مقاله مورد نظر با موفقیت پاک شد");
    });

    await axios.get(articlesRoute).then((result) => {
      setArticles(result.data);
    });
  };
  const [articleShower, setArticleShower] = useState(false);
  //? SetData
  const showAR = async () => {
    setLoading(true);
    setArticleShower(!articleShower);
    showPost()

    await axios.get(articlesRoute).then((result) => {
      setArticles(result.data);
    });
  };

  return (
    <div>
      <div id="res-nav-res" className="d-none"></div>
      <Helmet>
        <title>{`داشبورد | علم آموزان`}</title>
      </Helmet>
      {userD ? (
        userD.isAdmin == "true" ? (
          <>
            <div className="container">
              <div className="row justify-content-center pt-2">
                <ul className="ul-nav-texts" id="ul-fixible">
                  <Link to="/">
                    <li
                      className={
                        window.location.pathname === "/"
                          ? "active-page"
                          : "text-dark"
                      }
                    >
                      صفحه اصلی
                    </li>
                  </Link>
                  <Link to="/all-courses">
                    <li
                      className={
                        window.location.pathname === "/all-courses"
                          ? "active-page"
                          : "text-dark"
                      }
                    >
                      دوره ها
                    </li>
                  </Link>
                  <Link to="/teachers">
                    <li
                      className={
                        window.location.pathname === "/teachers"
                          ? "active-page"
                          : "text-dark"
                      }
                    >
                      مدرسین
                    </li>
                  </Link>
                  <Link to="/teacher-hire">
                    <li
                      className={
                        window.location.pathname === "/teacher-hire"
                          ? "active-page"
                          : "text-dark"
                      }
                    >
                      استخدام مدرسین
                    </li>
                  </Link>
                  <Link to="/archive-blog">
                    <li
                      className={
                        window.location.pathname === "/archive-blog"
                          ? "active-page"
                          : "text-dark"
                      }
                    >
                      بلاگ
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div id="wrapper">
              <ul
                class="navbar-nav desktop-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
              >
                <a
                  class="sidebar-brand d-flex align-items-center justify-content-center"
                  href="https://elmamouzan.ir"
                >
                  <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                  </div>
                  <div class="sidebar-brand-text mx-3">ElmAmouzan</div>
                </a>

                <hr class="sidebar-divider my-0" />

                <div class="sidebar-heading">سایر امکانات</div>

                <li class="text-center">
                  <Link className="text-to-right-samll" to="/add-new-course">
                    <span>اضافه کردن دوره جدید</span>
                  </Link>
                </li>

                <li>
                  <Link className="text-to-right-samll my-3" to="/">
                    صفحه اصلی
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-to-right-samll my-3"
                    to={`/user-profile`}
                  >
                    پروفایل
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-to-right-samll my-3"
                    to="/payment-professeors"
                  >
                    بخش تسویه حساب با استادها
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-to-right-samll my-3"
                    to="/users-solutions"
                  >
                    مدیریت دسترسی کاربران
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-to-right-samll my-3"
                    to="/suggestions-course"
                  >
                    مدیریت تخفیف دوره ها
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-to-right-samll my-3"
                    to="/write-articles"
                  >
                    مقاله نویسی
                  </Link>
                </li>

                <hr class="sidebar-divider" />

                <div class="sidebar-heading">دیگر</div>

                <li class="nav-item mt-4">
                  <Link className="text-to-right-samll" to="/contact-us">
                    <span>پشتیبانی</span>
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-to-right-samll my-4"
                    to="/login-users"
                    onClick={HandleLogOut}
                  >
                    خروج از حساب
                  </Link>
                </li>

                <hr class="sidebar-divider d-none d-md-block" />
              </ul>

              {sidebarShower ? (
                <ul
                  class="navbar-nav responsive-nav bg-gradient-primary sidebar sidebar-dark accordion"
                  id="accordionSidebar"
                >
                  <a
                    class="sidebar-brand d-flex align-items-center justify-content-center"
                    href="index.html"
                  >
                    <div class="sidebar-brand-icon rotate-n-15">
                      <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">BileSeo</div>
                  </a>

                  <hr class="sidebar-divider my-0" />

                  <div class="sidebar-heading">سایر امکانات</div>

                  <li class="text-center">
                    <Link className="text-to-right-samll" to="/add-new-course">
                      <span>اضافه کردن دوره جدید</span>
                    </Link>
                  </li>

                  <li>
                    <Link className="text-to-right-samll my-3" to="/">
                      صفحه اصلی
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-to-right-samll my-3"
                      to={`/user-profile`}
                    >
                      پروفایل
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-to-right-samll my-3"
                      to="/payment-professeors"
                    >
                      بخش تسویه حساب با استادها
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-to-right-samll my-3"
                      to="/users-solutions"
                    >
                      مدیریت دسترسی کاربران
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-to-right-samll my-3"
                      to="/suggestions-course"
                    >
                      مدیریت تخفیف دوره ها
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-to-right-samll my-3"
                      to="/write-articles"
                    >
                      مقاله نویسی
                    </Link>
                  </li>

                  <hr class="sidebar-divider" />

                  <div class="sidebar-heading">دیگر</div>

                  <li class="nav-item mt-4">
                    <Link className="text-to-right-samll" to="/service">
                      <span>پشتیبانی</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-to-right-samll my-4"
                      to="/login-users"
                      onClick={HandleLogOut}
                    >
                      خروج از حساب
                    </Link>
                  </li>

                  <hr class="sidebar-divider d-none d-md-block" />
                </ul>
              ) : null}

              <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                  <nav
                    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow align-items-center"
                    id="fix-nav"
                  >
                    <button
                      id="sidebarToggleTop"
                      class="btn btn-link d-md-none rounded-circle mr-3"
                    >
                      <i
                        class="fa fa-bars"
                        onClick={() => setSidebarShower(!sidebarShower)}
                      ></i>
                    </button>

                    <img
                      src="https://img.icons8.com/office/40/dashboard.png"
                      alt="داشبورد"
                    />

                    <ul class="navbar-nav ml-auto">
                      <div class="topbar-divider d-none d-sm-block"></div>

                      <li class="nav-item dropdown no-arrow img-parent">
                        <span class="mr-2 d-lg-inline text-gray-700">
                          {userD ? <>{userD.fullname}</> : null}
                        </span>
                        {photo.map((item) => {
                          console.log(item);
                          if (
                            item.userId === userD._id &&
                            item.for === "profile"
                          ) {
                            const base64String = btoa(
                              String.fromCharCode(
                                ...new Uint8Array(item.img.data.data)
                              )
                            );
                            return (
                              <img
                                src={`data:image/png;base64,${base64String}`}
                                alt={userD.fullname}
                                className="profile-image"
                              />
                            );
                          } else {
                          }
                        })}
                      </li>
                    </ul>
                  </nav>
                  <div class="container-fluid main-container-dashboard">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                      <h1 class="h3 mb-0 text-gray-800">داشبورد</h1>
                    </div>
                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  تعداد دانشجوی تمام دوره ها
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  {/* {user.sended.length} */}
                                  {users.length}
                                </div>
                              </div>
                              <div class="col-auto">
                                <i class="fa fa-share fa-sm fa-fw text-gray-400"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                  دوره های موجود
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  {userPost.length}
                                </div>
                              </div>
                              <div class="col-auto">
                                <i class="fa fa-folder fa-sm fa-fw text-gray-400"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                  تعداد اساتید
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  {allTeacher.length}
                                </div>
                              </div>
                              <div class="col-auto">
                                <i class="fa fa-folder fa-sm fa-fw text-gray-400"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                  تعداد مقالات
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">
                                  {articles.length}
                                </div>
                              </div>
                              <div class="col-auto">
                                <i class="fa fa-folder fa-sm fa-fw text-gray-400"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-xl-8 col-lg-7">
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
                            <div class="chart-area">
                              {postShower ? (
                                <table class="table table-striped">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">عنوان پست</th>
                                      <th scope="col">تاریخ</th>
                                      <th scope="col">وضعیت</th>
                                      <th scope="col">امکانات</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {!loading ? (
                                      userPost.length > 0 ? (
                                        userPost.map((item, index) => (
                                          <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                              <Link to={`/course/${item._id}`}>
                                                {item.name}
                                              </Link>
                                            </td>
                                            <td>
                                              {formatDate(item.createdAt)}
                                            </td>
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
                                              <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                  handleDeletePost(item._id)
                                                }
                                              >
                                                حذف
                                              </button>
                                            </td>
                                            <td>
                                              <Link
                                                to={`/edit-course/${item._id}`}
                                              >
                                                <button className="btn btn-primary btn-sm">
                                                  ویرایش
                                                </button>
                                              </Link>
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <h6 className="my-4 w-100 text-center bg-warning p-2">
                                          مقاله ای ایجاد نشده است
                                        </h6>
                                      )
                                    ) : (
                                      <ClipLoader
                                        color="#333"
                                        loading={loading}
                                        size={150}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                      />
                                    )}
                                  </tbody>
                                </table>
                              ) : (
                                <div className="postShowerBtnParent">
                                  <button
                                    className="btn-nav shadow"
                                    onClick={showPost}
                                  >
                                    مشاهده دوره های موجود
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-xl-4 col-lg-5">
                        <div class="card shadow mb-4">
                          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">
                              کاربران موجود در این اکانت
                            </h6>
                            <div class="dropdown no-arrow">
                              <a>
                                <i class="fa fa-user-circle fa-sm fa-fw text-gray-400"></i>
                              </a>
                            </div>
                          </div>

                          <div class="card-body">
                            <div class="chart-pie pt-4 pb-2">
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    <th scope="col">نام</th>
                                    <th scope="col">تاریخ ورود</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {userD ? <td>{userD.fullname}</td> : null}
                                    {userD ? (
                                      <td>{formatDate(userD.createdAt)}</td>
                                    ) : null}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div class="mt-4 text-center small">
                              <span class="mr-2">
                                <i class="fa fa-circle text-primary"></i> آنلاین
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-8 col-lg-7">
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
                                  placeholder="جستجوی مقاله ها ..."
                                  aria-label="Search"
                                  aria-describedby="basic-addon2"
                                  onChange={handleTextSearchblog}
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
                            <div class="chart-area">
                              {articleShower ? (
                                <table class="table table-striped">
                                  <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">عنوان مقاله</th>
                                      <th scope="col">تاریخ</th>
                                      <th scope="col">وضعیت</th>
                                      <th scope="col">امکانات</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {articles.length ? (
                                      articles.length > 0 ? (
                                        articles.map((item, index) => (
                                          <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                              <Link to={`/article/${item._id}`}>
                                                {item.articleName}
                                              </Link>
                                            </td>
                                            <td>
                                              {formatDate(item.createdAt)}
                                            </td>
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
                                              <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                  handleDeleteArticle(item._id)
                                                }
                                              >
                                                حذف
                                              </button>
                                            </td>
                                            <td>
                                              <Link
                                                to={`/edit-article/${item._id}`}
                                              >
                                                <button className="btn btn-primary btn-sm">
                                                  ویرایش
                                                </button>
                                              </Link>
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <h6 className="my-4 w-100 text-center bg-warning p-2">
                                          دوره ای ایجاد نشده است
                                        </h6>
                                      )
                                    ) : (
                                      <ClipLoader
                                        color="#333"
                                        loading={loading}
                                        size={150}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                      />
                                    )}
                                  </tbody>
                                </table>
                              ) : (
                                <div className="postShowerBtnParent">
                                  <button
                                    className="btn-nav shadow"
                                    onClick={showAR}
                                  >
                                    مشاهده مقاله های موجود
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-xl-4 col-lg-5">
                        <div class="card shadow mb-4">
                          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between"></div>

                          <div class="card-body">
                            <img
                              src={require("../image/loves.png")}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="mt-4 mb-3 mx-3 text-left questionsFont font-weight-bold">
                  درخواست های همکاری از طرف اساتید
                </h4>
                <div className="row mx-0">
                  {teacherRequest.map((item) => (
                    <div className="col-md-4 my-2">
                      <div className="card teacherRequestsParent">
                        <div className="card-body row">
                          <div className="col-12 mb-3">
                            <h5 className="font-weight-bold">
                              {" "}
                              نام : {item.fullname}
                            </h5>
                          </div>
                          <div className="col-6 text-secondary">
                            ایمیل: {item.email}
                          </div>
                          <div className="col-6 text-secondary">
                            تلفن: {item.phone}
                          </div>
                          <div className="col-12 text-secondary">
                            تخصص: {item.experience}
                          </div>
                          <div className="col-12 my-5">
                            توضیحات درباره خود: <br /> {item.message}
                          </div>
                          <div className="col-md-12 text-secondary">
                            تاریخ ارسال شده: {formatDate(item.sendAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <footer class="sticky-footer bg-white my-4">
                  <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                      <span>Copyright &copy; ElmKhoone 2021</span>
                    </div>
                  </div>
                </footer>
              </div>
            </div>

            <a class="scroll-to-top rounded" href="#page-top">
              <i class="fas fa-angle-up"></i>
            </a>

            <div
              class="modal fade"
              id="logoutModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Ready to Leave?
                    </h5>
                    <button
                      class="close"
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Select "Logout" below if you are ready to end your current
                    session.
                  </div>
                  <div class="modal-footer">
                    <button
                      class="btn btn-secondary"
                      type="button"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <a class="btn btn-primary" href="login.html">
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Error404 />
        )
      ) : (
        <Error404 />
      )}
    </div>
  );
};

export default Dahsboard;
