export function signIn_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  //validation password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be at least 6 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function new_customer_validate(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = "Required";
  }
  // if (!values.address) {
  //   errors.address = "Required";
  // }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }
  return errors;
}

export function new_voucher_validate(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!values.product || values.product === "Select product") {
    errors.product = "Please select a product";
  }
  return errors;
}

export function approve_voucher_validate(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!values.product || values.product === "Select product") {
    errors.product = "Please select a product";
  }

  if (!values.poc || values.poc === "Select POC") {
    errors.poc = "Please select a POC";
  }

  if (!values.phone_of_pick_up_person) {
    errors.phone_of_pick_up_person = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone_of_pick_up_person)) {
    errors.phone_of_pick_up_person = "Invalid phone number";
  }

  if (!values.vehicle_type) {
    errors.vehicle_type = "Required";
  }
  if (!values.vehicle_plate_number) {
    errors.vehicle_plate_number = "Required";
  }
  if (!values.pick_up_person) {
    errors.pick_up_person = "Required";
  }
  //  pick_up_person: "",
  //     vehicle_type: "",
  //     vehicle_plate_number: "",
  //     phone_of_pick_up_person: "",

  return errors;
}

export function product_validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.allocation_per_voucher) {
    errors.allocation_per_voucher = "Required";
  }
  if (!values.unit) {
    errors.unit = "Required";
  }

  return errors;
}
export function poc_validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (!values.available) {
    errors.available = "Required";
  }
  if (!values.limit) {
    errors.limit = "Required";
  }

  if (!values.product || values.product === "Select product") {
    errors.product = "Please select a product";
  }

  if (!values.personnel || values.personnel === "Select personnel") {
    errors.personnel = "Please select a personnel";
  }
  if (!values.management || values.management === "Select management") {
    errors.management = "Please select management";
  }

  return errors;
}

export function personnel_validate(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.role) {
    errors.role = "Required";
  }
  if (!values.gender) {
    errors.gender = "Required";
  }

  return errors;
}

export function edit_profile_validate(values) {
  const errors = {};

  if (!values.fullName) {
    errors.fullName = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!values.address) {
    errors.address = "Required";
  }

  return errors;
}
export function edit_password_validate(values) {
  const errors = {};

  if (
    !values.password ||
    (values.password === "" && values.newPassword !== "")
  ) {
    errors.password = "Required";
  } else if (values.password !== "" && values.password.length < 6) {
    errors.password = "Must be at least 6 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (values.newPassword && values.newPassword.length < 6) {
    errors.newPassword = "Must be at least 6 characters";
  } else if (values.newPassword.includes(" ")) {
    errors.newPassword = "Invalid Password";
  }

  return errors;
}
