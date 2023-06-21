import { useContext, useEffect, useState } from "react";
import Error404 from "../errors/404"
import { UnameIdContext } from "../context/UnameId";
import axios from "axios";
import { CKEditor } from "ckeditor4-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editArticleRoute, getSingleArticleArticle, usersRoute, writeArticleRoute } from "../utils/routes";
import { result } from "lodash";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const EditArticle = () => {

    const [articleName, setArticleName] = useState();
    const [articleContent, setArticleContent] = useState();
    const [status, setStatus] = useState("public");
  
    const [userD, setUserD] = useContext(UnameIdContext);

    const {id} = useParams()

    useEffect(() => {
        const getArticle = async () => {
            await axios.post(getSingleArticleArticle + id).then(result => {
                console.log(result);
                setArticleName(result.data.articleName)
                setArticleContent(result.data.articleContent);
                setStatus(result.data.status);
            })
        }
        getArticle();
    } , [])

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

const editArticle = async () => {
  setLoading(true)
  try {
    await axios.post(editArticleRoute + id, {
      articleName,
      articleContent,
      writerName: userD.fullname,
      writterId: userD._id,
      status
    }).then(result => {
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
  }
};

    return(
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
                <Link to="/contact-us">
                  <button className="btn-nav">پشتیبانی</button>
                </Link>
              </div>
              <div className="col-md-12 questionsFont">
                <div className="card">
                  <div className="card-body text-center">
                    <h5>ویرایش مقاله</h5>
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
                        value={articleName}
                        placeholder="نام مقاله خود را وارد کنید"
                        onChange={(e) => setArticleName(e.target.value)}
                      />
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
                                  value={status}
                                  className="form-control"
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option value="public">عمومی</option>
                                  <option value="private">خصوصی</option>
                                </select>
                              </div>
                <button onClick={editArticle} className="btn btn-success">ویرایش مقاله</button>
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
    )
}

export default EditArticle