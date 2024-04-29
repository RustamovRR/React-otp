import { useState, useEffect, useRef, FC, FormEvent } from "react";
import { useOTPInput, useOTPKeyboard, useOTPPaste } from "../../hooks";
import "./input.css";

type StatusesType = "idle" | "loading" | "error" | "success";

interface IProps {
  inputNumbers: number;
}

const InputOTP: FC<IProps> = ({ inputNumbers }) => {
  const [otp, setOtp] = useState<string[]>(Array(inputNumbers).fill(""));
  const [status, setStatus] = useState<StatusesType>("idle");
  const TEST_OTP_CODE = 123456;

  const otpRefs = [...Array(inputNumbers)]
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  useEffect(() => {
    if (otpRefs[0].current) {
      otpRefs[0].current.focus();
    }
  }, []);

  const { handleKeyDown } = useOTPKeyboard({ otpRefs });
  const { handlePaste } = useOTPPaste({ otpRefs, setOtp, inputNumbers });
  const { handleChangeInput } = useOTPInput({
    otp,
    setOtp,
    otpRefs,
  });

  const handleCheckOtp = (ms = 1000) => {
    const otpCode = Number(otp.join(""));
    return new Promise((resolve) => setTimeout(() => resolve(otpCode), ms));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("loading");
    const result = await handleCheckOtp();
    if (result === TEST_OTP_CODE) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const isSubmitButtonDisabled = otp.join("").length !== inputNumbers;

  return (
    <div className="wrapper">
      <div className="heading">
        <h2>OTP Verification</h2>
        <p>Please enter the code we have sent you.</p>
      </div>

      <section>
        {status === "success" ? (
          <h2>You verified successfully!</h2>
        ) : status === "error" ? (
          <h3>Something went wrong! Please refresh and check again!</h3>
        ) : (
          <form onSubmit={handleSubmit}>
            <div id="otp-container">
              {[...Array(inputNumbers)].map((_, index) => (
                <input
                  type="text"
                  key={index}
                  name={`otp${index}`}
                  maxLength={1}
                  ref={otpRefs[index]}
                  onChange={(event) => handleChangeInput(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  onPaste={(event) => handlePaste(event, index)}
                  value={otp[index]}
                  className="otp-number"
                />
              ))}
            </div>
            <button
              type="submit"
              value="Submit"
              disabled={isSubmitButtonDisabled || status === "loading"}
            >
              {status === "loading" ? "Checking..." : "Submit"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default InputOTP;
