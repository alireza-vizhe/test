import axios from "axios";
import { useEffect, useState } from "react";

function convertHMS(value) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
}

const UploadCourseVideo = () => {
  const [video, setVideo] = useState({ file: null, duration: 0, size: 0 });

  const onChangeHandler = (event) => {
    const file = event.target.files[0];
    new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function () {
        var aud = new Audio(reader.result);
        aud.onloadedmetadata = function () {
          resolve(convertHMS(aud.duration));
        };
      };
      reader.readAsDataURL(file);
    })
      .then((duration) => {
        setVideo({ file, duration, size: file?.size });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getPosts = async () => {
      axios.get("");
    };
  }, []);

  console.log(video);

  const uploadNewVideo = async () => {
    const formData2 = new FormData();
    formData2.append("inputFile", video.file);
    console.log(formData2.get("inputFile"));
    await axios.post("https://el-mcqy.onrender.com/upload-course-video", {
        video: formData2,
    }, { headers: { "Content-Type": "multipart/form-data" } });
  };

  return (
    <div>
      <div className="input-group">
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
                          </div>
      <button onClick={uploadNewVideo}>send</button>
    </div>
  );
};

export default UploadCourseVideo;
