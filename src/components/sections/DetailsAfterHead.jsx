import axios from "axios";
import { useEffect, useState } from "react";
import { allCoursesRoute, usersRoute } from "../utils/routes";

const DetailsAfterHead = () => {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);

  //* Get LocalStorage Data
  useEffect(() => {
    const localStorageGeter = async () => {
      // const userGeter = localStorage.getItem("user");
      await axios.get(usersRoute).then((result) => {
        console.log(result);
        const fu = result.data.filter((item) => item.teacher === "true");
        // console.log(fu);
        const uf = result.data.filter((item) => item.teacher == "false");
        setTeachers(fu);
        setUsers(uf);
      });
    };
    localStorageGeter();
  }, []);

  const [coursesAll, setCoursesAll] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      await axios.get(allCoursesRoute).then((result) => {
        setCoursesAll(result.data);
        // console.log(result);
      });
    };
    getAllCourses();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="row boxes-parent">
          <div className="col-3 nav-options-parent">
            <div className="card">
              <div className="card-body">
                <img
                  src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Business-Graduation-Cap-icon.png"
                  alt=""
                />
                <small className="d-block">{users.length} +</small>
                <small>دانشجو</small>
              </div>
            </div>
          </div>
          <div className="col-3 nav-options-parent">
            <div className="card">
              <div className="card-body">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2354/2354280.png"
                  alt=""
                />
                <small className="d-block">{teachers.length} +</small>
                <small>مدرس</small>
              </div>
            </div>
          </div>
          <div className="col-3 nav-options-parent">
            <div className="card">
              <div className="card-body">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4762/4762232.png"
                  alt=""
                />
                <small className="d-block">{coursesAll.length} +</small>
                <small>دوره</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsAfterHead;
