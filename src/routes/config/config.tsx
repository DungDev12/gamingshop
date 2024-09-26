export const logicPasswordRule = [
  {
    type: "password",
    rules: [
      {
        rule: (value: string) => value === "",
        message: "Mật khẩu không được để trống !!!",
      },
      {
        rule: (value: string) => value.length < 4,
        message: "Mật khẩu phải ít nhất 4 kí tự !!!",
      },
      {
        rule: (value: string) => !/[A-Z]/.test(value),
        message: "Mật khẩu phải ít nhất 1 kí tự viết hoa !!!",
      },
      {
        rule: (value: string) => !/[!@#$%^&*(),.?":{}|<>]/.test(value),
        message: "Mật khẩu phải ít nhất 1 kí tự đặt biệt !!!",
      },
    ],
  },
  {
    type: "passwordReEnter",
    rules: [
      {
        rule: (value: string) => value === "",
        message: "Mật khẩu không được để trống !!!",
      },
      {
        rule: (value: string) => value.length < 4,
        message: "Mật khẩu phải ít nhất 4 kí tự !!!",
      },
      {
        rule: (value: string) => !/[A-Z]/.test(value),
        message: "Mật khẩu phải ít nhất 1 kí tự viết hoa !!!",
      },
      {
        rule: (value: string) => !/[!@#$%^&*(),.?":{}|<>]/.test(value),
        message: "Mật khẩu phải ít nhất 1 kí tự đặt biệt !!!",
      },
    ],
  },
  {
    type: "username",
    rules: [
      {
        rule: (value: string) => value === "",
        message: "Tên tài khoản không được để trống !!!",
      },
      {
        rule: (value: string) => value.length < 6,
        message: "Tên tài khoản ít nhất 6 kí tự !!!",
      },
    ],
  },
  {
    type: "email",
    rules: [
      {
        rule: (value: string) => value === "",
        message: "Email không được để trống !!!",
      },
      {
        rule: (value: string) => !value.includes("@") && !value.includes("."),
        message: "Email không hợp lệ",
      },
    ],
  },
  {
    type: "phone",
    rules: [
      {
        rule: (value: string) => value === "",
        message: "Số điện thoại không được để trống !!!",
      },
      {
        rule: (value: string) => !/^0[0-9]/.test(value),
        message: "Số điện thoại không hợp lệ !!!",
      },
    ],
  },
  {
    type: "firstName",
    rules: [
      {
        rule: (value: string) => value === "",
        message: "Họ không được để trống !!!",
      },
    ],
  },
  {
    type: "lastName",
    rules: [
      {
        rule: (value: string) => value === "",
        message: "Tên không được để trống !!!",
      },
    ],
  },
];

export const sizeBannerDefault = {
  mainBanner: 550,
  bottomBanner: 200,
};
