import React from "react";
import QuantityCards from "../../components/QuantityCards";

export default function Product() {
  return (
    <section className="py-4 bg-red-40 min-h-screen">
      <h4 className="font-medium text-base mt-2">Product Stats</h4>
      {/* <h4 className="text-sm ">Hello, Admin</h4> */}
      <div>
        <QuantityCards title="Total Level" available={500} total={1000} />
        <QuantityCards title="Fuel Level" available={420} total={600} />
        <QuantityCards title="Desiel Level" available={80} total={400} />
      </div>

      <div>
        <h4 className="font-medium text-base mt-6">Product Details</h4>

        <div>
          <div className="bg-custmGray mt-5">
            <h4 className="text-base font-semibold">Fuel</h4>

            <div>
              <form action="">
                <div>
                  <label htmlFor=""></label>
                </div>
              </form>
            </div>
          </div>

          <div>
            {/* <h5>Desiel</h5> */}
          </div>
        </div>
      </div>
    </section>
  );
}
