import { iconList } from "@routes/config/iconProducts";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface ModalCategoryProps {
  closeModal: () => void;
}

interface BrandItemProps {
  id: number;
  name: string;
}
interface BrandProps {
  id: number;
  name: string;
  brandItems: BrandItemProps[];
}
interface APIProps {
  id: number;
  name: string;
  brands: BrandProps[];
}

const ModalCategory: React.FC<ModalCategoryProps> = ({ closeModal }) => {
  const [api, setAPI] = useState<APIProps[]>([]);
  const urlBase = import.meta.env.VITE_BASE_URL;
  //#TEST
  useEffect(() => {
    get();
  }, []);
  async function get() {
    try {
      const response = await axios.get("http://localhost:8080/category/all");
      if (response.status == 200) {
        console.log(response.data);
        setAPI(response.data);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  return (
    <div className="relative overflow-hidden">
      {api && (
        <ul className="bg-[#fff] w-[17%] min-h-[500px] rounded-[5px]">
          {api.map((v) => {
            const Icon = iconList.find(
              (icon) => icon.name.toLowerCase() === v.name.toLowerCase()
            )?.icon;
            return (
              <li key={v.name} className="group cursor-pointer leading-[30px]">
                <Link
                  className="relative w-full h-full after:absolute after:border-l-[#dc2626] after:opacity-0 hover:bg-red-600 group-hover:bg-red-600 group-hover:after:border-l-[#dc2626] group-hover:text-white hover:text-white hover:after:opacity-100 group-hover:after:opacity-100 after:border-[12.5px] after:top-1/2 after:right-[-20px] after:border-r-transparent after:border-t-transparent after:border-b-transparent after:transform py-0.5 after:-translate-y-1/2 px-2 after:z-[2] text-[18px] flex items-center gap-2"
                  to={`${urlBase}/collections/${v.name.toLowerCase()}`}
                  onClick={() => closeModal()}
                >
                  {Icon && <Icon className="text-[24px]" />}
                  <span>{v.name}</span>
                </Link>
                <div>
                  <div className="absolute w-[82%] left-[17.4%] top-0 h-full bg-[#fff] rounded-[5px] hidden group-hover:block p-3 z-[2]">
                    <div className="grid grid-cols-6 grid-rows-3 gap-4 overflow-y-auto overflow-x-hidden">
                      {v.brands &&
                        v.brands.map((link) => (
                          <div key={link.name} className="p-2">
                            <h5 className="text-[20px] font-bold text-red-600">
                              {link.name}
                            </h5>
                            <ul>
                              {link.brandItems &&
                                link.brandItems.map((item) => (
                                  <li key={item.id} className="px-2">
                                    <Link
                                      className="text-[18px] hover:text-blue-600"
                                      to={`${urlBase}/collections/${v.name.toLowerCase()}/${item.name.toLowerCase()}`}
                                      onClick={() => closeModal()}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ModalCategory;
