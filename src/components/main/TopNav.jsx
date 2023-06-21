import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UnameIdContext } from "../context/UnameId";
import axios from "axios";
import { allCoursesRoute } from "../utils/routes";

const TopNav = () => {

    const [showSearch, setShowSearch] = useState(false);
     //TODO Search Box
  const [showResult , setShowResult] = useState(false)

    const [courses, setCourses] = useState([]);
    const [userD, setUserD] = useContext(UnameIdContext);
  
    useEffect(() => {
      const getAllCourses = async () => {
        await axios.get(allCoursesRoute).then(result => {
          setCourses(result.data)
          // console.log(result);
        })
      }
      getAllCourses();
    }, [])
  
    console.log(courses);

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

    return(
        <nav className="topNav">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 gmail-parent">
                 <i className="fa fa-envelope mx-2"> </i>  info@elmamouzan.ir  
                    </div>
                    <div className="col-md-8 ul-desktop-parent">
                        <ul className="desktop-ul">
                            <Link to="/contact-us" className="text-white"><li>تماس با ما</li></Link>
                            <Link to="/about-us" className="text-white"><li>درباره ما</li></Link>
                            <li><i className="fa fa-search" onClick={() => setShowSearch(!showSearch)}></i></li>
                        </ul>
                    </div>
                    {showSearch ? (<div className="search-box w-100 text-center py-2">
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
                    <button class="btn btn-primary" type="button">
                      <i class="fa fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
                    </div>) : (null)}
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
                </div>
            </div>
        </nav>
    )
}

export default TopNav;