"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React from "react";
import { ImDroplet } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const editProduct = () => {
    router.push("/admin/stats/editProduct");
  };
  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold">Product Details</h3>

        <div className="mt-4">
          <DetailList
            title="Product Name"
            value="Fuel"
            icon={<ImDroplet size={20} />}
          />
          <DetailList
            title="Allocation Per Voucher"
            value={25}
            icon={<MdAssignmentTurnedIn size={24} />}
          />
          <DetailList
            title="Total Stock"
            value={5000}
            // icon={<PiBatteryVerticalFullFill  size={24} />}
            icon={<ImDroplet size={20} />}
          />
          <DetailList
            title="Available Stock"
            value={2500}
            icon={<PiDropHalfBottomFill size={24} />}
          />
          <DetailList
            title="Unit"
            value="Litres"
            icon={<TbRulerMeasure size={24} />}
          />

          <button onClick={editProduct} className="btn bg-primary w-full mt-5">
            Edit Product
          </button>
        </div>
      </div>
    </section>
  );
}
