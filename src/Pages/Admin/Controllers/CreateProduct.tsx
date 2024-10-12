import { FileInput, Image, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import MultiFile from "../../../Component/MultiFile";
import { FaRegImage } from "react-icons/fa6";
import { IoIosImages } from "react-icons/io";
import axios, { AxiosError } from "axios";
import { ApiSelection, apiSelection } from "@routes/config/config";
import { toast } from "react-toastify";

interface CreateProductForm {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  category: string | null;
  point: number;
  image: File | null;
  brand: string | null;
  brandItems: string | null;
  productImages: File[] | null;
}

interface CategoryProp {
  id: number;
  name: string;
  brands: {
    id: number;
    name: string;
    brandItems: { id: number; name: string }[];
  }[];
}

interface ProductProps {
  id: number;
  name: string;
  originalPrice: number;
  point: number;
  price: number;
  stock: number;
  isFavorite: boolean;
  image?: string;
  discount: number;
  categoryName: string;
  brandName: string;
  imageList: string[];
}

interface CreateProductProps {
  data?: ProductProps;
  type: string;
  closeModal: () => void;
  reload: () => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({
  type,
  data,
  closeModal,
  reload,
}) => {
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [uploadedMultiFiles, setUploadedMultiFiles] = useState<string[]>([]); // State để lưu trữ URL hình ảnh đa phương tiện
  const [err, setErr] = useState<string>("");
  const [apiCategory, setAPICategory] = useState<CategoryProp[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imageList, setImageList] = useState<File[]>([]);

  const [formData, setFormData] = useState<CreateProductForm>({
    name: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    stock: 0,
    category: null,
    image: null,
    brand: null,
    brandItems: null,
    point: 0,
    productImages: [],
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData({
        name: data.name,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount,
        stock: data.stock,
        point: data.point,
        category: data.categoryName || null,
        brand: data.brandName || null,
        brandItems: null,
        productImages: data.imageList || [],
      });
      setViewImage(data.image ? data.image : null);
      setUploadedMultiFiles(data.imageList ? data.imageList : null);
    }
  }, [data]);

  const [config, setConfig] = useState<{ type: string; name: string } | null>(
    null
  );
  useEffect(() => {
    get();
  }, []);
  async function get() {
    try {
      const response = await axios.get("http://localhost:8080/category/all");
      if (response.status === 200) {
        setAPICategory(response.data);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (type == "create") {
        const response = await axios.post(
          "http://localhost:8080/api/admin/product/create",
          {
            name: formData.name,
            price: formData.price,
            originalPrice: formData.originalPrice,
            discount: formData.discount,
            point: formData.point,
            stock: formData.stock,
            categoryName: formData.category,
            brandName: formData.brand,
            brandItemsName: formData.brandItems,
            configuration: config,
          },
          { withCredentials: true }
        );
        const form = new FormData();
        if (image) {
          form.append("file", image);

          if (imageList && imageList.length > 0) {
            imageList.forEach((img) => {
              form.append("listFile", img);
            });
          }
        } else {
          // Xử lý trường hợp không có hình ảnh
          console.error("No image selected");
        }

        const responseImage = await axios.post(
          `http://localhost:8080/api/admin/product/create-image/${response.data}`,
          form,
          { withCredentials: true }
        );

        if (responseImage.status === 200) {
          toast.success("Cập nhật thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        reload();
        closeModal();
      } else {
        const response = await axios.put(
          "http://localhost:8080/api/admin/product-update",
          {
            id: data.id,
            payload: {
              name: formData.name,
              price: formData.price,
              originalPrice: formData.originalPrice,
              discount: formData.discount,
              point: formData.point,
              stock: formData.stock,
              categoryName: formData.category,
              brandName: formData.brand,
              brandItemsName: formData.brandItems,
              configuration: config,
            },
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log(response.data);
          closeModal();
        }

        const form = new FormData();
        if (image) {
          form.append("file", image);

          if (imageList && imageList.length > 0) {
            imageList.forEach((img) => {
              form.append("listFile", img);
            });
          }
        } else {
          // Xử lý trường hợp không có hình ảnh
          console.error("No image selected");
        }
        const responseImage = await axios.post(
          `http://localhost:8080/api/admin/product/update-image/${data.id}`,
          form,
          { withCredentials: true }
        );

        if (responseImage.status === 204) {
          toast.success("Cập nhật thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reload();
          closeModal();
        }
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      toast.error("Lỗi", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  /* ------------------------------ Upload Image ------------------------------ */
  const handleUploadImage = (file: File | null) => {
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErr("Chỉ cho phép tệp hình ảnh (JPEG, PNG)");
        return;
      }

      const maxSize = 3 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setErr("Kích thước tệp phải nhỏ hơn 2MB");
        return;
      }

      setImage(file);
      setViewImage(URL.createObjectURL(file)); // Tạo URL cho hình ảnh
      setErr(""); // Reset lỗi
    } else {
      setViewImage(null);
    }
  };

  /* --------------------------- Upload Multi Image --------------------------- */
  const handleUploadMultiImage = (files: File[]) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 3 * 1024 * 1024; // 3MB

    const urls: string[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        errors.push(`${file.name}: Chỉ cho phép tệp hình ảnh (JPEG, PNG)`);
      }

      if (file.size > maxSize) {
        errors.push(`${file.name}: Kích thước tệp phải nhỏ hơn 3MB`);
      } else {
        urls.push(URL.createObjectURL(file)); // Tạo URL cho từng hình ảnh
      }
    });

    if (errors.length > 0) {
      setErr(errors.join(", "));
    } else {
      setImageList(files);
      setUploadedMultiFiles(urls); // Cập nhật state với các URL
      setErr(""); // Reset lỗi
    }
  };

  /* ------------------------------ Handle Input ------------------------------ */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (formData.category == null) {
      setConfig(null);
    }
  }, [formData.category]);

  return (
    <div className="">
      <h2>Tạo sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-0.5">
          <input
            className="outline-none w-full border-b-2 border-black mb-1"
            name="name"
            placeholder="Tên sản phẩm"
            defaultValue={formData.name || data?.name}
            onChange={handleInput}
          />
          <div className="grid grid-flow-col gap-4">
            <input
              className="outline-none w-full border-b-2 border-black mb-1"
              name="price"
              type="number"
              placeholder="Giá bán"
              defaultValue={formData.price || data?.price}
              onChange={handleInput}
            />
            <input
              className="outline-none w-full border-b-2 border-black mb-1"
              name="originalPrice"
              type="number"
              placeholder="Giá gốc"
              defaultValue={formData.originalPrice || data?.originalPrice}
              onChange={handleInput}
            />
            <input
              className="outline-none w-full border-b-2 border-black mb-1"
              name="discount"
              type="number"
              placeholder="Giảm giá"
              defaultValue={formData.discount || data?.discount}
              onChange={handleInput}
            />
            <input
              className="outline-none w-full border-b-2 border-black mb-1"
              name="stock"
              type="number"
              placeholder="Tồn"
              defaultValue={formData.stock || data?.stock}
              onChange={handleInput}
            />
            <input
              className="outline-none w-full border-b-2 border-black mb-1"
              name="point"
              type="number"
              placeholder="Điểm"
              defaultValue={formData.point || data?.point}
              onChange={handleInput}
            />
          </div>
          <div className="flex items-start justify-center gap-4">
            <div className="w-[50%]">
              <FileInput
                leftSection={<FaRegImage />}
                clearable
                label="Hình đại diện"
                placeholder=".PNG, .JPG"
                onChange={handleUploadImage}
              />
              {viewImage && (
                <Image
                  src={viewImage}
                  w={150}
                  className="mx-auto"
                  alt="Hình đại diện"
                />
              )}
              {err && <p className="text-red-500">{err}</p>}
            </div>
            <div className="w-[50%]">
              <MultiFile
                leftSection={<IoIosImages />}
                label="Hình sản phẩm"
                placeholder=".PNG, .JPG"
                onChange={handleUploadMultiImage}
              />
              <div className="flex flex-nowrap overflow-x-auto">
                {uploadedMultiFiles.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    w={150}
                    className="mx-2"
                    alt={`Hình sản phẩm ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="w-full">
              <Select
                label="Chọn category"
                placeholder=""
                clearable
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e }))
                }
                data={apiCategory && apiCategory.map((item) => item.name)}
              />
            </div>
            <div className="w-full">
              <Select
                label="Chọn brand"
                placeholder=""
                clearable
                disabled={formData.category === null}
                onChange={(e) => setFormData((prev) => ({ ...prev, brand: e }))}
                data={
                  apiCategory
                    ? apiCategory
                        .filter(
                          (category) => category.name === formData.category
                        )
                        .flatMap((category) =>
                          category.brands.map((brand) => brand.name)
                        )
                    : []
                }
              />
            </div>
            <div className="w-full">
              <Select
                label="Chọn item"
                placeholder=""
                clearable
                disabled={formData.brand === null}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, brandItems: e }))
                }
                data={
                  apiCategory
                    ? apiCategory
                        .filter(
                          (category) => category.name === formData.category
                        )
                        .flatMap((category) =>
                          category.brands
                            .filter((brand) => brand.name === formData.brand)
                            .flatMap((brand) =>
                              brand.brandItems.map((item) => item.name)
                            )
                        )
                    : []
                }
              />
            </div>
          </div>
          <div className="w-[400px] mx-auto">
            {formData.category &&
              apiSelection[
                formData.category.toLowerCase() as keyof ApiSelection
              ].map((item: string) => (
                <div
                  className="flex items-center justify-start gap-4 border-black border-b-[1.5px] p-2"
                  key={item}
                >
                  <p>{item}</p>
                  <input
                    className="w-full px-3 py-1 outline-none border-b-2 border-blue-600"
                    name={item}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setConfig((prev) => {
                        const newConfig = { ...prev };
                        if (value === "") {
                          delete newConfig[name];
                        } else {
                          newConfig[name] = value;
                        }
                        return newConfig;
                      });
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
        <hr className="my-[1rem]" />
        <div className="flex justify-around">
          <button
            className="bg-blue-300 hover:bg-green-600 text-[#fff] px-4 rounded-[5px]"
            type="submit"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
