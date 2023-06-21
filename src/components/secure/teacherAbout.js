import * as Yup from "yup";

export const teacherAbout = Yup.object().shape({
  about: Yup.string().min(31, "حداقل باید 31 کاراکتر درباره خود شرح دهید").max(1000, "شرح درباره خود نباید بیشتر از 1000 کاراکتر باشد")
});
