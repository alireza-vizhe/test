import * as Yup from "yup";

export const questionSchema = Yup.object().shape({
  email: Yup.string()
    .email("ایمیل معتبر نمیباشد")
    .required("ایمیل الزامی میباشد"),
  fullname: Yup.string()
    .required("نام الزامی میباشد")
    .min(4, "نام شما نباید کمتر از 4 کاراکتر باشد")
    .max(100, "نام شما نباید کمتر از 4 کاراکتر باشد"),
  question: Yup.string()
    .required("متن پیام شما الزامی می باشد")
    .min(10, "متن پیام شما حداقل باید 10 کاراکتر باشد")
    .max(1000, "متن پیام شما حداکثر باید 1000 کاراکتر باشد"),
    questionTitle: Yup.string()
    .required("عنوان سوال شما الزامی می باشد")
    .min(5, "حداقل عنوان سوال شما باید 5 کاراکتر باشد")
    .max(1000, "حداکثر متن سوال شما باید 1000 کاراکتر باشد"),
});
