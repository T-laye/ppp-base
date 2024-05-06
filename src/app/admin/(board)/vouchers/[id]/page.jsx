"use client";
import DetailList from "@/components/DetailList";
import GoBack from "@/components/GoBack";
import React, { useEffect } from "react";
import { ImDroplet } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { useParams, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { FaBarcode, FaCarSide, FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getVoucher } from "@/redux/slices/getVoucherSlice";
import Image from "next/image";
import Loading from "@/components/Loading";
import { IoIosTime } from "react-icons/io";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { voucher } = useSelector((state) => state.voucher);

  console.log(voucher);

  const editVoucher = () => {
    router.push(`/admin/vouchers/${id}/editVoucher`);
  };

  useEffect(() => {
    const getVoucherDetails = async () => {
      try {
        // const resCollectedVouchers = await axios.get(
        //   `/api/admin/voucher?product_name=${productName}&verifiedBy=${personnelId}&collected=true&av4D&customer=${search}&take=${take}&pageNumber=${pageNumber}`
        // );
        const res = await axios.get(`/api/admin/voucher/verify/${id}`);
        console.log(res);
        if (res.data.data) {
          console.log(res.data);
          dispatch(getVoucher({ ...res.data.data }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    getVoucherDetails();
  }, [dispatch, id]);

  function capitalizeWords(sentence) {
    // Split the sentence into an array of words
    let words = sentence?.split(" ");

    // Iterate over each word
    for (let i = 0; i < words?.length; i++) {
      // Capitalize the first letter of each word
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a sentence
    return words?.join(" ");
  }

  function formatDate(dateString) {
    // Parse the date string
    const date = new Date(dateString);
    // console.log(date);
    if (voucher?.createdAt) {
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const timeOptions = { hour: "numeric", minute: "numeric" };

      // Format the date and time according to options
      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

      return `${formattedDate} at ${formattedTime}`;
    }
    return;
  }

  return (
    <section className="min-h-screen pt-8 pb-20">
      <div className="mb-3">
        <GoBack />
      </div>

      <div>
        <h3 className="font-semibold text-primary text-xl">Voucher Details</h3>

        {voucher?.customer?.name ? (
          <>
            <div className="h-48 w-48 mt-5 rounded-lg overflow-hidden mx-auto">
              <Image
                className="h-full w-full object-cover"
                src=""
                alt={voucher?.customer?.name}
                height={500}
                width={500}
              />
            </div>
            <div className="mt-4">
              <DetailList
                title="Full Name"
                value={capitalizeWords(voucher?.customer?.name)}
                icon={<FaUser size={16} />}
              />
              <DetailList
                title="Email"
                value={voucher?.customer?.email}
                icon={<MdEmail size={16} />}
              />
              <DetailList
                title="Phone Number"
                value={voucher?.customer?.phoneNumber}
                icon={<BsFillTelephoneFill size={16} />}
              />
              <DetailList
                title="Address"
                value={voucher?.customer?.address}
                icon={<FaLocationDot size={16} />}
              />
              <DetailList
                title="Product"
                value={capitalizeWords(voucher?.product?.productName)}
                icon={<ImDroplet size={16} />}
              />
              <DetailList
                title="Created At"
                value={formatDate(voucher?.createdAt)}
                // value={voucher?.createdAt}
                icon={<IoIosTime size={16} />}
              />
            </div>

            <div className="">
              {/* <button
                onClick={editVoucher}
                className="btn bg-primary w-full mt-5"
              >
                Edit Voucher
              </button> */}

              {/* <button className="btn bg-primary w-full mt-5">
                Approve Voucher
              </button> */}
              <button className="btn bg-error w-full mt-5">
                Delete Voucher
              </button>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
