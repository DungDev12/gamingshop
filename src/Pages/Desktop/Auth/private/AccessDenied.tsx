
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();


  return (
    <>
      <div className="bg-[#f7f7f7] w-[70%] min-h-[400px] my-[100px] mx-auto p-4 shadow-2xl text-center rounded-[8px] grid place-items-center">
        <div>
          <strong className="text-[20px]">Bạn không có quyền truy cập</strong>
          <div>
            <button
              className="bg-blue-300 hover:bg-blue-600 px-2 rounded-[5px] text-white"
              onClick={() => navigate(import.meta.env.VITE_BASE_URL)}
            >
              Quay về Trang Chủ
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default AccessDenied;
