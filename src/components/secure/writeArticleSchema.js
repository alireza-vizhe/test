import * as Yup from "yup";

export const writeArticleSchema = Yup.object().shape({
  articleName: Yup.string()
    .required("عنوان مقاله الزامی می باشد الزامی میباشد"),
    articleContent: Yup.string()
    .required("محتوای مقاله الزامی میباشد")
    .min(4, "محتوای شما نباید کمتر از 4 کاراکتر باشد"),
    image: Yup.string().required("عکس مقاله الزامی میباشد"),
    status: Yup.mixed().oneOf(
        ["private", "public"],
        "یکی از 2 وضعیت را انتخاب کنید"
      ),
});
