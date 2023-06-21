import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import formatDate from "../utils/formatDate";
import ReCAPTCHA from "react-google-recaptcha";
// import { userUpdate } from "../secure/profileUserUpdate";
import { Helmet } from "react-helmet";
import { UnameIdContext } from "../context/UnameId";
import Navbar from "../main/Navbar";
import { allCoursesRoute, editUserRoute, usersRoute } from "../utils/routes";
import Error404 from "../errors/404";
import { toast } from "react-hot-toast";
import { CKEditor } from "ckeditor4-react";
import { teacherAbout } from "../secure/teacherAbout";
import { ClipLoader } from "react-spinners";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const UserProfileDash = () => {
  //? user detail
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [photo, setPhoto] = useState([]);
  const [userId, setUserId] = useState();
  const [expertise, setExpertise] = useState();
  const [Proposal, setProposal] = useState();
  const [about, setAbout] = useState();

  //? Errors
  const [errors, setErrors] = useState();
  const [userErr, setUserErr] = useState();
  const [successMSG, setSuccessMSG] = useState([]);

  //* Get User Id
  const { id } = useParams();
  console.log(id);

  const [image, setImage] = useState();
  const [imageResume, setImageResume] = useState();

  const [userD, setUserD] = useContext(UnameIdContext);
  const [userDteail, setUserDetail] = useState([]);

  const [courses, setCourses] = useState();

  const [teacherCourses, setTeacherCourses] = useState([]);

  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      const userGeter = localStorage.getItem("user");
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      const findedUser = userAll.find((item) => item._id === userGeter);
      console.log(findedUser);
      setUserD(findedUser);
      await axios.get(allCoursesRoute).then((result) => {
        if (findedUser) {
          const fc = result.data.filter(
            (item) => item.userId === findedUser._id
          );
          setTeacherCourses(fc);
        }
        // console.log(result);
      });
    };
    localStorageGeter();
  }, []);

  // useEffect(() => {
  //   const getAllCourses = async () => {

  //   }
  //   getAllCourses();
  // }, [])

  console.log(teacherCourses, userD);

  //* Refresh Page
  const refresh = () => {
    window.location.reload(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getData = async () => {
        if (localStorage.getItem("user")) {
          const userGeter = localStorage.getItem("user");
          const users = await axios.get(usersRoute);
          const userAll = [...users.data];
          const findedUser = userAll.find((item) => item._id === userGeter);
          console.log(findedUser);
          setFullname(findedUser.fullname);
          setEmail(findedUser.email);
          setPhone(findedUser.phone ? findedUser.phone : "");
          setAge(findedUser.age ? findedUser.age : "");
          setAddress(findedUser.address ? findedUser.address : "");
          setExpertise(findedUser.expertise ? findedUser.expertise : "");
          setProposal(findedUser.Proposal ? findedUser.Proposal : "");
          // setCourses(findedUser.courses ? findedUser.courses : "");
          setAbout(findedUser.about ? findedUser.about : "");
          setLoading(false)
        }
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //? Reacapcha
  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  //! Update User
  const handleUpdateUser = async () => {
    try {
      await teacherAbout.validate(
        {
          about,
        },
        { abortEarly: false }
      );
      //   {
      //     fullname,
      // email,
      // phone,
      // age,
      // address
      //   },
      //   { abortEarly: false }
      // );

      await axios
        .post(
          editUserRoute + userD._id,
          {
            fullname,
            email,
            phone,
            age,
            address,
            expertise,
            about,
            userId: userD._id,
            Proposal,
            recaptchaValue,
          },
          config
        )
        .then((result) => {
          console.log(result);
          setUserDetail(result.data);
          setUserErr(result.data.message);
          setSuccessMSG(result.data.messageSUC);
          if(result.data.messageSUC){
            setUserErr(null);
            setErrors(null);
          }
        });
      toast.success("اطلاعات شما با موفقیت ویرایش شد");
    } catch (error) {
      console.log(error);
      setErrors(error.inner);
    }
  };

    
      //! Messages
      const [error, setError] = useState([]);
      const [SUC, setSUC] = useState([]);
      const [serverError, setServerError] = useState([]);
    

  // console.log(userDetail);
  //? handle Upload Profile Image
    //* lodaer Spinner
    const [loading, setLoading] = useState(true);

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    console.log(formData.get("file"), image);
    const img = formData.get("file");
    setLoading(true)
    try {
      if (userD) {
        await axios
          .post(
            "https://el-mcqy.onrender.com/upload-image-profile",
            {
              textImage: img,
              name: fullname,
              userId: userD._id,
              for: "profile",
            },
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((result) => {
            if(result.data.messageSUC){
              if(result.data.message){
                setServerError(result.data.message)
                setLoading(false)
              }else{
                navigate("/user-profile");
                toast.success(result.data.messageSUC);
                setServerError(null)
                setLoading(false)
                refresh();
              }
            }else{
              if(result.data.message){
        setServerError(result.data.message)
        setLoading(false)
      }else{
        setLoading(true)
      }
    }
          });
        refresh();
      } else {
        console.log("no user");
      }
    } catch (error) {}
  };

  const [resumeI, setResumeI] = useState();

  //? handle Upload Resume Image
  const handleUploadResumeImage = async () => {
    const formData = new FormData();
    formData.append("file", imageResume);
    console.log(formData.get("file"), imageResume);
    const img = formData.get("file");

    try {
      if (userD) {
        await axios
          .post(
            "https://el-mcqy.onrender.com/upload-image-resume",
            {
              textImage: img,
              name: fullname,
              userId: userD.userId,
              for: "resume",
            },
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then((result) => {
            setSuccessMSG(result.data.messageSUC);
            console.log(result);
            setResumeI(result.data);
          });
        // refresh()
      } else {
        console.log("no user");
      }
    } catch (error) {}
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

  // const base64String = btoa(
  //   String.fromCharCode(
  //     ...new Uint8Array(user.img.data.data)
  //   )
  // );
  // setResumeI(base64String)
  // console.log(user.img.data.data, resumeI);

  //* Log out
  const HandleLogOut = async () => {
    refresh();
    localStorage.removeItem("user");
  };

  let productPR = document.querySelectorAll("#productPR");

  productPR.forEach((prices) => {
    prices.innerHTML = prices.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

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

  return (
    <>
    {!loading ? ( <>
       {userD ? (
         <section className="profile-card">
           <Helmet>
             <title>{`${fullname} | علم آموزان `}</title>
           </Helmet>
           <div class="container user-profile-parent py-5">
             <div className="text-center">
             {successMSG ? (
                         successMSG.length ? (
                           <p className="alert alert-success">{successMSG}</p>
                         ) : null
                       ) : null}
                       {userErr ? (
                         userErr.length ? (
                           <p className="alert alert-danger">{userErr}</p>
                         ) : null
                       ) : null}
                       {userErr ? (
                         userErr.length ? (
                           <p className="alert alert-danger">{userErr}</p>
                         ) : null
                       ) : null}
                       {errors
                         ? errors.map((error, index) => (
                             <p key={index} className="alert alert-danger">
                               {error.message}
                             </p>
                           ))
                         : null}
             {SUC ? (
             SUC.length ? (
               <p className="alert alert-success">{SUC}</p>
             ) : null
           ) : null}
           {error
             ? error.map((error, index) => (
                 <p key={index} className="alert alert-danger">
                   {error.message}
                 </p>
               ))
             : null}
           {serverError ? (
             serverError.length >= 1 ? (
               <p className="alert alert-danger">{serverError}</p>
             ) : (
               serverError.length < 1 && null
             )
           ) : null}
             </div>
 
             <div class="row" dir="rtl">
               <div class="col-lg-5">
                 <div class="card mb-4">
                   <div class="card-body text-center">
                     <div className="mb-4">
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
                               alt=""
                               width={100}
                             />
                           );
                         } else {
                         }
                       })}
                     </div>
                     <h5 class="my-3">{fullname}</h5>
                     <p className="text-muted mb-3">{expertise}</p>
                     <div className="input-group">
                       <div className="input-group-prepend">
                         <button
                           className="btn btn-sm btn-outline-secondary"
                           onClick={handleUploadImage}
                         >
                           آپلود عکس
                         </button>
                       </div>
                       <div className="custom-file">
                         <input
                           type="file"
                           onChange={(e) => setImage(e.target.files[0])}
                           className="custom-file-input"
                           id="selectedImage"
                         />
                       </div>
                       <label
                         htmlFor="selectedImage"
                         className="custom-file-label"
                         id="image-Status"
                       >
                         انتخاب عکس
                       </label>
                     </div>
 
                     <hr className="my-4" />
                     <div className="courses-buyed">
                       <h6>دوره های خریداری شده</h6>
                       <table class="table table-striped">
                         <thead>
                           <tr>
                             <th scope="col">#</th>
                             <th scope="col">عنوان دوره</th>
                             <th scope="col">قیمت</th>
                           </tr>
                         </thead>
                         {courses ? (
                           courses.map((item, index) => {
                             console.log(item.sells);
                             // if (item.sells == userD._id) {
                               // item.sells.map(itemse => {
                               //   const sl = itemse
                                 if(item.sells.includes(userD._id)){
                                   console.log(item.sells);
 
                                   return (
                                     <tbody>
                                       <tr>
                                         <th scope="row">{index + 1}</th>
                                         <td>
                                           <Link to={`/course/${item._id}`}>
                                             {item.name}
                                           </Link>
                                         </td>
                                         <td id="productPR">
                                           {item.price == 0 ? (
                                             <>رایگان</>
                                           ) : (
                                             <>{item.price} تومان</>
                                           )}
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
 
                     {userD.teacher == "true" ? (
                       <div className="text-center teacher-courses-in-profile-parent">
                         <br />
                         <br />
                         <hr />
                         <br />
                         <br />
                         <h6>دوره های برگزار شده شما</h6>
                         <table class="table table-striped">
                           <thead>
                             <tr>
                               <th scope="col">#</th>
                               <th scope="col">عنوان دوره</th>
                               <th scope="col">قیمت</th>
                               <th scope="col">کل دانشجو ها</th>
                               <th scope="col">دانشجوهای این ماه</th>
                             </tr>
                           </thead>
                           {userD ? (
                             teacherCourses.map((item, index) => (
                               <tbody>
                                 <tr>
                                   <th scope="row">{index + 1}</th>
                                   <td>
                                     <Link to={`/course/${item._id}`}>
                                       {item.name}
                                     </Link>
                                   </td>
                                   <td id="productPR">
                                     {item.price == 0 ? (
                                       <>رایگان</>
                                     ) : (
                                       <>{item.price} تومان</>
                                     )}
                                   </td>
                                   <td>{item.totalStudents}</td>
                                   <td>{item.monthlyStudents}</td>
                                 </tr>
                               </tbody>
                             ))
                           ) : (
                             <p className="position-absolute badge badge-warning mt-3">
                               دوره ای برگزار نکرده اید
                             </p>
                           )}
                         </table>
                       </div>
                     ) : null}
 
                     <div className="text-center mt-5">
                       <Link to="/login-users">
                         <button className="btn-nav" onClick={HandleLogOut}>
                           خروج از حساب کاربری
                         </button>
                       </Link>
                     </div>
 
                     <div className="my-5">
                       {/* {user.map((item) => { */}
                       {/* {const base64String = btoa(
                         String.fromCharCode(
                           ...new Uint8Array(item.img.data.data)
                         )
                       ); */}
                       {/* return ( */}
                       {/* <img
                           src={`data:image/png;base64,${resumeI}`}
                           alt=""
                           width={100}
                         /> */}
                       {/* );} */}
                       {/* })}  */}
                     </div>
                   </div>
                 </div>
               </div>
               <div class="col-lg-7">
                 <div class="card mb-4">
                   <div class="card-body">
                     <div class="row">
                       <div class="col-sm-3">
                         <p class="mb-0">نام</p>
                       </div>
                       <div class="col-sm-9">
                         <input
                           type="text"
                           placeholder="نام"
                           value={fullname}
                           onChange={(e) => setFullname(e.target.value)}
                           className="w-100 form-control"
                         />
                       </div>
                     </div>
                     <hr />
                     <div class="row">
                       <div class="col-sm-3">
                         <p class="mb-0">ایمیل</p>
                       </div>
                       <div class="col-sm-9">
                         <input
                           type="email"
                           placeholder="ایمیل"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-100 form-control"
                         />
                       </div>
                     </div>
                     <hr />
                     <div class="row">
                       <div class="col-sm-3">
                         <p class="mb-0">شماره موبایل</p>
                       </div>
                       <div class="col-sm-9">
                         <input
                           type="number"
                           placeholder="موبایل"
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           className="w-100 form-control"
                         />
                       </div>
                     </div>
                     <hr />
                     <div class="row">
                       <div class="col-sm-3">
                         <p class="mb-0">سن</p>
                       </div>
                       <div class="col-sm-9">
                         <input
                           type="number"
                           placeholder="سن"
                           value={age}
                           onChange={(e) => setAge(e.target.value)}
                           className="w-100 form-control"
                         />
                       </div>
                     </div>
                     <hr />
                     <div class="row">
                       <div class="col-sm-3">
                         <p class="mb-0">آدرس</p>
                       </div>
                       <div class="col-sm-9">
                         <input
                           type="text"
                           placeholder="آدرس"
                           value={address}
                           onChange={(e) => setAddress(e.target.value)}
                           className="w-100 form-control"
                         />
                       </div>
                     </div>
                     <hr />
                     <div class="row">
                       <div class="col-sm-3">
                         <p class="mb-0">تخصص</p>
                       </div>
                       <div class="col-sm-9">
                         <input
                           type="text"
                           placeholder="تخصص مثلا (برنامه نویسی , دیجیتال مارکتینگ, و...)"
                           value={expertise}
                           onChange={(e) => setExpertise(e.target.value)}
                           className="w-100 form-control"
                         />
                       </div>
                     </div>
                     <hr />
                     <div class="row">
                       <div class="col-sm-3">
                         <p class="mb-0">درباره خود</p>
                       </div>
                       <div class="col-sm-9">
                         <CKEditor
                           onChange={(e) => setAbout(e.editor.getData())}
                           name={about}
                         />
                         {/* <
                           type="text"
                           placeholder="مثال (تجربه 3 سال برنامه نویسی وب و موبایل با بهینه ترین کد و طراحی تمامی سایت ها با رعایت اصول seo و کاملا واکنشگرا برای تمام دستگاه ها"
                           value={about}
                           onChange={(e) => setAbout(e.target.value)}
                           className="w-100 form-control"
                         /> */}
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-12 text-center">
                   <button
                     className="btn btn-primary"
                     onClick={handleUpdateUser}
                   >
                     ویرایش اطلاعات
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </section>
       ) : (
         <Error404 />
       )}
     </>) : (<div className="cliploader">
           <small className="fontandsize">درحال انجام عملیات مورد نظر</small>
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

export default UserProfileDash;
