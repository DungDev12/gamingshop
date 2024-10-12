import { Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";

interface BrandItemProp {
  id: number;
  name: string;
}
interface BrandProp {
  id: number;
  name: string;
  brandItems: BrandItemProp[];
}
interface CategoryProp {
  id: number;
  name: string;
  brands: BrandProp[];
}

const CreateCategory = () => {
  const [createModal, setCreateModal] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [
    modalCategory,
    { open: openModalCategory, close: closeModalCategory },
  ] = useDisclosure(false);
  const [
    modalUpdateCategory,
    { open: openModalUpdateCategory, close: closeModalUpdateCategory },
  ] = useDisclosure(false);
  const [modalBrand, { open: openModalBrand, close: closeModalBrand }] =
    useDisclosure(false);
  const [
    modalUpdateBrand,
    { open: openModalUpdateBrand, close: closeModalUpdateBrand },
  ] = useDisclosure(false);
  const [
    modalBrandItem,
    { open: openModalBrandItem, close: closeModalBrandItem },
  ] = useDisclosure(false);
  const [
    modalUpdateBrandItem,
    { open: openModalUpdateBrandItem, close: closeModalUpdateBrandItem },
  ] = useDisclosure(false);
  const [category, setCategory] = useState<CategoryProp[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    get();
  }, []);

  async function get() {
    const categoryRes = await axios.get(
      "http://localhost:8080/api/admin/category/all",
      {
        withCredentials: true,
      }
    );
    if (categoryRes?.status === 200) {
      console.log(categoryRes.data);
      setCategory(categoryRes.data);
    }
  }

  const rows = category.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td className="w-[70px]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setCreateModal(element.name);
              setCurrentCategoryId(element.id);
              openModalUpdateCategory();
            }}
          >
            <FaRegPenToSquare className="hover:text-blue-600" />
          </button>
          <button onClick={() => handleDelete(element.id)}>
            <FaTrashCan className="hover:text-red-600" />
          </button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  /* ------------------------------ Handle Create ----------------------------- */
  const handleCreate = async () => {
    try {
      console.log(createModal);
      const response = await axios.post(
        "http://localhost:8080/api/admin/category/create",
        { name: createModal },
        { withCredentials: true }
      );
      if (response.status === 200) {
        get();
        closeModalCategory();
      }
    } catch (err) {
      const error = err as AxiosError;
    }
  };
  const handleCreateBrand = async () => {
    try {
      console.log(createModal);
      const response = await axios.post(
        `http://localhost:8080/api/admin/brand/create/${currentCategoryId}`,
        { name: createModal },
        { withCredentials: true }
      );
      if (response.status === 200) {
        get();
        closeModalBrand();
      }
    } catch (err) {
      const error = err as AxiosError;
    }
  };
  const handleCreateBrandItem = async () => {
    try {
      console.log(currentCategoryId);
      const response = await axios.post(
        `http://localhost:8080/api/admin/brand-item/create/${currentCategoryId}`,
        { name: createModal },
        { withCredentials: true }
      );
      if (response.status === 200) {
        get();
        closeModalBrandItem();
      }
    } catch (err) {
      const error = err as AxiosError;
    }
  };
  /* ------------------------------ Handle Update ----------------------------- */
  const handleUpdate = async () => {
    if (currentCategoryId !== null) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/admin/category/update/${currentCategoryId}`,
          { name: createModal },
          { withCredentials: true }
        );
        if (response.status === 200) {
          get();
          closeModalUpdateCategory();
        }
      } catch (err) {
        const error = err as AxiosError;
      }
    }
  };
  const handleUpdateBrand = async () => {
    if (currentCategoryId !== null) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/admin/brand/update/${currentCategoryId}`,
          { name: createModal },
          { withCredentials: true }
        );
        if (response.status === 200) {
          get();
          closeModalUpdateBrand();
        }
      } catch (err) {
        const error = err as AxiosError;
      }
    }
  };
  const handleUpdateBrandItem = async () => {
    if (currentCategoryId !== null) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/admin/brand-item/update/${currentCategoryId}`,
          { name: createModal },
          { withCredentials: true }
        );
        if (response.status === 200) {
          get();
          closeModalUpdateBrandItem();
        }
      } catch (err) {
        const error = err as AxiosError;
      }
    }
  };

  /* ------------------------------ Handle Delete ----------------------------- */
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/category/delete/${id}`,
        { withCredentials: true }
      );
      if (response.status === 204) {
        get();
      }
    } catch (err) {
      const error = err as AxiosError;
    }
  };
  const handleDeleteBrand = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/brand/delete/${id}`,
        { withCredentials: true }
      );
      if (response.status === 204) {
        get();
      }
    } catch (err) {
      const error = err as AxiosError;
    }
  };
  const handleDeleteBrandItem = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/brand-item/delete/${id}`,
        { withCredentials: true }
      );
      if (response.status === 204) {
        get();
      }
    } catch (err) {
      const error = err as AxiosError;
    }
  };

  return (
    <>
      <div>
        <div className="p-4 bg-[#fff] rounded-[5px] shadow-2xl  max-h-[200px] overflow-y-auto mb-[2rem]">
          <div className="mb-2 flex items-center justify-start gap-4">
            <button
              className="px-3 bg-blue-300 rounded-[5px] font-bold text-white hover:bg-blue-600"
              onClick={openModalCategory}
            >
              Create
            </button>
          </div>
          <Table striped withTableBorder withColumnBorders highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
        <div className="grid grid-cols-5 gap-4 max-h-[350px] overflow-y-auto rounded-[5px] p-4">
          {category &&
            category.map((categories) => (
              <div
                className="p-4 bg-[#fff] rounded-[5px] shadow-lg max-h-[400px] overflow-y-auto"
                key={categories.name}
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <button
                    className="px-3 bg-blue-300 rounded-[5px] font-bold text-white hover:bg-blue-600"
                    onClick={() => {
                      setCurrentCategoryId(categories.id);
                      openModalBrand();
                    }}
                  >
                    Create
                  </button>
                  <p>{categories.name}</p>
                </div>
                <Table
                  striped
                  withTableBorder
                  withColumnBorders
                  highlightOnHover
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>ID</Table.Th>
                      <Table.Th>Brand</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {categories.brands &&
                      categories.brands.map((v) => (
                        <Table.Tr key={v.name}>
                          <Table.Td>{v.id}</Table.Td>
                          <Table.Td>{v.name}</Table.Td>
                          <Table.Td className="w-[70px]">
                            <div className="flex items-center justify-between">
                              <button>
                                <FaRegPenToSquare
                                  className="hover:text-blue-600"
                                  onClick={() => {
                                    setCreateModal(v.name);
                                    setCurrentCategoryId(v.id);
                                    openModalUpdateBrand();
                                  }}
                                />
                              </button>
                              <button>
                                <FaTrashCan
                                  className="hover:text-red-600"
                                  onClick={() => handleDeleteBrand(v.id)}
                                />
                              </button>
                            </div>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                  </Table.Tbody>
                </Table>
              </div>
            ))}
        </div>

        <div className="grid grid-cols-5 gap-4 max-h-[350px] overflow-y-auto rounded-[5px] p-4">
          {category &&
            category.map((categories) =>
              categories.brands.map((brand) => (
                <div
                  className="p-4 bg-[#fff] rounded-[5px] shadow-lg max-h-[400px] overflow-y-auto"
                  key={brand.name}
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <button
                      className="px-3 bg-blue-300 rounded-[5px] font-bold text-white hover:bg-blue-600"
                      onClick={() => {
                        setCurrentCategoryId(brand.id);
                        openModalBrandItem();
                      }}
                    >
                      Create
                    </button>
                    <div className="text-[14px] flex gap-2">
                      <p>{categories.name}</p>
                      <p>{brand.name}</p>
                    </div>
                  </div>
                  <Table
                    striped
                    withTableBorder
                    withColumnBorders
                    highlightOnHover
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Item</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {brand.brandItems &&
                        brand.brandItems.map((v) => (
                          <Table.Tr key={v.name}>
                            <Table.Td>{v.id}</Table.Td>
                            <Table.Td>{v.name}</Table.Td>
                            <Table.Td className="w-[70px]">
                              <div className="flex items-center justify-between">
                                <button>
                                  <FaRegPenToSquare
                                    className="hover:text-blue-600"
                                    onClick={() => {
                                      setCreateModal(v.name);
                                      setCurrentCategoryId(v.id);
                                      openModalUpdateBrandItem();
                                    }}
                                  />
                                </button>
                                <button>
                                  <FaTrashCan
                                    className="hover:text-red-600"
                                    onClick={() => handleDeleteBrandItem(v.id)}
                                  />
                                </button>
                              </div>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                    </Table.Tbody>
                  </Table>
                </div>
              ))
            )}
        </div>
      </div>

      <Modal
        opened={modalCategory}
        onClose={closeModalCategory}
        withCloseButton={false}
      >
        <div className="border-black border-[1.5px] px-2 py-1 rounded-[8px]">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Tạo thể loại"
            onChange={(e) => setCreateModal(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          {err && <p className="text-red-600 text-[12px]">{err}</p>}
          <button
            className="bg-blue-300 hover:bg-blue-600 px-2 rounded-[5px] text-white font-semibold"
            onClick={handleCreate}
          >
            Tạo thể loại
          </button>
        </div>
      </Modal>

      <Modal
        opened={modalUpdateCategory}
        onClose={closeModalUpdateCategory}
        withCloseButton={false}
      >
        <div className="border-black border-[1.5px] px-2 py-1 rounded-[8px]">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Tên thể loại"
            value={createModal}
            onChange={(e) => setCreateModal(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          {err && <p className="text-red-600 text-[12px]">{err}</p>}
          <button
            className="bg-blue-300 hover:bg-blue-600 px-2 rounded-[5px] text-white font-semibold"
            onClick={handleUpdate}
          >
            Cập nhật thể loại
          </button>
        </div>
      </Modal>

      <Modal
        opened={modalBrand}
        onClose={closeModalBrand}
        withCloseButton={false}
      >
        <div className="border-black border-[1.5px] px-2 py-1 rounded-[8px]">
          <p></p>
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Tạo nhóm"
            onChange={(e) => setCreateModal(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          {err && <p className="text-red-600 text-[12px]">{err}</p>}
          <button
            className="bg-blue-300 hover:bg-blue-600 px-2 rounded-[5px] text-white font-semibold"
            onClick={handleCreateBrand}
          >
            Tạo nhóm
          </button>
        </div>
      </Modal>

      <Modal
        opened={modalUpdateBrand}
        onClose={closeModalUpdateBrand}
        withCloseButton={false}
      >
        <div className="border-black border-[1.5px] px-2 py-1 rounded-[8px]">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Tên thương hiệu"
            value={createModal}
            onChange={(e) => setCreateModal(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          {err && <p className="text-red-600 text-[12px]">{err}</p>}
          <button
            className="bg-blue-300 hover:bg-blue-600 px-2 rounded-[5px] text-white font-semibold"
            onClick={handleUpdateBrand}
          >
            Cập nhật thương hiệu
          </button>
        </div>
      </Modal>

      <Modal
        opened={modalBrandItem}
        onClose={closeModalBrandItem}
        withCloseButton={false}
      >
        <div className="border-black border-[1.5px] px-2 py-1 rounded-[8px]">
          <p></p>
          <input
            className="w-full outline-none"
            type="text"
            onChange={(e) => setCreateModal(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          {err && <p className="text-red-600 text-[12px]">{err}</p>}
          <button
            className="bg-blue-300 hover:bg-blue-600 px-2 rounded-[5px] text-white font-semibold"
            onClick={handleCreateBrandItem}
          >
            Tạo
          </button>
        </div>
      </Modal>

      <Modal
        opened={modalUpdateBrandItem}
        onClose={closeModalBrandItem}
        withCloseButton={false}
      >
        <div className="border-black border-[1.5px] px-2 py-1 rounded-[8px]">
          <input
            className="w-full outline-none"
            type="text"
            value={createModal}
            onChange={(e) => setCreateModal(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          {err && <p className="text-red-600 text-[12px]">{err}</p>}
          <button
            className="bg-blue-300 hover:bg-blue-600 px-2 rounded-[5px] text-white font-semibold"
            onClick={handleUpdateBrandItem}
          >
            Cập nhật
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateCategory;
