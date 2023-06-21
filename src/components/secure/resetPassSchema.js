import * as Yup from "yup";

export const resetPassSchema = Yup.object().shape({
  password: Yup.string()
    .required("پسورد الزامی میباشد").min(8).max(100),
    confirmPassword: Yup.string().required("تکرار پسورد الزامی میباشد").min(8).max(100)
});