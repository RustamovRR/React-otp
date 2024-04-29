import { KeyboardEvent, RefObject } from "react";

interface IProps {
  otpRefs: RefObject<HTMLInputElement>[];
}

const useOTPKeyboard = ({ otpRefs }: IProps) => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      event.currentTarget.value.length === 0
    ) {
      const previous = otpRefs[index].current
        ?.previousElementSibling as HTMLInputElement;
      if (previous && previous.tagName === "INPUT") {
        previous.focus();
      }
    } else if (event.key === "ArrowLeft") {
      const previous = otpRefs[index].current
        ?.previousElementSibling as HTMLInputElement;
      if (previous && previous.tagName === "INPUT") {
        previous.focus();
        setTimeout(() => previous.select(), 0);
      }
    } else if (event.key === "ArrowRight") {
      const next = otpRefs[index].current
        ?.nextElementSibling as HTMLInputElement;
      if (next && next.tagName === "INPUT") {
        next.focus();
        setTimeout(() => next.select(), 0);
      }
    }
  };

  return { handleKeyDown };
};

export default useOTPKeyboard;
