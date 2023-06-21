import axios from "axios";
import { CKEditor } from "ckeditor4-react";
import { useContext, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet";
import Error404 from "../errors/404";
import { UnameIdContext } from "../context/UnameId";
import { Link, useNavigate } from "react-router-dom";
import { postSchema } from "../secure/postSchema";
import { toast } from "react-hot-toast";
import { usersRoute } from "../utils/routes";
import { ClipLoader } from "react-spinners";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }
  

const AddNewCourse = () => {


      //* Post Detail
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("public");
  const [work_kind, setWork_kind] = useState();
  const [work_to, setWorkTo] = useState();
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();
  const [describeVideo, setDescribeVideo] = useState();
  const [price, setPrice] = useState();
  const [language, setLanguage] = useState();
  const [time, setTime] = useState();
  const [category, setCategory] = useState();
  const [progress, setProgress] = useState();
  const [postLevel, setPostLevel] = useState();
  const [userD, setUserD] = useContext(UnameIdContext);

    console.log('selectedFile', describeVideo);
    
    const navigate = useNavigate()

    const [user, setUser] = useState()

      //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);

   //* Get LocalStorage Data
   useEffect(() => {
    const localStorageGeter = async () => {
      const userGeter = localStorage.getItem("user");
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      const findedUser = userAll.find((item) => item._id === userGeter);
      setUserD(findedUser);
      setLoading(false)
    };
    localStorageGeter();
  }, []);



  //* Get Data
    // useEffect(() => {
    //     const getUsers = async () => {
    //       axios.post(usersRoute, {}, config).then(result => {
    //         setUser(result.data.fullname)
    //         setServerError(result.data.message);
    //         setSUC(result.data.messageSUC);
    //         console.log(result);
    //       })
    //     }
    //     getUsers();
    //   }, [])

        //? Get And Set User
  useEffect(() => {
    // getData(); 
    try {
      const localStorageGeter = async () => {
        const userGeter = localStorage.getItem("user");
        const users = await axios.get(usersRoute); 
        const userAll = [...users.data];
        const findedUser = userAll.find((item) => item._id === userGeter);
        setUser(findedUser);
        // setType(findedUser.userType);
      };
      localStorageGeter();
    } catch (error) {
      console.log(error);
    }
    if (user) {
      setUserId(user._id);
    } else {
    }
  }, []);

  
  //* lodaer Spinner
  const [loading, setLoading] = useState(true);


      const handleCreate = async (e) => {
        setLoading(true)
        e.preventDefault();
try {
  
  await postSchema.validate({
    name,
    description,
    status,
    work_kind,
    work_to,
    image,
    price,
    language,
    time,
    category,
    progress,
    postLevel
  }, {abortEarly: false})


  const formData = new FormData();
  formData.append("file", image);
  const img = formData.get("file");
  console.log(formData.get("file"), img);
  axios.post("https://el-mcqy.onrender.com/upload-image", {
  name,
  description,
  status,
  work_kind,
  work_to,
  recaptchaValue,
  price,
  language,
  time,
  category,
  progress,
  postLevel,
  userD: userD.fullname,
  userId: userD._id,
  textImage: img,
  }, { headers: { "Content-Type": "multipart/form-data" } }).then(result => {
    console.log(result);
    setServerError(result.data.message)
    if(result.data.messageSUC){
      if(result.data.message){
        setServerError(result.data.message)
        setLoading(false)
      }else{
        navigate("/dashboard");
        toast.success("دوره جدید با موفقیت ثبت شد");
        setLoading(false)
      }
    }else{
      setLoading(true)
    }
  })
} catch (error) {
  setError(error.inner)
  setLoading(false)
}
      }

        //* Set Captcha
  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };

  console.log(userD);

    return(
      <>
      {!loading ? ( <>
       <Helmet>
         <title>دوره جدید | علم آموزان</title>
       </Helmet>
         {user ? (
           user.isAdmin == "true" ? (<>
             <div class="container addpost my-4">
               <div class="row">
                 <div class="col-md-8 col-md-offset-2">
                   <div className="card add-new-post-card">
                     <div className="card-body">
                       <h2 className="my-4">ساخت دوره جدید</h2>
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
   
                       <form
                         action="/dashboard/add-post"
                         method="POST"
                         onSubmit={handleCreate}
                       >
                         {/* <div>
                           {allatma ? (<div className="text-center my-5">
                             <button className="btn-allatma" onClick={() => setAllatma(!allatma)}>احراز هویت</button>
                           </div>) : (null)}
                           </div> */}
                         <div class="form-group has-error">
                           <label for="slug">نام</label>
                           <input
                             type="text"
                             class="form-control"
                             name="name"
                             placeholder="نام دوره جدید خود را وارد کنید"
                             onChange={(e) => setName(e.target.value)}
                           />
                         </div>
                         <div className="text-left">
                         <label htmlFor="postImg">عکس دوره</label>
                         </div>
                         <div className="input-group">
                           <div className="input-group-prepend">
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
                             عکس مورد نظر را انتخاب کنید
                           </label>
                         </div>
                         <img
                           src={image ? { image } : null}
                           className="img-fluid"
                           alt=""
                         />
                         <div class="form-group has-error">
                           <label for="slug">وضعیت</label>
                           <select
                             name="status"
                             id="status"
                             className="form-control"
                             onChange={(e) => setStatus(e.target.value)}
                           >
                             <option value="public">عمومی</option>
                             <option value="private">خصوصی</option>
                           </select>
                         </div>


   
                         <div class="form-group has-error">
                           <label for="description">توضیحات</label>
                           <CKEditor
                             onChange={(e) => setDescription(e.editor.getData())}
                             name={description}
                           />
                           {/* <textarea rows="5" class="form-control" name="description" placeholder="درباره پست خود توضیح دهید (لطفا بیشتر از 50 کاراکتر باشد)" onChange={(e) => setDescription(e.target.value)}></textarea> */}
                         </div>
   
                         <div class="form-group has-error">
                           <label for="work_kind">زبان دوره</label>
                           <select
                             name="work_kind"
                             id="work_kind"
                             className="form-control"
                             onChange={(e) => setWork_kind(e.target.value)}
                           >
                             <option value="persian">فارسی</option>
                             <option value="english">انگلیسی</option>
                           </select>
                         </div>
                         <div class="form-group has-error">
                           <label for="work_to">نوع دوره</label>
                           <select
                             name="work_to"
                             id="work_to"
                             className="form-control"
                             onChange={(e) => setWorkTo(e.target.value)}
                           >
                             <option value="online">آنلاین</option>
                             <option value="in-person">حضوری</option>
                           </select>
                         </div>

                         <div class="form-group has-error">
                           <label for="slug">هزینه دوره</label>
                           <input
                             type="text"
                             class="form-control"
                             name="price"
                             placeholder="قیمت دوره خود را وارد کنید (تومان)"
                             onChange={(e) => setPrice(e.target.value)}
                           />
                         </div>
                         <div class="form-group has-error">
                           <label for="slug">زبان دوره</label>
                           <input
                             type="text"
                             class="form-control"
                             name="language"
                             placeholder="زبان دوره خود را وارد کنید. مثال فارسی"
                             onChange={(e) => setLanguage(e.target.value)}
                           />
                         </div>
                         <div class="form-group has-error">
                           <label for="slug">زمان دوره</label>
                           <input
                             type="text"
                             class="form-control"
                             name="time"
                             placeholder="تخمین حدودی زمان دوره خود را وارد کنید. مثال 4 ساعت و 20 دقیقه"
                             onChange={(e) => setTime(e.target.value)}
                           />
                         </div>
                         <div class="form-group has-error">
                           <label for="slug">حوزه فعالیتی دوره</label>
                           <input
                             type="text"
                             class="form-control"
                             name="category"
                             placeholder="نوع پست و یا حوزه فعالیت پست خود را وارد کنید"
                             onChange={(e) => setCategory(e.target.value)}
                           />
                         </div>
                         <div class="form-group has-error">
                           <label for="slug">درصد پیشرفت دوره</label>
                           <input
                             type="text"
                             class="form-control"
                             name="progress"
                             value={progress}
                             placeholder="دروه چند درصد پیشرفت کرده است؟"
                             onChange={(e) => setProgress(e.target.value)}
                           />
                         </div>
                         <div class="form-group has-error">
                           <label for="slug">سطح دوره</label>
                           <input
                             type="text"
                             class="form-control"
                             name="postLevel"
                             value={postLevel}
                             placeholder="سطح دوره؟ (متوسط, مبتدی, پیشرفته)"
                             onChange={(e) => setPostLevel(e.target.value)}
                           />
                         </div>
                         {/* <div className="input-group">
                           <div className="input-group-prepend">
                           </div>
                           <div className="custom-file">
                             <input
                               type="file"
                               onChange={onChangeHandler}
                               className="custom-file-input"
                               id="selectedImage"
                             />
                           </div>
                           <label
                             htmlFor="selectedImage"
                             className="custom-file-label"
                             id="image-Status"
                           >
                            ویدیو معرفی دوره خود را آپلود کنید
                           </label>
                         </div> */}
   
                         <div className="text-center justify-content-center my-3">
                           <ReCAPTCHA
                             sitekey={SITE_KEY}
                             onChange={onChange}
                             ref={captchaRef}
                           />
                         </div>
   
                         <div class="form-group">
                           <button
                             type="submit"
                             class="btn btn-primary mx-2"
                             onClick={handleCreate}
                           >
                             ثبت
                           </button>
                           <Link to="/dashboard"><button class="btn btn-warning mx-2">انصراف</button></Link>
                         </div>
                       </form>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </>) : (<Error404 />)
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
    )
}

export default AddNewCourse;