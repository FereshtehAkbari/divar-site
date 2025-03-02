import { checkOtp } from "../../services/auth";
import { getProfile } from "../../services/user";
import { setCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import styles from "./CheckOtp.module.css";
import { useQuery } from "@tanstack/react-query";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery({ queryKey: ["profile"], queryFn: getProfile });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(code, mobile);
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch(["profile"]);
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span>کد پیامک شده به شماره"{mobile}"را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        value={code}
        id="input"
        placeholder="کد تایید"
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
