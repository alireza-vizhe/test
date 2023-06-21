import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingelCourseRoute } from "../utils/routes";

const ExamPage = () => {

    const {id} = useParams();

      //* Set Course Detail
  const [course, setCourse] = useState();

  console.log(id);
  useEffect(() => {
    const getCourseData = async () => {
      await axios.get(getSingelCourseRoute + id).then((result) => {
        setCourse([result.data]);
        console.log(result);
      });
    };
    getCourseData();
  }, []);
  console.log(course);

  const [answer, setAnswer] = useState([]);

  console.log(typeof toString(answer));

  const showResult = () => {
course.map(item => (
        item.courseExam.filter(itemm => console.log(itemm.answer === toString(answer)))
      ));
  }


    return(
        <section>
            <div className="container questionsFont">
                <div className="row my-5">
                {course ? (
                    course.map((item, index) => (
                        item.courseExam.map((item, index) => (
                            <div className="col-md-3">
                                <div className="card">
                                    <Link to="/course"><div className="card-body">
                                        <h6>ورود به سوال: {index + 1}</h6>
                                    </div></Link>
                                </div>
                            </div>
                        ))
                    ))
                ) : (null)}
                </div>
                <button onClick={showResult}>نتیجه</button>
            </div>
        </section>
    )
}

export default ExamPage;

{/* <div className="row my-4">
                <div className="shape mt-3"></div>
              <div className="shape-two"></div>
                <div className="col-md-6 sec-two-texts text-left">
            <h4>آزمون دوره {item.name}</h4>
            <h5>بهترین سرمایه گذاری سرمایه گذاری روی خود است...</h5>
            </div>
            <div className="col-md-6 my-4">
                <Link to="/buy-card"><button className="btn-nav">سبد خرید</button></Link>
            </div>
                {item.courseExam.map(item => (
                    <div className="col-md-4 mt-5 text-left">
                        <div className="card">
                        <div className="card-body">
                            <h6>سوال: {item.question}</h6>
                            <div class="form-group has-error mt-5">
                        <label for="answer">جواب شما :</label>
                        <select
                          name="answer"
                          id="work_to"
                          className="form-control"
                          onChange={(e) => setAnswer([...answer, e.target.value])}
                        >
                          <option value="">پاسخ داده نشده</option>
                          <option value="0">خیر</option>
                          <option value="1">بله</option>
                        </select>
                      </div>
                      <button>تایید</button>
                        </div>
                    </div>
                    </div>
                ))}
                </div> */}