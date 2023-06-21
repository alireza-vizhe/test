import axios from "axios";
import { CKEditor } from "ckeditor4-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersRoute, writeArticleRoute } from "../utils/routes";
import { UnameIdContext } from "../context/UnameId";
import { result } from "lodash";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import Error404 from "../errors/404";
import { writeArticleSchema } from "../secure/writeArticleSchema";

const ArticleWriting = () => {
  const [articleName, setArticleName] = useState();
  const [articleContent, setArticleContent] = useState();
  const [status, setStatus] = useState("public");
  const [image, setImage] = useState();

  const [userD, setUserD] = useContext(UnameIdContext);

        //! Messages
        const [error, setError] = useState([]);
        const [SUC, setSUC] = useState([]);
        const [serverError, setServerError] = useState([]);

          //* lodaer Spinner
  const [loading, setLoading] = useState(true);

      

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

  const navigate = useNavigate();

  const handleArticle = async () => {
    setLoading(true)
    
    const formData = new FormData();
  formData.append("file", image);
  const img = formData.get("file");
  console.log(formData.get("file"), img);
    try {
      await writeArticleSchema.validate({
        articleName,
        articleContent,
        image,
        status
      }, {abortEarly: false})
      await axios.post("https://el-mcqy.onrender.com/upload-image-article", {
        articleName,
        articleContent,
        writerName: userD.fullname,
        writterId: userD._id,
        status,
        textImage: img,
      }, { headers: { "Content-Type": "multipart/form-data" } }).then(result => {
        console.log(result);
        if(result.data.messageSUC){
            if(result.data.message){
              setServerError(result.data.message)
              setLoading(false)
            }else{
              navigate("/dashboard")
              toast.success(result.data.messageSUC);
              setLoading(false)
            }
          }else{
            setLoading(true)
          }
      })
    } catch (error) {
        console.log(error);
        setError(error.inner)
        setLoading(false)
    }
  };

  return (
    <>
    {!loading ? (<>
    {userD  ? (userD.isAdmin == "true" ? (<section>
      <div className="container">
        <div className="row my-5">
          <div className="shape mt-3"></div>
          <div className="shape-two"></div>
          <div className="col-md-6 sec-two-texts text-left">
            <h4>
              <span className="text-white">بخش</span>
              <a href="https://elmamouzan.ir/all-courses" className="text-dark">
                مقاله نویسی
              </a>
            </h4>
            <h5>بهترین سرمایه گذاری سرمایه گذاری روی خود است...</h5>
          </div>
          <div className="col-md-6 my-4">
            <Link to="/archive-blog">
              <button className="btn-nav">مقاله ها</button>
            </Link>
          </div>
          <div className="col-md-12 questionsFont">
            <div className="card">
              <div className="card-body text-center">
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
                <div class="form-group has-error text-left">
                  <label for="slug">نام مقاله</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="نام مقاله خود را وارد کنید"
                    onChange={(e) => setArticleName(e.target.value)}
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
                <div class="form-group has-error text-left">
                  <label for="description">محتوای مقاله</label>
                  <CKEditor
                    onChange={(e) => setArticleContent(e.editor.getData())}
                    name={articleContent}
                  />
                  {/* <textarea rows="5" class="form-control" name="description" placeholder="درباره پست خود توضیح دهید (لطفا بیشتر از 50 کاراکتر باشد)" onChange={(e) => setDescription(e.target.value)}></textarea> */}
                </div>
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
            <button onClick={handleArticle} className="btn btn-success">ثبت مقاله</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>) : (<Error404/>)) : (<Error404/>)}
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

export default ArticleWriting;
