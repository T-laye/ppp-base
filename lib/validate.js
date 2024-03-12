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

export function new_voucher_validate(values) {
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

  if (!values.product || values.product === "Select product") {
    errors.product = "Please select a product";
  }

  if (!values.preferred_poc || values.preferred_poc === "Select POC") {
    errors.preferred_poc = "Please select a POC";
  }

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

// if (!values.gender || values.gender === "Select Gender") {
//   errors.gender = "Please select gender";
// }
// if (!values.designation) {
//   errors.designation = "";
// }

//   if (!values.password) {
//     errors.password = "Required";
//   } else if (values.password.length < 6) {
//     errors.password = "Must be at least 6 characters";
//   } else if (values.password.includes(" ")) {
//     errors.password = "Invalid Password";
//   }

//   return errors;
// }

// export function signUp_location_validate(values) {
//   const errors = {};

//   if (!values.state || values.state === "Select State") {
//     errors.state = "Please select a state";
//   }

//   if (!values.institution || values.institution === "Select Institution") {
//     errors.institution = "Please select an institution";
//   }

//   if (!values.location || values.location === "Select Location") {
//     errors.location = "Please select a location";
//   }

//   return errors;
// }

// export function forgotPassword_validate(values) {
//   const errors = {};

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   return errors;
// }
// export function resetPassword_validate(values) {
//   const errors = {};
//   //validation password
//   if (!values.password) {
//     errors.password = "Required";
//   } else if (values.password.length < 6) {
//     errors.password = "Must be at least 6 characters";
//   } else if (values.password.includes(" ")) {
//     errors.password = "Invalid Password";
//   }

//   if (!values.cPassword) {
//     errors.cPassword = "Required";
//   } else if (values.password !== values.cPassword) {
//     errors.cPassword = "Password doesn't match";
//   }
//   return errors;
// }

// export function stustler_registration(values) {
//   const errors = {};

//   if (!values.brandName) {
//     errors.brandName = "Required";
//   }

//   if (!values.brandEmail) {
//     errors.brandEmail = "Required";
//   } else if (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.brandEmail)
//   ) {
//     errors.brandEmail = "Invalid email address";
//   }

//   if (!values.state || values.state === "Select State") {
//     errors.state = "Please select a state";
//   }

//   if (!values.institution || values.institution === "Select Institution") {
//     errors.institution = "Please select an institution";
//   }

//   if (!values.location || values.location === "Select Location") {
//     errors.location = "Please select a location";
//   }

//   if (!values.hustleCategory || values.hustleCategory === "Hustle Category") {
//     errors.hustleCategory = "Please select a hustle category";
//   }

//   if (!values.hustle || values.hustle === "Hustle") {
//     errors.hustle = "Add hustle title";
//   }

// if (!values.address) {
//   errors.address = 'Required';
// }

// if (!values.businessPhone) {
//   errors.businessPhone = "Required";
// } else if (!/^\+?\d{10,}$/i.test(values.businessPhone)) {
//   errors.businessPhone = "Invalid phone number";
// }

// if (!values.link) {
//   errors.link = 'Required';
// } else if (values.link.includes(' ')) {
//   errors.link = 'Invalid link';
// }

//   if (!values.hustleDescription) {
//     errors.hustleDescription = "Required";
//   } else if (values.hustleDescription.length > 350) {
//     errors.hustleDescription = "Exceeded maximum character limit";
//   }

//   return errors;
// }
// export function post_job(values) {
//   const errors = {};

//   if (!values.jobTitle || values.jobTitle === "Select job title") {
//     errors.jobTitle = "Please select job title";
//   }

//   if (!values.jobCategory || values.jobCategory === "Select job category") {
//     errors.jobCategory = "Please select job category";
//   }

//   if (!values.jobType || values.jobType === "Select job type") {
//     errors.jobType = "Please select job type";
//   }

//   if (!values.jobLocation) {
//     errors.jobLocation = "Please add job location";
//   }

//   if (!values.jobDescription) {
//     errors.jobDescription = "Please add job description";
//   } else if (values.jobDescription.length > 500) {
//     errors.jobDescription = "Exceeded maximum character limit";
//   }

//   return errors;
// }

// export function update_validate(values) {
//   const errors = {};

//   if (!values.firstName) {
//     errors.firstName = "Required";
//   }
//   if (!values.lastName) {
//     errors.lastName = "Required";
//   }
//   if (!values.firstName && values.lastName) {
//     errors.firstName = "Required";
//   }

//   return errors;
// }

// export function update_password_validate(values) {
//   const errors = {};

//   if (!values.oldPassword) {
//     errors.oldPassword = "Required";
//   } else if (values.oldPassword.length < 6) {
//     errors.oldPassword = "Must be at least 6 characters";
//   } else if (values.oldPassword.includes(" ")) {
//     errors.oldPassword = "Invalid Password";
//   }

//   if (!values.newPassword) {
//     errors.newPassword = "Required";
//   } else if (values.newPassword.length < 6) {
//     errors.newPassword = "Must be at least 6 characters";
//   } else if (values.newPassword.includes(" ")) {
//     errors.newPassword = "Invalid Password";
//   }

//   return errors;
// }

// export function chat_validate(values) {
//   const errors = {};

//   if (!values.chat || values.chat.trim() === " ") {
//     errors.chat = "";
//   }
// }
