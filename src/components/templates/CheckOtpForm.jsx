import { checkOtp } from "../../services/auth";
import { getProfile } from "../../services/user";
import { getCookie, setCookie } from "../../utils/cookie";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import styles from "./CheckOtp.module.css";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Access Token:", getCookie("accessToken"));
    if (code.length !== 5) return;
    const { response, error } = await checkOtp(code, mobile);
    console.log({ response });
    if (response) {
      console.log("Tokens received:", response.data);
      setCookie(response.data);

      navigate("/");
      refetch();
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form onClick={submitHandler} className={styles.form}>
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
