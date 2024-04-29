import { ClipboardEvent, Dispatch, RefObject, SetStateAction } from "react";

interface IProps {
  inputNumbers: number;
  otpRefs: RefObject<HTMLInputElement>[];
  setOtp: Dispatch<SetStateAction<string[]>>;
}

const useOTPPaste = ({ otpRefs, inputNumbers, setOtp }: IProps) => {
  const handlePaste = (
    event: ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text/plain");

    if (/^\d{6}$/.test(pastedText)) {
      const updatedOtp = pastedText.split("").slice(0, inputNumbers);
      setOtp(updatedOtp);

      const nextIndex = Math.min(index + updatedOtp.length, inputNumbers - 1);
      const next = otpRefs[nextIndex].current as HTMLInputElement;
      if (next) {
        next.focus();
        setTimeout(() => next.select(), 0);
      }
    } else {
      otpRefs.forEach((ref) => {
        if (ref.current) {
          ref.current.classList.add("shake-animation");
          setTimeout(
            () => ref.current?.classList.remove("shake-animation"),
            500
          );
        }
      });
    }
  };

  return { handlePaste };
};

export default useOTPPaste;
