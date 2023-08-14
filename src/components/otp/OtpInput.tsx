/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../store/reducers/authSlic";
import { useNavigate } from "react-router-dom";

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
  setOtpLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setShowOtpModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OtpInput({
  value,
  valueLength,
  onChange,
  setOtpLoading,
  setValue,
  setShowOtpModal,
}: Props) {
  const userId = useSelector((state: any) => state.auth.user.id);
  const base_url = 'https://tes-hms.onrender.com/api/v1/Tes-HMS'

  const RE_DIGIT = new RegExp(/^\d+$/);

  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };
  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || targetValue !== "") {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    // keep focusing back until previous input
    // element has value
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const verifyEmail = async () => {
    setOtpLoading(true);
    try {
      const res = await axios.post(`${base_url}/auth/verify-email`, {
        userId,
        otp: value,
      });
      setOtpLoading(false);
      dispatch(verify(res?.data?.data?.isVerified));
      setValue("");
      setShowOtpModal(false);
      navigate('/')
    } catch (error) {
      setOtpLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    value.length === 4 && verifyEmail();
  }, [value]);

  return (
    <div className="otp-group">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="otp-input"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
}
