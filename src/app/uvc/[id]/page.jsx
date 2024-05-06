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

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { voucher } = useSelector((state) => state.voucher);

  console.log(voucher);

  useEffect(() => {
    const getVoucherDetails = async () => {
      try {
        // const resCollectedVouchers = await axios.get(
        //   `/api/admin/voucher?product_name=${productName}&verifiedBy=${personnelId}&collected=true&av4D&customer=${search}&take=${take}&pageNumber=${pageNumber}`
        // );
        const res = await axios.get(`/api/admin/voucher/verify/${id}`);
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
    if (voucher.voucherDispense) {
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
                src={voucher?.customer?.profilePicture}
                alt={voucher?.customer?.name}
                height={500}
                width={500}
              />
            </div>
            <div className="mt-4">
              <DetailList
                title="Voucher Name"
                value={capitalizeWords(voucher?.customer?.name)}
                icon={<FaUser size={16} />}
              />
              <DetailList
                title="Voucher Number"
                value={voucher?.voucherCode}
                icon={<MdEmail size={16} />}
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
                value={capitalizeWords(voucher?.product?.name)}
                icon={<ImDroplet size={16} />}
              />
              <DetailList
                title="Amount Allocated"
                value={voucher?.product?.voucherAllocated}
                icon={<MdAssignmentTurnedIn size={16} />}
              />
              <DetailList
                title="Point of Collection"
                value={capitalizeWords(voucher?.voucherDispense?.poc?.name)}
                icon={<BsFillFuelPumpDieselFill size={16} />}
              />
              <DetailList
                title="Verified By"
                value={capitalizeWords(
                  voucher?.voucherDispense?.verifiedBy?.user?.name
                )}
                icon={<FaUser size={16} />}
              />
              <DetailList
                title="Phone of Verified By"
                value={capitalizeWords(
                  voucher?.voucherDispense?.verifiedBy?.user?.phoneNumber
                )}
                icon={<BsFillTelephoneFill size={16} />}
              />
              <DetailList
                title="Dispensed On"
                value={formatDate(voucher?.voucherDispense?.dateUsed)}
                icon={<BsFillTelephoneFill size={16} />}
              />
              <DetailList
                title="Third Party"
                value={voucher?.voucherDispense?.thirdParty ? "Yes" : "No"}
                icon={<BsPeopleFill size={16} />}
              />
              <DetailList
                title="Name of Pick up Person"
                value={
                  voucher?.voucherDispense?.thirdParty
                    ? capitalizeWords(voucher?.voucherDispense?.thirdPartyName)
                    : capitalizeWords(voucher?.customer?.name)
                }
                icon={<FaUser size={16} />}
              />
              <DetailList
                title="Vehicle Type"
                value={voucher?.voucherDispense?.vehicleType}
                icon={<FaCarSide size={16} />}
              />
              <DetailList
                title="Vehicle Plate Number"
                value={voucher?.voucherDispense?.vehicleNumber}
                icon={<FaBarcode size={16} />}
              />
              <DetailList
                title="Phone Number of Pick Up Person"
                value={
                  voucher?.voucherDispense?.thirdParty
                    ? voucher?.voucherDispense?.thirdPartyPhone
                    : voucher?.customer?.phoneNumber
                }
                icon={<BsFillTelephoneFill size={16} />}
              />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
