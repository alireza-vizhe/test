import * as Yup from "yup";

export const editPostSchema = Yup.object().shape({
  name: Yup.string()
    .required("عنوان دوره الزامی هست")
    .min(5, "عنوان دوره نباید کمتر از 5 کاراکتر باشد")
    .max(100, "عنوان دوره نباید بیشتر از 100 کاراکتر باشد"),
  description: Yup.string().required("دوره جدید باید دارای محتوا باشد"),
  work_kind: Yup.mixed().oneOf(
    ["english", "persian"],
    "یکی از 2 نوع زبان را انتخاب کنید"
  ),
  work_to: Yup.mixed().oneOf(
    ["in-person", "online"],
    "یکی از 2 وضعیت کاری را انتخاب کنید"
  ),
  status: Yup.mixed().oneOf(
    ["private", "public"],
    "یکی از 2 وضعیت را انتخاب کنید"
  ),
  price: Yup.string().required("قیمت دوره باید وارد شده باشد"),
  language: Yup.string().required("باید زبان دوره خود را وارد کرده باشید"),
  time: Yup.string().required("باید زمان دوره خود را وارد کرده باشید"),
  category: Yup.string().required("نوع پست الزامی میباشد"),
  progress: Yup.string().required("درصد پیشرفت دوره الزامی می باشد"),
  postLevel: Yup.string().required("تایین سطح دوره الزامی می باشد"),
  // uploaded: Yup.mixed().oneOf([true], "باید عکس خود را بعد از انتخاب کردن آپلود کنید")
});
