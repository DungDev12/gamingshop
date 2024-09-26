import React, { memo, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { logicPasswordRule } from "@routes/config/config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

interface InputComponentProps {
  title: string;
  name: string;
  type: string;
  valueGetter: string | undefined;
  onChangeReturn: (name: string, value: string) => void;
}
interface ErrorState {
  message: string;
  error: boolean;
}
const InputComponent: React.FC<InputComponentProps> = ({
  title,
  name,
  type,
  valueGetter,
  onChangeReturn,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    message: "",
    error: false,
  });
  const [animationError, setAnimationError] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = value;
    if (type == "number") {
      numericValue = value.replace(/[^0-9]/g, "");
    }
    onChangeReturn(name, numericValue);
    logicPassword(name, numericValue);
  };

  const handleInputPhone = (name: string, value: string) => {
    onChangeReturn(name, value);
    logicPassword(type, value);
  };

  const logicPassword = (type: string, value: string) => {
    const typeRule = logicPasswordRule.find((rule) => rule.type === type);
    if (!typeRule) return console.log("Rule not found");

    for (const rules of typeRule.rules) {
      if (rules.rule(value)) {
        setError({ message: rules.message, error: true });
        setAnimationError(true);
        setTimeout(() => {
          setAnimationError(false);
        }, 300);
        return;
      }
    }
    setError({ message: "", error: false });
  };

  console.log(valueGetter, name);

  return (
    <>
      {type == "phone" ? (
        <div>
          <PhoneInput
            specialLabel=""
            buttonStyle={{ paddingLeft: "20px" }}
            inputStyle={{
              paddingTop: "8px",
              paddingBottom: "8px",
              width: "90%",
              borderColor: "black",
            }}
            country={"vn"}
            onChange={(phone) => handleInputPhone(name, phone)}
          />
        </div>
      ) : (
        <div className="relative group my-[10px] w-[90%] mx-auto">
          <input
            className={`w-full  border-[1.5px] outline-none px-[10px] py-[8px] rounded-[4px] ${
              error.error ? "border-red-600" : "border-black"
            } ${animationError ? "animate-error-input" : ""}`}
            onChange={handleOnChange}
            name={name}
            value={valueGetter || ""}
            type={
              showPassword ? "text" : type === "password" ? "password" : "text"
            }
          />
          <div
            className={`right-3 top-[12px] text-[18px] ${
              type == "password" ? "absolute" : "hidden"
            } cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <BsFillEyeSlashFill /> : <IoEyeSharp />}
          </div>
          <label
            className={`absolute bg-white px-[0.5rem] pointer-events-none left-3 font-medium group-focus-within:text-[12px] group-focus-within:-top-[6px] group-focus-within:leading-none transition-all duration-200 ease-linear 
              ${
                valueGetter
                  ? "-top-[6px] text-[12px] leading-none"
                  : "top-[0.4em] text-[18px]"
              } ${error.error ? "text-red-600" : "text-black"}`}
          >
            {title}
          </label>
          <div
            className={`text-red-600 font-bold text-[12px] ${
              error.error ? "block" : "hidden"
            }`}
          >
            {error.message}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(InputComponent);
