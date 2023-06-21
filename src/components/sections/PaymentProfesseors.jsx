import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { allCoursesRoute, paymentTeacherRoute, usersRoute } from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Error404 from "../errors/404";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";

const PaymentProfesseors = () => {

    const [user , setUser] = useState([])
    const [userD, setUserD] = useContext(UnameIdContext);
      
  //* lodaer Spinner
  const [loading, setLoading] = useState(true);


          //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
    //   const userGeter = localStorage.getItem("user");
      await axios.get(usersRoute).then(result => {
        setUser(result.data.filter(item => item.teacher == "true"))
        setLoading(false)
        console.log(result)
    })
    //   console.log(users);
    //   const userAll = [...users.data];
    //   const findedUser = users.data.filter((item) => item.teacher == "true");
    //   setUserD(findedUser)
    };
    localStorageGeter();
  }, []);

        //* Get LocalStorage Data
        useEffect(() => {
            const localStorageGeter = async () => {
              const userGeter = localStorage.getItem("user");
              const users = await axios.get(usersRoute);
              const userAll = [...users.data];
              const findedUser = userAll.find((item) => item._id === userGeter);
              setUserD(findedUser)
            };
            localStorageGeter();
          }, []);

  console.log(user);

  const [courses, setCourses] = useState([])

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

  const payTeacherMonthly = async (id) => {
    await axios.post(paymentTeacherRoute, {courseId: id}).then(result => {
        console.log(result);
        if(result.data.message){
            toast.error(result.data.message)
        }else if(result.data.messageSUC){
            toast.success(result.data.messageSUC)
        }
    })
    await axios.get(allCoursesRoute).then((result) => {
        setCourses(result.data);
        // console.log(result);
      });
  }
    
    return(
        <section>
          <Helmet>
          <title> علم آموزان | تسویه حساب</title>
        </Helmet>
            {userD ? (userD.isAdmin == "true" ? (<div className="container my-5">
                
                <div className="row questionsFont">
                <div className="shape mt-3"></div>
              <div className="shape-two"></div>
        <div className="col-md-6 sec-two-texts text-left">
            <h4><span className="text-white">بخش</span><a href="https://elmamouzan.ir/all-courses" className="text-dark">تسویه حساب با اساتید</a></h4>
            <h5>بهترین سرمایه گذاری سرمایه گذاری روی خود است...</h5>
            </div>
            <div className="col-md-6 my-4">
                <Link to="/contact-us"><button className="btn-nav">پشتیبانی</button></Link>
            </div>
                    {!loading ? (user ? (user.map(item => (
                        <div className="col-md-6 my-2">
                            <div className="card payteachersParent">
                                <div className="card-body text-center">
                                    <h5 className="teacher-name-in-pays">{item.fullname}</h5>
                                    <small className="badge badge-success">{item.expertise}</small>
                                    <br />
                                    <div className="text-left my-3">
                                    <small>دوره ها موجود استاد : {item.fullname}</small>
                                    <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">عنوان دوره</th>
                            <th scope="col">قیمت</th>
                            <th scope="col">دانشجوی کل</th>
                            <th scope="col">دانشجوی ماهانه</th>
                            <th scope="col">تسویه حساب</th>
                          </tr>
                        </thead>
                        {courses ? (
                          courses.map((itemm, index) => {
                            console.log(itemm.sells);
                            // if (item.sells == userD._id) {
                              // item.sells.map(itemse => {
                              //   const sl = itemse
                                if(itemm.userId === item._id){
                                  console.log(itemm.sells);

                                  return (
                                    <tbody>
                                      <tr>
                                        
                                        <td>
                                          <Link to={`/course/${itemm._id}`}>
                                            {itemm.name}
                                          </Link>
                                        </td>
                                        <td id="productPR">
                                          {itemm.price == 0 ? (
                                            <>رایگان</>
                                          ) : (
                                            <>{itemm.price} تومان</>
                                          )}
                                        </td>
                                        <td id="productPR">
                                          {itemm.totalStudents}
                                        </td>
                                        <td id="productPR">
                                          {itemm.monthlyStudents}
                                        </td>
                                        <td id="productPR">
                                          {itemm.monthlyStudents === 0 ? (<button className="btn btn-success" onClick={() => toast.success("این دوره تسویه حساب شده است")}>تسویه شده</button>) : (<button className="btn btn-warning" onClick={() => payTeacherMonthly(itemm._id)}>تسویه</button>)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                }
                              // })
                            // }
                          })
                        ) : (
                          <p className="position-absolute badge badge-warning mt-3">
                            در دوره ای شرکت نکرده اید
                          </p>
                        )}
                      </table>
                                    </div>
                                    <Link to={`/teacher/${item.fullname}`} className="text-dark"><h6 ><button className="btn-nav">پروفایل استاد</button></h6></Link>
                                </div>
                            </div>
                        </div>
                    ))) : (null)) : (<div className="cliploader">
                    <ClipLoader
                    color="#333"
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /></div>)}
                </div>
            </div>) : (<Error404/>)) : (<Error404/>)}
        </section>
    )
}

export default PaymentProfesseors;