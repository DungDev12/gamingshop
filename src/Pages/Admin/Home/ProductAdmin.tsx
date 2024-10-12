import { Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BsPlus } from "react-icons/bs";
import { FaRegPenToSquare, FaTrashCan } from "react-icons/fa6";
import CreateProduct from "../Controllers/CreateProduct";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  discount: number;
  originalPrice: number;
  stock: number;
  point: number;
  categoryName: string;
  brandName: string;
}

const ProductAdmin = () => {
  const [
    createProduct,
    { open: openCreateProduct, close: closeCreateProduct },
  ] = useDisclosure(false);
  const [
    updateProduct,
    { open: openUpdateProduct, close: closeUpdateProduct },
  ] = useDisclosure(false);
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [productIndex, setProductIndex] = useState(0);
  useEffect(() => {
    get();
  }, []);
  async function get() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/product/all",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setProduct(response.data);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/product/delete/${id}`,
        { withCredentials: true }
      );
      if (response.status === 204) {
        get();
        closeCreateProduct();
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };

  console.log(product);

  const rows = product.map((element, i) => (
    <Table.Tr key={element.name + i}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.price}</Table.Td>
      <Table.Td>{element.originalPrice}</Table.Td>
      <Table.Td>{element.discount}%</Table.Td>
      <Table.Td>{element.point}</Table.Td>
      <Table.Td>{element.categoryName}</Table.Td>
      <Table.Td>{element.brandName}</Table.Td>
      <Table.Td>{element.stock}</Table.Td>
      <Table.Td className="w-[70px]">
        <div className="flex items-center justify-between">
          <button>
            <FaRegPenToSquare
              className="hover:text-blue-600"
              onClick={() => {
                openUpdateProduct();
                setProductIndex(i);
              }}
            />
          </button>
          <button>
            <FaTrashCan
              className="hover:text-red-600"
              onClick={() => handleDelete(element.id)}
            />
          </button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="bg-[#fff] shadow-2xl h-[100vh] rounded-xl p-[20px]">
      <div className="px-[20px] my-[10px]">
        <button
          className="flex items-center justify-center text-green-500 border-green-500 border-[1.2px] px-2 rounded-[5px] hover:bg-green-500 hover:text-[#fff] font-semibold"
          onClick={() => openCreateProduct()}
        >
          <span>Tạo</span>
          <BsPlus className="text-[20px]" />
        </button>
      </div>
      <div className="">
        <Table
          stickyHeader
          stickyHeaderOffset={0}
          striped
          withTableBorder
          withColumnBorders
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Tên sản phẩm</Table.Th>
              <Table.Th>Giá bán</Table.Th>
              <Table.Th>Giá gốc</Table.Th>
              <Table.Th>Giảm %</Table.Th>
              <Table.Th>Điểm</Table.Th>
              <Table.Th>Thể loại</Table.Th>
              <Table.Th>Nhóm</Table.Th>
              <Table.Th>Tồn</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption>Scroll page to see sticky thead</Table.Caption>
        </Table>
      </div>

      <Modal
        opened={createProduct}
        onClose={closeCreateProduct}
        withCloseButton={false}
        size="xl"
      >
        <CreateProduct
          type="create"
          closeModal={closeCreateProduct}
          reload={get}
        />
      </Modal>
      <Modal
        opened={updateProduct}
        onClose={closeUpdateProduct}
        withCloseButton={false}
        size="xl"
      >
        <CreateProduct
          type="update"
          data={product[productIndex]}
          closeModal={closeUpdateProduct}
          reload={get}
        />
      </Modal>
    </div>
  );
};

export default ProductAdmin;
