// validationSchema.js
import * as Yup from "yup";

//Host Key Upload validations.
export const uploadKeyValidation = Yup.object({
  version: Yup.string().required("Version is required"),
  keyEncrypt: Yup.string().required("Key type is required"),
  keyLength: Yup.string().required("Key length is required"),
  url: Yup.string().required("URL is required"),
  description: Yup.string().required("Description is required"),
  changeRequestId: Yup.string().required("Change request ID is required"),
  effectiveDate: Yup.date().required("Effective date is required"),
  hostKey: Yup.mixed()
    .required("Host key file is required")
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024;
    }),
});

//Create key validations.
export const keyValidation = Yup.object({
  sftpLoginId: Yup.string().required("SFTP Login ID is required"),
  auth_type: Yup.string().required("Auth type is required"),
  password: Yup.string().test(
    "password-required",
    "Password is required",
    function (value) {
      const { auth_type } = this.parent;
      if (auth_type === "password" && !value) {
        return this.createError({ message: "Password is required" });
      }
      return true;
    }
  ),
  keyFile: Yup.mixed().test(
    "key-file-required",
    "Key file is required",
    function (value) {
      const { auth_type } = this.parent;
      if (auth_type === "key" && !value) {
        return this.createError({ message: "Key file is required" });
      }
      return true;
    }
  ),
});

//Update contact validations.
export const updateContactValidation = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[a-zA-Z\s]*$/, "First Name can only contain letters and spaces"),

  lastName: Yup.string()
    .required("Last Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Last Name can only contain letters and spaces"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  directContactNo: Yup.string().required("Direct Contact No is required"),

  role: Yup.string()
    .required("Role is required")
    .oneOf(["Admin", "User", "Viewer"], "Invalid role"),
});

//Add Business user/managers validations.
export const addUserValidation = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  jobTitle: Yup.string().required("Job Title is required"),
  department: Yup.string().required("Department is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Role is required"),
  tradingPartners: Yup.array()
    .min(1, "At least one trading partner must be selected")
    .required("Trading Partners are required"),
  dateOfJoining: Yup.date().required("Date of Joining is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"], "Status must be 'active' or 'inactive'")
    .required("Status is required"),
  notes: Yup.string().optional(), // You can keep this optional if needed
});
