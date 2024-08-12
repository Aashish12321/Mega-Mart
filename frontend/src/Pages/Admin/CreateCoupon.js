import React, { useState } from "react";

const CreateCoupon = () => {
  const [formData, setFormData] = useState({
    code: "",
    discount: 0,
    discountType: "percentage",
    validUntil: "",
    minimumOrderValue: 0,
    applicableProducts: [],
    createdBy: "platform", // or 'vendor' depending on who is creating it
    vendorId: "", // fill this only if createdBy is 'vendor'
  });
  return (
    <div className="w-full border-2">

    </div>
  )
};

export default CreateCoupon;
