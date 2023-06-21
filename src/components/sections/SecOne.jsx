
import "../styles/style.css";
import "../styles/responsive.css"

const SecOne = () => {
    return(
        <section className="pt-3">
            <div className="container my-5">
                <div className="row">
                    <div className="container Sec-one-boxs bg-white my-3">
                        <div className="row img-sec-one-parent">
                        <div className="col-md-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/544/544578.png" className="sec-one-img" alt="" />
                        </div>
                        <div className="col-md-8">
                            <a href="https://elmamouzan.ir/بازاریابی%20مجازی" className="text-dark"><h5 className="my-3">چطوری سایت خود را به صفحه اول گوگل برسانیم؟</h5></a>
                            <p className="text-secondary">با استفاده از تکنیک دوره های علم آموزان و با رعایت بعضی از <a href="https://elmamouzan.ir/بازاریابی%20مجازی" className="text-secondary font-weight-bold">قانون های گوگل</a> قادر رسیدن به صفحه اول گوگل هستیم! </p>
                        </div>
                        </div>
                    </div>
                    <div className="container Sec-one-boxs bg-white my-3">
                        <div className="row img-sec-one-parent">
                        <div className="col-md-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/2210/2210153.png" className="sec-one-img" alt="" />
                        </div>
                        <div className="col-md-8">
                            <h5>میدونستی وب سایت باعث پیشرفت 40 درصدی بیزینست میشه؟</h5>
                            <p className="text-secondary mt-3">وب سایت خودت رو راه اندازی کن و بیزینستو بیار بالا تا بیشتر دیده بشی!</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecOne;