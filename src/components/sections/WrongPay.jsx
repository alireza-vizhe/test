import { Link } from "react-router-dom";

const WrongPay = () => {
    return(
        <>
        <div id="notfound" className="mx-3">
  <div class="notfound">
  <div class="notfound-404">
  <h1>پرداخت ناموفق</h1>
  </div>
  <h2>پرداخت شما با موفقیت انجام نشد, لطفا مجددا تلاش نمایید</h2>
  
  <Link to="/"><button className="btn-nav">برگرد به صفحه اصلی</button></Link>
  
  </div>
  </div>
      </>
    )
}

export default WrongPay;