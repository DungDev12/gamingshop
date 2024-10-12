// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Công ty của bạn. Tất cả các quyền
          được bảo lưu.
        </p>
        <div className="mt-2">
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Giới thiệu
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Dịch vụ
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-2">
            Liên hệ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
