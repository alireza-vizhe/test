import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { allCoursesRoute, visitCourseRoute } from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import { Link, useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";


const CategoryCourse = () => {

    const [courses, setCourses] = useState([]);
    const [userD, setUserD] = useContext(UnameIdContext);
  
    const {id} = useParams();
    console.log(id);

    useEffect(() => {
      const getAllCourses = async () => {
        await axios.get(allCoursesRoute).then(result => {
          setCourses(result.data)
          // console.log(result);
          setLoading(false)
        })
      }
      getAllCourses();
    }, [])
  
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
      await axios.post(visitCourseRoute + id).then(result => {
        console.log(result);
      })
    }
  
    let productPR = document.querySelectorAll('#productPR');
  
    productPR.forEach((prices) => {
      prices.innerHTML = prices.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    })

      //* lodaer Spinner
  const [loading, setLoading] = useState(true);
  
    return (
      <section>
        {!loading ? (<div className="container my-4">
          <div className="row">
                <div className="shape mt-3"></div>
                <div className="shape-two"></div>
              <div className="col-md-6 sec-two-texts text-left my-4">
              <h4><span className="text-white">دوره</span> های ما</h4>
              <h5>کسب کار شما با یادگیری پیشرفت میکند...</h5>
              </div>
              <div className="col-md-6 my-4">
                  <Link to="/all-courses"><button className="btn-nav">همه دوره ها</button></Link>
              </div>
              {courses.map(item => {
                if(item.status === "public" && item.category === id){
                  const base64String = btoa(
                    String.fromCharCode(
                      ...new Uint8Array(item.img.data.data)
                    )
                  );
                        return (
                          <div className="col-md-3 col-sm-6 my-2">
        <Helmet>
            <title>{`${id} | علم آموزان `}</title>
          </Helmet>
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
                            <Link to={`/course/${item._id}`} className="text-dark" onClick={() => plusVisitCourse(item._id)}><h5 className="text-center my-2">{item.name}</h5></Link>
              
              {/* {ReactHtmlParser(item.description)} */}
                            <div className="mt-4 mb-2 px-3">
                              <i className="fa fa-user"></i> {item.userD}
                            </div>
                            <hr />
                            <div className="container">
                          <div className="row bottom-in-card pb-3">
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
                        )
                    }else{
                    
                }
                
  })}
          </div>
        </div>) : (<div className="cliploader">
          <ClipLoader
            color="#333"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>)}
      </section>
    );
}
export default CategoryCourse;