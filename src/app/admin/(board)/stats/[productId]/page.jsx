"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { useEffect, useState } from "react";
import { ImDroplet } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getProduct } from "@/redux/slices/getProductSlice";
import Loading from "@/components/Loading";
import Loader from "@/components/Loader";
import { fetchProducts } from "@/redux/slices/fetchProductsSlice";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { pageNumber, take, search } = useSelector((state) => state.variables);
  // const { products } = useSelector((state) => state.products);
  // console.log(product);
  useEffect(() => {
    const getProductDetails = async () => {
      const res = await axios.get(`/api/product/${productId}`);

      // console.log(res);
      dispatch(getProduct({ ...res.data.data }));
    };

    getProductDetails();
  }, [dispatch, productId]);

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/product/${productId}`);
      if (res) {
        const resProducts = await axios.get(
          `/api/product?take=${take}&pageNumber=${pageNumber}&name=${search}`
        );
        dispatch(fetchProducts([...resProducts?.data.data]));
        setIsLoading(false);
        toast.success(res.data.data.message);
        setTimeout(() => {
          router.back();
          // window.location.reload();
        }, 500);
      }
    } catch (err) {
      setIsLoading(false);
      // toast.success(err.data.message);
      console.log(err);
    }
  };

  const editProduct = () => {
    router.push(`/admin/stats/${productId}/editProduct`);
  };
  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">Product Details</h3>

        {product?.productName ? (
          <div className="mt-4">
            <DetailList
              title="Product Name"
              value={product?.productName?.toUpperCase()}
              icon={<ImDroplet size={16} />}
            />
            <DetailList
              title="Amount Allocated Per Voucher"
              value={product?.voucherAllocation}
              icon={<MdAssignmentTurnedIn size={16} />}
            />
            <DetailList
              title="Total Stock"
              value={5000}
              // icon={<PiBatteryVerticalFullFill  size={24} />}
              icon={<ImDroplet size={16} />}
            />
            <DetailList
              title="Available Stock"
              value={2500}
              icon={<PiDropHalfBottomFill size={16} />}
            />
            <DetailList
              title="Unit"
              value={product?.unit}
              icon={<TbRulerMeasure size={16} />}
            />

            <div>
              <button
                onClick={editProduct}
                className="btn bg-primary w-full mt-5"
              >
                Edit Product
              </button>

              <button
                onClick={handleDeleteProduct}
                type="submit"
                className={`btn w-full mt-5 flex justify-center items-center text-lg text-white font-medium duration-200 rounded-xl ${
                  isLoading ? "bg-customGray" : "bg-error"
                } `}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Delete Product"}
              </button>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
