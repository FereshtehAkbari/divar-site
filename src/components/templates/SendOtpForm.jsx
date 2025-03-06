import { sendOtp } from "../../services/auth";
import styles from "./SendOtp.module.css";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (e) => {
    e.preventDefault();
    if (mobile.length !== 11) return;
    if (!/^09\d{9}$/.test(mobile)) return alert("شماره موبایل نامعتبره!");

    const { response, error } = await sendOtp(mobile);

    if (response) {
      console.log("Response is valid, moving to step 2");
      setStep(2);
    }
    if (error) {
      console.error("Error:", error);
    }
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید.کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
