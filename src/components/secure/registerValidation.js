import * as Yup from "yup";

export const registerValidator = Yup.object().shape({
  fullname: Yup.string()
    .required("نام و نام خانوادگی الزامی میباشد")
    .min(4, "نام کاربری نباید کمتر از 4 کاراکتر باشد"),
  email: Yup.string()
    .email("ایمیل معتبر نمیباشد")
    .required("ایمیل الزامی میباشد"),
  password: Yup.string().required("پسورد الزامی میباشد")
    .min(8, "پسورد شما نباید کمتر از 8 کاراکتر باشد")
    .max(100, "پسورد شما نباید کمتر از 8 کاراکتر باشد"),
  confirmPassword: Yup.string()
    .required("تکرار کلمه عبور الزامی میباشد")
    .oneOf([Yup.ref("password"), null], "کلمه های عبور یکسان نیستند"),
});