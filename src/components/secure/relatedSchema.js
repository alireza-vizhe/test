import * as Yup from "yup";

export const relatedSchema = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل معتبر نمیباشد")
    .required("ایمیل الزامی میباشد"),
    fullname: Yup.string().required("نام الزامی می باشد").min(4).max(50)
});