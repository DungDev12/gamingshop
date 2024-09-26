import { iconList } from "@routes/config/iconProducts";
import { Link } from "react-router-dom";

const ModalCategory = () => {
  //#TEST
  const APITEST = [
    {
      id: 1,
      title: "Laptop",
      categoryList: [
        {
          id: 1,
          title: "ASUS",
          links: [
            {
              id: 1,
              name: "ASUS Vivobook",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "PC",
      categoryList: [
        {
          id: 1,
          title: "Máy bộ",
          links: [
            {
              id: 1,
              name: "Máy bộ CPU I5",
              url: "#",
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="relative overflow-hidden">
      {APITEST && (
        <ul className="bg-[#fff] w-[17%] min-h-[500px] rounded-[5px]">
          {APITEST.map((v) => {
            const Icon = iconList.find(
              (icon) => icon.name.toLowerCase() === v.title.toLowerCase()
            )?.icon;
            return (
              <li key={v.title} className="group cursor-pointer leading-[30px]">
                <div className="relative w-full h-full after:absolute after:border-l-[#dc2626] after:opacity-0 hover:bg-red-600 group-hover:bg-red-600 group-hover:after:border-l-[#dc2626] group-hover:text-white hover:text-white hover:after:opacity-100 group-hover:after:opacity-100 after:border-[12.5px] after:top-1/2 after:right-[-20px] after:border-r-transparent after:border-t-transparent after:border-b-transparent after:transform py-0.5 after:-translate-y-1/2 px-2 after:z-[2] text-[18px] flex items-center gap-2">
                  {Icon && <Icon className="text-[24px]" />}
                  <span>{v.title}</span>
                </div>
                <div>
                  <div className="absolute w-[82%] left-[17.4%] top-0 h-full bg-[#fff] rounded-[5px] hidden group-hover:block p-3 z-[2]">
                    <div className="grid grid-cols-6 grid-rows-3 gap-4 overflow-y-auto overflow-x-hidden">
                      {v.categoryList &&
                        v.categoryList.map((link) => (
                          <div key={link.title} className="p-2">
                            <h5 className="text-[20px] font-bold text-red-600">
                              {link.title}
                            </h5>
                            <ul>
                              {link.links &&
                                link.links.map((item) => (
                                  <li key={item.id} className="px-2">
                                    <Link
                                      className="text-[18px] hover:text-blue-600"
                                      to={item.url}
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
