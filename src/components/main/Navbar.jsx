import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UnameIdContext } from "../context/UnameId";
import { allCoursesRoute, usersRoute } from "../utils/routes";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const Navbar = () => {
  //* List Shower
  const [show, setShow] = useState(false);

  const location = useLocation();

  //? user Details
  const [fullname, setFullname] = useState();
  const [userD, setUserD] = useContext(UnameIdContext);

  //* Refresh Page
  const refresh = () => {
    window.location.reload(true);
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

  //* Log out
  const HandleLogOut = async () => {
    refresh();
    localStorage.removeItem("user");
  };

  console.log(userD);

  if (location.pathname === "/") {
    window.addEventListener("scroll", () => {
      console.log(window.pageYOffset);
      if (window.pageYOffset >= 250) {
        const ul = document.getElementById("ul-fixible");
        ul.classList.add("ul-fixing");
        const resNav = document.getElementById("res-nav-res")
        resNav.classList.add("res-nav-fixing")
        
      } else {
        const ul = document.getElementById("ul-fixible");
        ul.classList.remove("ul-fixing");
        const resNav = document.getElementById("res-nav-res")
        resNav.classList.remove("res-nav-fixing")
      }
    });
  } else {
  }

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      await axios.get(allCoursesRoute).then((result) => {
        setCourses(result.data);
        // console.log(result);
      });
    };
    getAllCourses();
  }, []);

  console.log(courses);

  const [showCategory, setShowCategory] = useState(false);

  const hide = () => {
    setShow(!show);
    setShowCategory(false);
  };

  return (
    <>
    <div id="fix-nav" className="d-none"></div>
      <nav className="nav-des pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3 img-nav-parent">
              <a
                href="https://elmamouzan.ir"
                className="text-dark text-decoration-none"
              >
                <img
                  src={require("../image/logo.png")}
                  className="nav-img mx-2"
                  alt="لگو علم آک.زان"
                />{" "}
                علم آموزان
              </a>
            </div>
            <div
              className="col-md-2 nav-icon-parent"
              onClick={() => setShowCategory(!showCategory)}
            >
              {showCategory ? (<i className="fa fa-close"></i>) : (<i className="fa fa-list"></i>)}
              <span className="nav-text mx-2">دسته بندی</span>
            </div>
            {showCategory ? (
              <div className="categories">
                <div className="card">
                  <div className="card-body text-left row">
                    <div className="col-md-4">
                      <ul>
                        <Link
                          to="/coursecategory/برنامه نویسی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"><i className="fa fa-code"></i> برنامه نویسی </li>
                        </Link>
                        <Link
                          to="/coursecategory/بازاریابی مجازی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-digg"></i> بازاریابی مجازی</li>
                        </Link>
                        <Link
                          to="/coursecategory/زبان انگلیسی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-user"></i> زبان انگلیسی</li>
                        </Link>
                        <Link
                          to="/coursecategory/موسیقی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-music"></i> موسیقی</li>
                        </Link>
                        <Link
                          to="/coursecategory/عکاسی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-camera"></i> عکاسی</li>
                        </Link>
                        <Link
                          to="/coursecategory/گرافیک"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-sort-desc"></i> گرافیک</li>
                        </Link>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <ul>
                        <Link
                          to="/coursecategory/ورزشی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-paragraph"></i> ورزشی</li>
                        </Link>
                        <Link
                          to="/coursecategory/ریاضی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-meanpath"></i> ریاضی</li>
                        </Link>
                        <Link
                          to="/coursecategory/ادبیات فارسی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-language"></i> ادبیات فارسی</li>
                        </Link>
                        <Link
                          to="/coursecategory/تدوین"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-edit"></i> تدوین</li>
                        </Link>
                        <Link
                          to="/coursecategory/رقص"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-dashcube"></i> رقص</li>
                        </Link>
                        <Link
                          to="/coursecategory/امنیت و نفوذ"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-sellsy"></i> امنیت و نفوذ</li>
                        </Link>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <ul>
                        <Link
                          to="/coursecategory/علوم"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-scissors"></i> علوم</li>
                        </Link>
                        <Link
                          to="/coursecategory/صنایع غذایی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-forumbee"></i> صنایع غذایی</li>
                        </Link>
                        <Link
                          to="/coursecategory/شیمی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-shield"></i> شیمی</li>
                        </Link>
                        <Link
                          to="/coursecategory/دیزاین لباس"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-columns"></i> دیزاین لباس</li>
                        </Link>
                        <Link
                          to="/coursecategory/وکالت"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-dashcube"></i> وکالت</li>
                        </Link>
                        <Link
                          to="/coursecategory/روانشناسی"
                          onClick={() => setShowCategory(!showCategory)}
                        >
                          <li className="text-dark"> <i className="fa fa-thumb-tack"></i> روانشناسی</li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="col-md-7 row big-col-nav">
              <div className="col-md-9 p-0">
                {userD ? (<Link to="/buy-card" className="text-dark">
                  <i className="fa fa-shopping-bag"></i>
                </Link>) : (null)}
                {userD ? (
                  <small className="badge badge-primary in-your-bag">
                    {userD.coursesInCard.length}
                  </small>
                ) : null}
              </div>
              <div className="col-md-3 p-0">
                {/* {fullname ? (<Link to="/dashboard"><button className="btn-nav">{fullname}</button></Link>) : (<Link to="/register-users"><button className="btn-nav">ورود / عضویت</button></Link>)} */}
                {userD ? (
                  <button
                    type="button"
                    class="btn btn-primary dropdown-toggle navbBtn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Link to="/register-users" className="text-white">
                      {userD.fullname}
                    </Link>
                  </button>
                ) : (
                  <button type="button" class="btn btn-primary navbBtn">
                    <Link to="/register-users" className="text-white">
                      ثبت نام / ورود
                    </Link>
                  </button>
                )}
                <ul class="dropdown-menu">
                  {userD ? (userD.isAdmin == "true" ? (<li>
                    <Link class="dropdown-item" to="/dashboard">
                      داشبورد
                    </Link>
                  </li>) : (null)) : (null)}
                  <li className="my-2">
                    <Link class="dropdown-item" to="/user-profile">
                      پروفایل
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link class="dropdown-item" to="/user-profile">
                      تنظیمات ناحیه کاربری
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                      to="/login-users"
                      onClick={HandleLogOut}
                    >
                      خروج از حساب
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row">
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
                  همکاری مدرسین
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
      </nav>

      <nav className="nav-res py-4" id="res-nav-res">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 img-nav-parent">
              <a
                href="https://elmamouzan.ir"
                className="text-dark text-decoration-none"
              >
                <img
                  src={require("../image/logo.png")}
                  className="img-nav-res mx-2"
                  alt="لگو علم آموزان"
                />{" "}
                علم آموزان
              </a>
            </div>
            <div className="col-6 row big-col-nav">
              <div className="col-4 p-0">
              {userD ? (<Link to="/buy-card" className="text-dark">
                  <i className="fa fa-shopping-bag"></i>
                </Link>) : (null)}
                {userD ? (
                  <small className="badge badge-primary in-your-bag">
                    {userD.coursesInCard.length}
                  </small>
                ) : null}
              </div>
              <div className="col-4 p-0">
                <i
                  className={show ? "fa fa-close" : "fa fa-list"}
                  onClick={() => setShow(!show)}
                ></i>
              </div>
              <div className="col-4 p-0">
              {userD ? (
                  <button
                    type="button"
                    class="btn btn-primary drbtn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Link to="/register-users" className="text-white">
                      <i className="fa fa-user"></i>
                    </Link>
                  </button>
                ) : (
                  <button type="button" class="btn btn-primary drbtn">
                    <Link to="/register-users" className="text-white">
                      <i className="fa fa-sign-in"></i>
                    </Link>
                  </button>
                )}
                <ul class="dropdown-menu">
                  {userD ? (userD.isAdmin == "true" ? (<li>
                    <Link class="dropdown-item" to="/dashboard">
                      داشبورد
                    </Link>
                  </li>) : (null)) : (null)}
                  <li className="my-2">
                    <Link class="dropdown-item" to="/user-profile">
                      پروفایل
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link class="dropdown-item" to="/user-profile">
                      تنظیمات ناحیه کاربری
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                      to="/login-users"
                      onClick={HandleLogOut}
                    >
                      خروج از حساب
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {show ? (
            <div className="res-ul-parent">
              <ul className="res-ul">
                <Link to="/">
                  <li
                    onClick={hide}
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
                    onClick={hide}
                    className={
                      window.location.pathname === "//all-courses"
                        ? "active-page"
                        : "text-dark"
                    }
                  >
                    دوره ها
                  </li>
                </Link>
                <Link to="/teachers">
                  <li
                    onClick={hide}
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
                    onClick={hide}
                    className={
                      window.location.pathname === "/teacher-hire"
                        ? "active-page"
                        : "text-dark"
                    }
                  >
                    همکاری مدرسین
                  </li>
                </Link>
                <Link to="/archive-blog">
                  <li
                    onClick={hide}
                    className={
                      window.location.pathname === "/archive-blog"
                        ? "active-page"
                        : "text-dark"
                    }
                  >
                    بلاگ
                  </li>
                </Link>
                <li onClick={() => setShowCategory(!showCategory)}>
                  دسته بندی
                </li>
              </ul>
              {showCategory ? (
                <div className="categories">
                  <div className="card">
                    <div className="card-body row">
                      <i
                        className="fa fa-window-close close-category-icon"
                        onClick={hide}
                      ></i>
                      <div className="col-md-4">
                        <ul className="p-0">
                        <Link
                          to="/coursecategory/برنامه نویسی"
                          onClick={hide}
                        >
                          <li className="text-dark"><i className="fa fa-code"></i> برنامه نویسی </li>
                        </Link>
                        <Link
                          to="/coursecategory/بازاریابی مجازی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-digg"></i> بازاریابی مجازی</li>
                        </Link>
                        <Link
                          to="/coursecategory/زبان انگلیسی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-user"></i> زبان انگلیسی</li>
                        </Link>
                        <Link
                          to="/coursecategory/موسیقی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-music"></i> موسیقی</li>
                        </Link>
                        <Link
                          to="/coursecategory/عکاسی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-camera"></i> عکاسی</li>
                        </Link>
                        <Link
                          to="/coursecategory/گرافیک"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-sort-desc"></i> گرافیک</li>
                        </Link>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <ul className="p-0">
                        <Link
                          to="/coursecategory/ورزشی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-paragraph"></i> ورزشی</li>
                        </Link>
                        <Link
                          to="/coursecategory/ریاضی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-meanpath"></i> ریاضی</li>
                        </Link>
                        <Link
                          to="/coursecategory/ادبیات فارسی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-language"></i> ادبیات فارسی</li>
                        </Link>
                        <Link
                          to="/coursecategory/تدوین"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-edit"></i> تدوین</li>
                        </Link>
                        <Link
                          to="/coursecategory/رقص"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-dashcube"></i> رقص</li>
                        </Link>
                        <Link
                          to="/coursecategory/امنیت و نفوذ"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-sellsy"></i> امنیت و نفوذ</li>
                        </Link>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <ul className="p-0">
                        <Link
                          to="/coursecategory/علوم"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-scissors"></i> علوم</li>
                        </Link>
                        <Link
                          to="/coursecategory/صنایع غذایی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-forumbee"></i> صنایع غذایی</li>
                        </Link>
                        <Link
                          to="/coursecategory/شیمی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-shield"></i> شیمی</li>
                        </Link>
                        <Link
                          to="/coursecategory/دیزاین لباس"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-columns"></i> دیزاین لباس</li>
                        </Link>
                        <Link
                          to="/coursecategory/وکالت"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-dashcube"></i> وکالت</li>
                        </Link>
                        <Link
                          to="/coursecategory/روانشناسی"
                          onClick={hide}
                        >
                          <li className="text-dark"> <i className="fa fa-thumb-tack"></i> روانشناسی</li>
                        </Link>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
