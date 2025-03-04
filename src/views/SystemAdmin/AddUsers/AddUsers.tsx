import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Container from "../../../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "../../../components/Divider";
import { useFormik } from "formik";
import { addUserValidation } from "../../../utils";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface FormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  employeeId: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  tradingPartners: string[];
  dateOfJoining: Date | null;
  status: string;
  notes: string;
}

const AddUsers = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const jobOptions = ["Business Admin", "Manager"];
  const roleOptions = ["Admin", "Manager"];
  const tradingPartners = ["Walmart", "CVS"];

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
      department: "",
      employeeId: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      tradingPartners: [],
      dateOfJoining: dayjs(new Date()),
      status: "active",
      notes: "",
    },
    validationSchema: addUserValidation,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading">
                {!user_id
                  ? " Add Business Users/Managers"
                  : "Update Business Users/Managers"}
              </Typography>
              <Separator />
            </Grid>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {[
                { label: "Full Name", name: "fullName" },
                { label: "Email Address", name: "email" },
                { label: "Phone Number", name: "phoneNumber" },
                { label: "Department", name: "department" },
                { label: "Employee ID", name: "employeeId" },
              ].map((field) => (
                <Grid size={{ xs: 12, md: 4 }} key={field.name}>
                  <TextField
                    fullWidth
                    size="small"
                    label={field.label}
                    name={field.name}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    error={
                      !!formik.errors[field.name] && formik.touched[field.name]
                    }
                    helperText={
                      formik.errors[field.name] && formik.touched[field.name]
                        ? formik.errors[field.name]
                        : ""
                    }
                  />
                </Grid>
              ))}

              {/* Job Title */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  name="jobTitle"
                  id="jobTitle"
                  size="small"
                  fullWidth
                  label="Job Title"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                >
                  {jobOptions.map((job) => (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Typography variant="h5" sx={{ mt: 3, width: "100%" }}>
                Account Details
              </Typography>

              {/* Account Details */}
              {[
                { label: "Username", name: "username" },
                { label: "Password", name: "password", type: "password" },
                {
                  label: "Confirm Password",
                  name: "confirmPassword",
                  type: "password",
                },
              ].map((field) => (
                <Grid size={{ xs: 12, md: 4 }} key={field.name}>
                  <TextField
                    fullWidth
                    size="small"
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    error={
                      !!formik.errors[field.name] && formik.touched[field.name]
                    }
                    helperText={
                      formik.errors[field.name] && formik.touched[field.name]
                        ? formik.errors[field.name]
                        : ""
                    }
                  />
                </Grid>
              ))}

              <Typography variant="h5" sx={{ mt: 3, width: "100%" }}>
                Permissions
              </Typography>

              {/* Role Selection */}
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  name="role"
                  id="role"
                  size="small"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  {roleOptions.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Assigned Trading Partners */}
              <Grid size={{ xs: 12, md: 12 }}>
                <Autocomplete
                  multiple
                  id="tradingPartners"
                  name="tradingPartners"
                  options={tradingPartners}
                  value={formik.values.tradingPartners}
                  onChange={(event, newValue) =>
                    formik.setFieldValue("tradingPartners", newValue)
                  }
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assigned Trading Partners"
                      size="small"
                      fullWidth
                    />
                  )}
                  renderOption={(props, option, state) => (
                    <li {...props}>
                      <Checkbox checked={state.selected} />
                      {option}
                    </li>
                  )}
                />
              </Grid>

              <Typography variant="h5" sx={{ mt: 3, width: "100%" }}>
                Additional Information
              </Typography>

              {/* Additional Information */}
              <Grid size={{ xs: 12, md: 4 }}>
                {/* <TextField
                  fullWidth
                  type="date"
                  size="small"
                  name="dateOfJoining"
                  value={formik.values.dateOfJoining}
                  onChange={formik.handleChange}
                /> */}
                <FormControl fullWidth className="date-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Date of Joining"
                        className="effective-date"
                        name="dateOfJoining"
                        id="dateOfJoining"
                        value={dayjs(formik.values.dateOfJoining)}
                        onChange={(date) => {
                          formik.setValues({
                            ...formik.values,
                            dateOfJoining: date?.$d,
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <FormHelperText>
                    {formik.touched.dateOfJoining &&
                      formik.errors.dateOfJoining}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  id="status"
                  size="small"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  label="Notes/Comments"
                  name="notes"
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid size={12} className="submit-div">
                <Button type="submit" fullWidth className="btn-submit">
                  {user_id ? "Update" : "Save"}
                </Button>
                <Button
                  className="btn-clear"
                  onClick={() => navigate("/search-ba")}
                  fullWidth
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default AddUsers;
