import ReCAPTCHA from "react-google-recaptcha";
import Error404 from "../errors/404";
import { Helmet } from "react-helmet";
import { UnameIdContext } from "../context/UnameId";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editUserFromAdminRoute, usersRoute } from "../utils/routes";
import axios from "axios";
import { editPostSchema } from "../secure/editPostSchema";
import { CKEditor } from "ckeditor4-react";
import { ClipLoader } from "react-spinners";

const SITE_KEY = "6Ld3B44lAAAAANbDqX9Qng2WZkVjXYqDUm7SA83f";

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const EditUser = () => {

    const {id} = useParams();
    //! user Details
    const [isAdmin, setIsAdmin] = useState(false);
    const [teacher, setTeacher] = useState(false);
    const [fromUniversity, setFromUniversity] = useState(false)
    const [currentUser, setCurrentUser] = useState([])
    const [userD, setUserD] = useContext(UnameIdContext);

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

      //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      const users = await axios.get(usersRoute);
      const userAll = [...users.data];
      const findedUser = userAll.filter((item) => item._id == id);
      console.log(findedUser);
      setCurrentUser(findedUser);
      setIsAdmin(findedUser[0].isAdmin);
      setTeacher(findedUser[0].teacher)
      setFromUniversity(findedUser[0].fromUniversity)
      setLoading(false)
    };
    localStorageGeter();
  }, []);

  console.log(userD, currentUser);

    const navigate = useNavigate()

      //! Messages
  const [error, setError] = useState([]);
  const [SUC, setSUC] = useState([]);
  const [serverError, setServerError] = useState([]);

      //* lodaer Spinner
      const [loading, setLoading] = useState(true);


  const editPost = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {

        //!asasasas
    //   await editPostSchema.validate({
    //     isAdmin,
    //     teacher
    //   }, {abortEarly: false})
      
      await axios
      .post(
        editUserFromAdminRoute,
        {
            isAdmin,
            teacher,
            fromUniversity,
            id
        },
        config
      )
      .then((result) => {
        console.log(result);
        if(result.data.messageSUC){
          if(result.data.message){
            setServerError(result.data.message)
          }else{
            navigate("/users-solutions")
            toast.success(result.data.messageSUC)
            setLoading(false)
          }
        }else{
          setLoading(true)
        }
      });
    } catch (error) {
      setError(error.inner)
    }
  };

    //? Reacapcha
    const [recaptchaValue, setReacaptchaValue] = useState();
    const captchaRef = useRef();
  
    const onChange = (value) => {
      setReacaptchaValue(value);
    };

    return(
      <>
      {!loading ? (  <>
      {userD ? (
        userD.isAdmin == "true" ? (<>
          <Helmet>
            <title>ویرایش کاربر | علم آموزان</title>
          </Helmet>
          <div class="container addpost my-4">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div className="card add-new-post-card">
                  <div className="card-body">
                    <h2 className="my-4">ویرایش کاربر {currentUser.map(item => item.fullname)}</h2>
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
                        <label for="slug">وضعیت</label>
                        <select
                          name="status"
                          id="status"
                          className="form-control"
                          onChange={(e) => setIsAdmin(e.target.value)}
                          value={isAdmin}
                        >
                            <option value="nothing">انتخاب نشده</option>
                          <option value="true">ادمین</option>
                          <option value="false">عادی</option>
                        </select>
                      </div>
                      <div class="form-group has-error">
                        <label for="slug">مدرس</label>
                        <select
                          name="status"
                          id="status"
                          className="form-control"
                          onChange={(e) => setTeacher(e.target.value)}
                          value={teacher}
                        >
                          <option value="nothing">انتخاب نشده</option>
                          <option value="false">خیر</option>
                          <option value="true">بله</option>
                        </select>
                      </div>
                      <div class="form-group has-error">
                        <label for="slug">استاد دانشگاه</label>
                        <select
                          name="status"
                          id="status"
                          className="form-control"
                          onChange={(e) => setFromUniversity(e.target.value)}
                          value={fromUniversity}
                        >
                          <option value="nothing">انتخاب نشده</option>
                          <option value="false">خیر</option>
                          <option value="true">بله</option>
                        </select>
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
                        <Link to="/users-solutions"><button class="btn btn-warning mx-2">انصراف</button></Link>
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

export default EditUser;