import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";

interface IProps {
  otpRefs: RefObject<HTMLInputElement>[];
  otp: string[];
  setOtp: Dispatch<SetStateAction<string[]>>;
}

const useOTPInput = ({ otp, setOtp, otpRefs }: IProps) => {
  const handleChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const fieldValue = /^[0-9]{1,1}$/.test(event.target.value)
      ? event.target.value
      : "";
    const updatedOtp = [...otp];
    updatedOtp[index] = fieldValue;
    setOtp(updatedOtp);

    if (fieldValue !== "") {
      const next = otpRefs[index].current
        ?.nextElementSibling as HTMLInputElement;
      if (next && next.tagName === "INPUT") {
        next.focus();
        setTimeout(() => next.select(), 0);
      }
    }
  };

  return { handleChangeInput };
};

export default useOTPInput;
