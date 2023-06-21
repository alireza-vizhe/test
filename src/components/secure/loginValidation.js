import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل معتبر نمیباشد")
    .required("ایمیل الزامی میباشد"),
  password: Yup.string().required("پسورد الزامی میباشد")
    .min(8, "پسورد شما نباید کمتر از 8 کاراکتر باشد")
    .max(100, "پسورد شما نباید کمتر از 8 کاراکتر باشد"),
});