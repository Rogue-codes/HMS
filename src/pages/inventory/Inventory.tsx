import { useState } from "react";
import Tab from "../../components/tabs/Tab";
import { AiOutlinePlus } from "react-icons/ai";
import { drugArr } from "../../utils";
import InventoryTR from "../../components/table/InventoryTR";
import { FormikErrors, useFormik } from "formik";
import { DrugFormValues, SelectOptions } from "../../types/interface";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Backdrop from "../../widgets/modal/Backdrop";
import { LiaTimesSolid } from "react-icons/lia";
import DateSelect from "../../widgets/date-time/DateSelect";
import Select from "../../widgets/select/Select";

export default function Inventory() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabArr: string[] = ["MEDICINE INVENTORY"];

  const [showModal, setShowModal] = useState<boolean>(false);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  const formik = useFormik({
    initialValues: {
      product_name: "",
      type: "",
      price: "",
      in_stock: "",
      expiry_date: "",
      vendor: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (values) => {
      const errors: FormikErrors<DrugFormValues> = {};
      if (!values.product_name) {
        errors.product_name = "Product name is Required";
      }
      if (!values.type) {
        errors.type = "Type is Required";
      }
      if (!values.price) {
        errors.price = "price is Required";
      }
      if (!values.in_stock) {
        errors.in_stock = "Quantity is Required";
      }
      if (!values.expiry_date) {
        errors.expiry_date = "Expiry_date is Required";
      }
      if (!values.vendor) {
        errors.vendor = "Vendor is Required";
      }
      return errors;
    },
  });

  // options Array
  const selectArr: SelectOptions[] = [
    {
      value: "In Stock",
      label: "In Stock",
    },
    {
      value: "out of Stock",
      label: "out of Stock",
    },
  ];

  const productTypeArr: SelectOptions[] = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "Tablet",
      label: "Tablet",
    },
    {
      value: "Capsule",
      label: "Capsule",
    },
    {
      value: "Syrup",
      label: "Syrup",
    },
    {
      value: "Inhaler",
      label: "Inhaler",
    },
    {
      value: "Cream",
      label: "Cream",
    },
    {
      value: "Soap",
      label: "Soap",
    },
  ];

  return (
    <div className="w-[80%] ml-[20%] pb-12">
      <div className=" rounded-lg shadow-[rgba(17,17,26,0.1)0px_1px_0px] bg-white">
        <div className="pt-9 flex justify-between items-center pb-2 border-b border-[#CFCFCF] pr-9">
          <Tab
            data={tabArr}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <button
            className="bg-blue-1 p-2 text-xs flex justify-start gap-3 items-center rounded-lg text-white hover:scale-105 transition-all"
            onClick={() => setShowModal(true)}
          >
            <AiOutlinePlus size="15" /> New Product
          </button>
        </div>

        <div className="pt-8 px-9 flex justify-start gap-10 items-center">
          <div>
            <input
              type="search"
              className="w-[14rem] text-sm bg-[#EBF5FF] py-2 px-3 rounded-xl placeholder:text-xs focus:outline-none"
              placeholder="Search"
              name=""
              id=""
            />
          </div>

          <Select selectArr={productTypeArr} />

          <Select selectArr={selectArr} />

          <DateSelect
            className="border border-blue-1 w-full items-center rounded-lg text-lg p-2"
            placeholderText="Expiry date"
            selected={expiryDate}
            onChange={(date) => {
              setExpiryDate(date);
            }}
            type="form"
          />
        </div>

        <div className="relative py-9 w-full mt-6">
          <table className="w-full">
            <thead>
              <tr className="h-12 text-[#242222] text-xs">
                <th>Product Name</th>
                <th>Type</th>
                <th>Price (Per Pack)</th>
                <th>In Stock</th>
                <th>Expiry Date</th>
                <th>Vendor</th>
                <th>User Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {drugArr.map((item, index) => (
                <InventoryTR item={item} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AnimatePresence
        initial={false}
        // exitBeforeEnter={true}
        mode="wait"
        onExitComplete={() => null}
      >
        {showModal && (
          <Backdrop>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-[80%] mx-auto lg:w-[40%] relative bg-[#fff] px-9 py-16 shadow-2xl rounded-md"
            >
              <LiaTimesSolid
                className="absolute text-lg cursor-pointer hover:scale-110 transition-all text-text-2 right-4 top-4"
                onClick={() => setShowModal(false)}
              />
              <p className="text-blue-1 mb-5 text-sm font-bold">Add Product</p>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="w-full">
                  <input
                    type="text"
                    value={formik.values.product_name}
                    onChange={formik.handleChange}
                    className={`${
                      formik.touched.product_name &&
                      formik.errors.product_name &&
                      "border border-red-500 bg-red-100"
                    } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                    placeholder="Product name"
                    name="product_name"
                    id="product_name"
                  />
                  {formik.touched.product_name && formik.errors.product_name ? (
                    <p className="text-red-600 text-xs">
                      {formik.errors.product_name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full mt-5 flex justify-between items-center">
                  <div className="w-[48%]">
                    <select
                      name="type"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      id="type"
                      className={`${
                        formik.touched.type &&
                        formik.errors.type &&
                        "border border-red-500 bg-red-100"
                      } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-xs`}
                    >
                      <option value="">Select Type</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Inhaler">Inhaler</option>
                      <option value="Cream">Cream</option>
                      <option value="Soap">Soap</option>
                    </select>
                    {formik.touched.type && formik.errors.type ? (
                      <p className="text-red-600 text-xs">
                        {formik.errors.type}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-[48%] rounded-lg">
                    <input
                      type="text"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      className={`${
                        formik.touched.price &&
                        formik.errors.price &&
                        "border border-red-500 bg-red-100"
                      } w-full rounded-lg px-2 py-3 focus:outline-none shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                      placeholder="Price"
                      name="price"
                      id="price"
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <p className="text-red-600 text-xs">
                        {formik.errors.price}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="w-full flex justify-between items-center">
                  <div className="w-[48%] mt-5">
                    <input
                      type="text"
                      value={formik.values.in_stock}
                      onChange={formik.handleChange}
                      name="in_stock"
                      id="in_stock"
                      className={`${
                        formik.touched.in_stock &&
                        formik.errors.in_stock &&
                        "border border-red-500 bg-red-100"
                      } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-sm`}
                      placeholder="Quantity"
                    />
                    {formik.touched.in_stock && formik.errors.in_stock ? (
                      <p className="text-red-600 text-xs">
                        {formik.errors.in_stock}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-[48%] mt-5">
                    <DateSelect
                      className="hover:border hover:border-blue-1 w-full items-center shadow-[0px_0px_12px_rgba(16,39,81,0.17)] rounded-lg text-lg p-3"
                      placeholderText="Add date"
                      selected={expiryDate}
                      onChange={(date) => {
                        setExpiryDate(date);
                      }}
                      minDate={new Date()}
                      type="form"
                    />
                  </div>
                </div>

                <div className="w-full mt-5">
                  <select
                    name="vendor"
                    value={formik.values.vendor}
                    onChange={formik.handleChange}
                    id="vendor"
                    className={`${
                      formik.touched.vendor &&
                      formik.errors.vendor &&
                      "border border-red-500 bg-red-100"
                    } w-full focus:outline-none rounded-lg px-2 py-3 shadow-[3px_3px_6px_0px_rgba(182,190,196,0.15),-1.5px_-1.5px_6px_0px_rgba(182,190,196,0.15)] placeholder:text-xs text-xs`}
                  >
                    <option value="">Select Vendor</option>
                    <option value="Emzor pharmaceuticals">
                      Emzor pharmaceuticals
                    </option>
                    <option value="Chikason">Chikason</option>
                    <option value="Emma Bros">Emma Bros</option>
                    <option value="Orange life">Orange life</option>
                  </select>
                  {formik.touched.vendor && formik.errors.vendor ? (
                    <p className="text-red-600 text-xs">
                      {formik.errors.vendor}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <button className="w-full p-3 bg-blue-1 text-white mt-5 rounded-lg hover:scale-105 transition-all">
                  Submit
                </button>
              </form>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </div>
  );
}
