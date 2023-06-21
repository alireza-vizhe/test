import { useContext, useEffect, useRef, useState } from "react";
import { CKEditor } from "ckeditor4-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet";
import Error404 from "../errors/404";
import { UnameIdContext } from "../context/UnameId";
import { editPostRoute, singlePost, uploadVideoRoute } from "../utils/routes";
import { editPostSchema } from "../secure/editPostSchema";
import { v4 as uuidv4 } from "uuid";
import { ClipLoader } from "react-spinners";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const EditCourse = () => {
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
  const [progress, setProgress] = useState();
  const [category, setCategory] = useState();
  const [ended, setEnded] = useState();
  const [postLevel, setPostLevel] = useState();
  const [suqqestion, setSuqqestion] = useState();

  // const [videoName, setVideoName] = useState();
  // const [url, setUrl] = useState();
  // const [number, setNumber] = useState();
  // const [videoTime, setVideoTime] = useState();
  // const [selling, setSelling] = useState(true);

  const [userD, setUserD] = useContext(UnameIdContext);

  //TODO Exam Questions
  const [examLink, setExamLink] = useState([])

  //! Navigation
  const navigate = useNavigate();

  //* user Posts Storage
  const [userPost, setUserPost] = useState([]);

  //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);

  //? Errors
  const [errors, setErrors] = useState();
  const [postErr, setPostErr] = useState();

  //* Get User Id From Params
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      await axios.get(singlePost + id).then((result) => {
        console.log(result);
        setName(result.data.name);
        setDescription(result.data.description);
        setWorkTo(result.data.work_to);
        setWork_kind(result.data.work_kind);
        setImage(result.data.image);
        setPrice(result.data.price);
        setStatus(result.data.status);
        setLanguage(result.data.language);
        setTime(result.data.time);
        setCategory(result.data.category);
        setProgress(result.data.progress);
        setExamLink(result.data.examLink);
        setPostLevel(result.data.postLevel);
        setSuqqestion(result.data.suqqestion);
        setLoading(false)
      });
    };
    getData();
  }, []);

  //? Reacapcha
  const [recaptchaValue, setReacaptchaValue] = useState();
  const captchaRef = useRef();

  const onChange = (value) => {
    setReacaptchaValue(value);
  };
  console.log(ended);

  
    //* lodaer Spinner
    const [loading, setLoading] = useState(true);


  const editPost = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      await editPostSchema.validate({
        name,
        description,
        status,
        work_kind,
        work_to,
        price,
        language,
        time,
        category,
        progress,
        postLevel
      }, {abortEarly: false})
      
      await axios
      .patch(
        editPostRoute + id,
        {
          name,
          status,
          description,
          price,
          work_kind,
          work_to,
          image,
          progress,
          ended,
          examLink,
          recaptchaValue,
          postLevel,
          suqqestion
        },
        config
      )
      .then((result) => {
        console.log(result);
        if(result.data.ok === 1 || result.status == 200){
          if(result.data.message){
            setServerError(result.data.message)
            setLoading(false)

          }else{
            navigate("/dashboard");
            toast.success("دوره مورد نظر با موفقیت ویرایش شد");
            setLoading(false)
          }
        }else{
          setLoading(true)
        }
      });
    } catch (error) {
      setError(error.inner)
      setLoading(false)
    }
  };

  // const uploadVideoHandler = async () => {
  //   try {
  //     await axios.post(uploadVideoRoute, {courseId: id, videoName, videoTime, number, url, selling});
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
    {!loading ? ( <>
       {userD ? (
         userD.isAdmin == "true" ? (<>
           <Helmet>
             <title>ویرایش پست | علم آموزان</title>
           </Helmet>
           <div class="container addpost my-4">
             <div class="row">
               <div class="col-md-8 col-md-offset-2">
                 <div className="card add-new-post-card">
                   <div className="card-body">
                     <h2 className="my-4">ویرایش دوره </h2>
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
 
                     <form method="POST" onSubmit={editPost}>
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
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                         />
                       </div>
                       <div className="text-left">
                         <label htmlFor="postImg">عکس دوره</label>
                       </div>
                       <div className="input-group">
                         <div className="input-group-prepend"></div>
                         <div className="custom-file">
                           <input
                             type="file"
                             onChange={(e) => setImage(e.target.files[0])}
                             className="custom-file-input"
                             id="selectedImage"
                             value={image}
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
                           value={status}
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
                           value={work_kind}
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
                           value={work_to}
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
                           placeholder="قیمت دوره خود را وارد کنید"
                           onChange={(e) => setPrice(e.target.value)}
                           value={price}
                         />
                       </div>
                       <div class="form-group has-error">
                             <label for="slug">زبان دوره</label>
                             <input
                               type="text"
                               class="form-control"
                               name="language"
                               value={language}
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
                               value={time}
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
                               value={category}
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
                         <label for="work_to">دوره به اتمام رسیده است؟</label>
                         <select
                           name="work_to"
                           id="work_to"
                           className="form-control"
                           onChange={(e) => setEnded(e.target.value)}
                           value={ended}
                         >
                           <option value="false">خیر</option>
                           <option value="true">بله</option>
                         </select>
                       </div>
                       <div class="form-group has-error">
                             <label for="slug">لینک صفحه آزمون</label>
                             <input
                               type="text"
                               class="form-control"
                               name="progress"
                               value={examLink}
                               placeholder="لینک صفحه آزمون این دوره را جای گذاری کنید"
                               onChange={(e) => setExamLink(e.target.value)}
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
                           <div class="form-group has-error">
                             <label for="slug">میزان تخفیف دوره</label>
                             <input
                                   type="text"
                                   className="form-control"
                                   placeholder="مثال (200) . با درصد محاصبه نمی شود!"
                                   value={suqqestion}
                                   onChange={(e) => setSuqqestion(e.target.value)}
                                 />
                           </div>
             
 
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
                           onClick={editPost}
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
  );
};

export default EditCourse;
