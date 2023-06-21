import { Link } from "react-router-dom";
import OurCourses from "../sections/OurCourses";
import SecDetails from "../sections/SecDetails";
import SecFiveComments from "../sections/SecFiveComments";
import SecFourArticle from "../sections/SecFourArticle";

import SecOne from "../sections/SecOne";
import ContactUs from "../sections/ContactUs";
import RelatedAdNotification from "../sections/Related";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { allCoursesRoute, usersRoute } from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import FreeCourses from "../sections/FreeCourses";
import PopularCourses from "../sections/PopularCourses";
import DetailsAfterHead from "../sections/DetailsAfterHead";
import { Helmet } from "react-helmet";

const Header = () => {

  const [showSearch, setShowSearch] = useState(false);
  //TODO Search Box
const [showResult , setShowResult] = useState(false)

 const [courses, setCourses] = useState([]);

  const filterContent = (posts, searchTerm) => {
    const result = posts.filter((post) => post.name.includes(searchTerm));
    console.log(result);
    setCourses(result)
   }
  

   const inputRef = useRef()
   const handleTextSearch = async (e) => {
    const searchTerm = e.currentTarget.value;
    console.log(searchTerm);
    await axios.get(allCoursesRoute).then(res => {
      if(res.data){
        console.log(res);
        filterContent(res.data, searchTerm)
      }
    })

    if(inputRef.current.value){
      setShowResult(true)
    }else{
     setShowResult(false)
    }
   }

   console.log(inputRef);

   const hide = () => {
    setShowResult(!showResult);
    setShowSearch(!showSearch);
   }

  //  const [userD, setUserD] = useContext(UnameIdContext);
  const [users, setUsers] = useState([])
  const [teachers, setTeachers] = useState([])

    //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      // const userGeter = localStorage.getItem("user");
      await axios.get(usersRoute).then(result => {
        console.log(result);
        const fu = result.data.filter(item => item.teacher === "true")
        // console.log(fu);
        const uf = result.data.filter(item => item.teacher == "false")
        setTeachers(fu)
        setUsers(uf)
      })
    };
    localStorageGeter();
  }, []);

  console.log(users);

  const [coursesAll, setCoursesAll] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      await axios.get(allCoursesRoute).then(result => {
        setCoursesAll(result.data)
        // console.log(result);
      })
    }
    getAllCourses();
  }, [])


  return (
    <>
    <Helmet>
        <title>صفحه اصلی | علم آموزان</title>
      </Helmet>
      <header className="py-5">
        <div className="container mt-5">
          <div className="row justify-content-center">
            {/* <div className="col-md-6 header-texts text-center">
              <div>
                <h2>از استاد های تایید شده یاد بگیر!</h2>
                <h5 className="my-4">
                  مدرک معتبر ملی بعد از پایان دوره با تایید دانشگاه پیام نور و
                  آزاد!
                </h5>
              </div>
              <div>
                <Link to="/all-courses">
                  <button className="btn-nav">
                    همین الان آموزش رو شروع کن
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-6 p-0 mb-4"></div> */}
            <div className="header-texts">
                <h2>از استاد های تایید شده یاد بگیر!</h2>
                <h5 className="my-4">
                  مدرک معتبر ملی بعد از پایان دوره با تایید دانشگاه پیام نور ,
                  آزاد و <a href="https://elmamouzan.ir" className="text-white">آموزشگاه آنلاین</a> علم آموزان!
                </h5>
              </div>
              <div className="col-12 header-texts-two text-center">
        <div>
          <h2>از استاد های تایید شده یاد بگیر!</h2>
          <h5 className="my-4">
            مدرک معتبر ملی بعد از پایان دوره با تایید دانشگاه پیام نور و آزاد!
          </h5>
        </div>
        {/* <div>
          <Link to="/all-courses">
            <button className="btn-nav">همین الان آموزش رو شروع کن</button>
          </Link>
        </div> */}
      </div> <div className="search-box w-75 text-center py-2">
                  <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small headerSearch"
                    placeholder="جستجوی دوره ها..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={handleTextSearch}
                    ref={inputRef}
                  />
                  <div class="input-group-append">
                    <button class="btn btn-secondary" type="button">
                      <i class="fa fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
                    </div>
                    
                    {showResult ? ( <div className="container parent-of-results">
                <div className="row search-result-parent">
          
                 <table class="table table-striped serach-result">
                 <thead>
                   <tr>
                     <th scope="col">#</th>
                     <th scope="col">نتایج جستجوی شما</th>
                   </tr>
                 </thead>
                 <tbody>
                   {courses.length > 0 ? (
                     courses.map((item) => (
                       item.status === "public" ? (<tr>
                        <th scope="row"></th>
                        <td className="w-100"><Link to={`/course/${item._id}`} onClick={hide}>{item.name}</Link></td>
                      </tr>) : (null)
                     ))
                   ) : (
                   <div className="search-falid">
                     <p className="badge badge-warning my-5">متاسفانه پست مورد نظر شما پیدا نشد</p>
                   </div>
                   )}
                 </tbody>
               </table>
             
                </div>
              </div>) : (null)}
              
              {/* <div className="col-md-12 row details-parent">
              <div className="col-4 text-white nav-options-parent">
                
                <img src="https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png" alt="" />
                <small className="d-block">{users.length} +</small>
              <small>دانشجو</small>
            </div>
            <div className="col-4 text-white nav-options-parent">
                <img src="https://www.freeiconspng.com/thumbs/teachers-icon/teachers-icon-2.png" alt="" />
                <small className="d-block">{teachers.length} +</small>
              <small>مدرس</small>
            </div>
            <div className="col-4 text-white nav-options-parent">
                <img src="https://cdn-icons-png.flaticon.com/512/4762/4762232.png" alt="" />
                <small className="d-block">{coursesAll.length} +</small>
              <small>دوره</small>
            </div>
              </div> */}
          </div>
        </div>
      </header>
      {/* <div className="col-12 header-texts-two text-center">
        <div>
          <h2>از استاد های تایید شده یاد بگیر!</h2>
          <h5 className="my-4">
            مدرک معتبر ملی بعد از پایان دوره با تایید دانشگاه پیام نور و آزاد!
          </h5>
        </div>
        <div>
          <Link to="/all-courses">
            <button className="btn-nav">همین الان آموزش رو شروع کن</button>
          </Link>
        </div>
      </div> */}
      <DetailsAfterHead/>
      <SecOne />
      <OurCourses />
      {/* <SecDetails /> */}
      <PopularCourses/>
      <SecFourArticle />
      <FreeCourses/>
      <SecFiveComments />
      <RelatedAdNotification/>
    </>
  );
};

export default Header;
