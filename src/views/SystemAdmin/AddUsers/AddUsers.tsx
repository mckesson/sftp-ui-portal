import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Container from "../../../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "../../../components/Divider";

const AddUsers = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    accessLevel: [],
    tradingPartners: [],
    dateOfJoining: "",
    status: "active",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const jobOptions = ["Business Admin", "Manager"];
  const roleOptions = ["Admin", "Manager"];
  const accessLevels = ["Read", "Write", "Execute"];
  const tradingPartners = ["Partner A", "Partner B", "Partner C"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      accessLevel: checked
        ? [...prev.accessLevel, name]
        : prev.accessLevel.filter((item) => item !== name),
    }));
  };

  const handleMultiSelectChange = (e) => {
    setFormData((prev) => ({ ...prev, tradingPartners: e.target.value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // onClose(); // Close modal after submit
    }
  };

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
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                />
              </Grid>
            ))}

            {/* Job Title */}
            <Grid size={{ xs: 12, md: 4 }}>
              {/* <FormControl fullWidth> */}
              {/* <InputLabel htmlFor="jobTitle">Job Title</InputLabel> */}
              <TextField
                select
                name="jobTitle"
                id="jobTitle"
                size="small"
                fullWidth
                label="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
              >
                {jobOptions.map((job) => (
                  <MenuItem key={job} value={job}>
                    {job}
                  </MenuItem>
                ))}
              </TextField>
              {/* </FormControl> */}
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
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                />
              </Grid>
            ))}

            <Typography variant="h5" sx={{ mt: 3, width: "100%" }}>
              Permissions
            </Typography>

            {/* Role Selection */}
            <Grid size={{ xs: 12, md: 4 }}>
              {/* <FormControl fullWidth>
                <InputLabel htmlFor="role">Role</InputLabel> */}
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                id="role"
                size="small"
                value={formData.role}
                onChange={handleChange}
              >
                {roleOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
              {/* </FormControl> */}
            </Grid>

            {/* Access Level */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography>Access Level</Typography>
              {accessLevels.map((level) => (
                <FormControlLabel
                  key={level}
                  control={
                    <Checkbox
                      name={level}
                      checked={formData.accessLevel.includes(level)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={level}
                />
              ))}
            </Grid>

            {/* Assigned Trading Partners */}
            <Grid size={{ xs: 12, md: 12 }}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tradingPartners">
                  Assigned Trading Partners
                </InputLabel>
                <Select
                  fullWidth
                  multiple
                  size="small"
                  name="tradingPartners"
                  id="tradingPartners"
                  value={formData.tradingPartners}
                  onChange={handleMultiSelectChange}
                >
                  {tradingPartners.map((partner) => (
                    <MenuItem key={partner} value={partner}>
                      {partner}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Typography variant="h5" sx={{ mt: 3, width: "100%" }}>
              Additional Information
            </Typography>

            {/* Additional Information */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="date"
                size="small"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              {/* <FormControl fullWidth>
                <InputLabel htmlFor="status">Status</InputLabel> */}
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                id="status"
                size="small"
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
              {/* </FormControl> */}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Notes/Comments"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
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
        </Box>
      </Container>
    </div>
  );
};

export default AddUsers;
