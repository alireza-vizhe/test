import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { allCoursesRoute, usersRoute } from "../utils/routes";
import ReactHtmlParser from "react-html-parser";
import { UnameIdContext } from "../context/UnameId";
import SingleTeacher from "./SingleTeacher";
import shorten from "../utils/shorten";
import { ClipLoader } from "react-spinners/CircleLoader";
import { Helmet } from "react-helmet";

const Teachers = () => {

  const [teachers, setTeachers] = useState([]);
  const [userD, setUserD] = useContext(UnameIdContext);
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await axios.get(usersRoute).then(result => {
        console.log(result);
        const findTeacher = result.data.filter(item => item.teacher === "true");
        setTeachers(findTeacher)
      })
    }
    getUsers();
  }, [])

  
    //* Get LocalStorage Data
    useEffect(() => {
      const localStorageGeter = async () => {
        const userGeter = localStorage.getItem("user");
        const users = await axios.get(usersRoute);
        const userAll = [...users.data];
        console.log(users);
          const findedUser = userAll.find((item) => item._id === userGeter);
          setUserD(findedUser)
        };
        if (userD) {
          localStorageGeter();
        } else {
        }
      }, []);
  //  //* Get User Image
  //  useEffect(() => {
  //   const getImage = async () => {
  //     await axios.get("http://localhost:5000/images").then((result) => {
  //       console.log(result.data);
  //       setPhoto(result.data);
  //       console.log(photo);
  //     });
  //   };
  //   getImage();
  // }, []);

        //* lodaer Spinner
        const [loading, setLoading] = useState(true);

  //TODO Search Box
  const [showResult , setShowResult] = useState(false)
        
  const filterContent = (posts, searchTerm) => {
    const result = posts.filter((post) => post.fullname.includes(searchTerm));
    console.log(result);
    setTeachers(result.filter(item => item.teacher === "true"))
   }
  

   const inputRef = useRef()
   const handleTextSearch = async (e) => {
    const searchTerm = e.currentTarget.value;
    console.log(searchTerm);
    await axios.get(usersRoute).then(res => {
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


  return (
    <section>
       <Helmet>
            <title>{` مدرسین | علم آموزان `}</title>
          </Helmet>
      <div className="container my-5">
        <div className="row justify-content-center">
          
        <div className="shape-t mt-3"></div>
              <div className="shape-two-t"></div>
            <div className="col-md-4 sec-two-texts text-left ">
            <h4><span className="text-white">برخی</span><a href="https://elmamouzan.ir/teachers" className="text-dark">از اساتید علم آموزان</a></h4>
            <h5>بهترین سرمایه گذاری سرمایه گذاری روی خود است...</h5>
            </div>
            <div className="col-md-8 mt-3 mb-5">
            <div className="search-box-teachers w-100 text-center">
                    <h6>استاد مورد علاقه خودتو پیدا کن و یادگیری رو شروع کن!</h6>
                  <div class="input-group">
                  <input
                    type="text"
                    class="form-control bg-light border-0 small headerSearch"
                    placeholder="جستجوی اساتید ..."
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
                    </div>
            </div>
          {teachers ? (teachers.map(item => (            
            <div className="col-md-4 my-5">
            <div className="card teachers-card">
              <div className="card-body">
                <img
                  src={require("../image/logo2.jpeg")}
                  className="teacherImage"
                  alt=""
                />
                <h5>{item.fullname}</h5>
                <p>{item.expertise}</p>
                <p className="text-secondary">
                {item.about ? (ReactHtmlParser(shorten(item.about))) : (<p>درحال حاظر این استاد در مورد خود شرحی نداده است.</p>)}
                </p>
                <Link to={`/teacher/${item.fullname}`}><button className="btn-nav">رزومه</button></Link>
              </div>
            </div>
          </div>
          ))) : (<div className="cliploader"><ClipLoader
          color="#333"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /></div>)}
          
        </div>
      </div>
    </section>
  );
};

export default Teachers;
