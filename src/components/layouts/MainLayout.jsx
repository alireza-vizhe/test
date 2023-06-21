import { Routes , Route} from "react-router-dom";
import Header from "../main/Header";
import Navbar from "../main/Navbar";
import TopNav from "../main/TopNav";
import Register from "../forms/Register";
import Login from "../forms/Login";
import Dahsboard from "../dashboard/dashboard";
import Error404 from "../errors/404";
import { useLocation } from "react-router-dom";
import AddNewCourse from "../course/AddNewCourse";
import UploadCourseVideo from "../course/UploadCourseVideo";
import SingleCourse from "../course/SingleCourse";
import UserProfileDash from "../sections/UserProfleDash";
import EditCourse from "../course/EditCourse";
import CoursesArchive from "../archives/CoursesArchive";
import Footer from "../main/Footer";
import AboutUs from "../sections/AboutUs";
import ContactUs from "../sections/ContactUs";
import Teachers from "../sections/Teachers";
import ForgetPassword from "../forms/ForgetPassword";
import ResetPassword from "../forms/ResetPassword";
import ArchiveBlogs from "../archives/ArchiveBlogs";
import BuyCard from "../sections/BuyCard";
import { useContext, useEffect, useState } from "react";
import { UnameIdContext } from "../context/UnameId";
import SingleTeacher from "../sections/SingleTeacher";
import HiringTeacher from "../sections/HiringTeacher";
import CategoryCourse from "../sections/CateforyCourse";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import CourseQuestions from "../sections/CourseQuestions";
import SingleQuestion from "../sections/SingleQuestion";
import ExamPage from "../exam/ExamPage";
import SuccessPay from "../sections/SuccessPay";
import WrongPay from "../sections/WrongPay";
import PaymentProfesseors from "../sections/PaymentProfesseors";
import UsersSolutions from "../sections/UsersSolutions";
import EditUser from "../sections/EditUser";
import SuqqestionsCourse from "../sections/SuqqestionsCourse";
import Article from "../sections/Article";
import EditArticle from "../sections/EditArticle";
import ArticleWriting from "../sections/ArticleWriting";

const MainLayout = () => {

    const location = useLocation()

    const [userD, setUserD] = useContext(UnameIdContext);

    
  //* lodaer Spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const localStorageGeter = async () => {
        const userGeter = localStorage.getItem("user");
        const users = await axios.get("https://el-mcqy.onrender.com/users");
        const userAll = [...users.data];
        const findedUser = userAll.find((item) => item._id === userGeter);
        setUserD(findedUser)
        setLoading(false)
      };
      localStorageGeter();
    } catch (error) {
      console.log(error);
    }
    if(userD){

    }else{
      
    }
  }, []);

    return(
        <>
        {location.pathname === "/dashboard" ? null : <TopNav/>}
        {location.pathname === "/dashboard" ? null : <Navbar />}
       {!loading ? ( <Routes>
            <Route path="/" element={<Header/>}/>
            <Route path="/register-users" element={<Register/>}/>
            <Route path="/login-users" element={<Login/>}/>
            <Route path="/dashboard" element={<Dahsboard/>}/>
            <Route path="*" element={<Error404/>}/>
            <Route path="/add-new-course" element={<AddNewCourse/>}/>
            <Route path="/add-new-video" element={<UploadCourseVideo/>}/>
            <Route path="/course/:id" element={<SingleCourse/>}/>
            <Route path="/edit-course/:id" element={<EditCourse/>}/>
            <Route path="/dashboard-user/:id" element={<UserProfileDash/>}/>
            <Route path="/all-courses" element={<CoursesArchive/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/contact-us" element={<ContactUs/>}/>
            <Route path="/teachers" element={<Teachers/>}/>
            <Route path="forget-password" element={<ForgetPassword/>}/>
            <Route path="/reset-password/:id" element={<ResetPassword/>}/>
            <Route path="/archive-blog" element={<ArchiveBlogs/> }/>
            {userD ? (<Route path="/buy-card" element={<BuyCard/>}/>) : (<Route path="*" element={<Error404/>}/>)}
            <Route path="/user-profile" element={<UserProfileDash/>}/>
            <Route path="/teacher/:id" element={<SingleTeacher/>}/>
            <Route path="/teacher-hire" element={<HiringTeacher/>}/>
            <Route path="/coursecategory/:id" element={<CategoryCourse/>}/>
            <Route path="/question/:id" element={<SingleQuestion/>}/>
            <Route path="/coursequestions/:id" element={<CourseQuestions/>}/>
            <Route path="/exam-course-/:id" element={<ExamPage/>}/>
            <Route path="/success-pay" element={<SuccessPay/>}/>
            <Route path="/wrong-pay" element={<WrongPay/>}/>
            <Route path="/payment-professeors" element={<PaymentProfesseors/>}/>
            <Route path="/users-solutions" element={<UsersSolutions/>}/>
            <Route path="/update-user/:id" element={<EditUser/>}/>
            <Route path="/suggestions-course" element={<SuqqestionsCourse/>}/>
            <Route path="/write-articles" element={<ArticleWriting/>}/>
            <Route path="/edit-article/:id" element={<EditArticle/>}/>
            <Route path="/article/:id" element={<Article/>}/>
        </Routes>) : (<div className="cliploader"><ClipLoader
          color="#333"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /></div>)}
        <Footer/>
        </>
    )
}

export default MainLayout;