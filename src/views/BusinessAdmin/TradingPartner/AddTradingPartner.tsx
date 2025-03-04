import { useState } from "react";
import {
  Grid2 as Grid,
  TextField,
  Button,
  InputLabel,
  Typography,
  Box,
  Autocomplete,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useFormik } from "formik";
import { Add, Remove } from "@mui/icons-material";
import Container from "../../../components/Container";
import { Separator } from "../../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../../../components/Popup";

interface FormValues {
  tradingPartnerName: string;
  businessUnit: string;
  contactPersons: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
  }[];
  sftpLoginIds: { loginId: string; password: string }[];
  cimsPartnerIds: { loginId: string; partnerId: string }[];
}

export default function AddTradingPartner() {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [success, setSuccess] = useState(false);

  // Function to submit form
  const handleAddPartner = (data: any) => {
    console.log("data", data);
    setSuccess(true);
  };

  // Formik definition
  const partnerForm = useFormik<FormValues>({
    initialValues: {
      tradingPartnerName: "",
      businessUnit: "",
      contactPersons: [
        // { firstName: "", lastName: "", email: "", phone: "", role: "" },
      ],
      sftpLoginIds: [],
      cimsPartnerIds: [],
    },
    onSubmit: handleAddPartner,
  });

  // Add new contact person
  const handleAddContactPerson = () => {
    partnerForm.setValues({
      ...partnerForm.values,
      contactPersons: [
        ...partnerForm.values.contactPersons,
        { firstName: "", lastName: "", email: "", phone: "", role: "" },
      ],
    });
  };

  // Remove contact person
  const handleRemoveContactPerson = (index: number) => {
    const newContactPersons = partnerForm.values.contactPersons.filter(
      (_, idx) => idx !== index
    );
    partnerForm.setValues({
      ...partnerForm.values,
      contactPersons: newContactPersons,
    });
  };

  // Add new sFTP Login with password
  const handleAddSFTPLogin = () => {
    partnerForm.setValues({
      ...partnerForm.values,
      sftpLoginIds: [
        ...partnerForm.values.sftpLoginIds,
        { loginId: "", password: "" },
      ],
    });
  };

  // Add new CIMS Partner with autocomplete and partner ID
  const handleAddCIMSPartner = () => {
    partnerForm.setValues({
      ...partnerForm.values,
      cimsPartnerIds: [
        ...partnerForm.values.cimsPartnerIds,
        { loginId: [], partnerId: "" },
      ],
    });
  };

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            {user_id ? "Update Trading Partner" : " Add Trading Partner"}
          </Typography>
          <Separator />

          <form onSubmit={partnerForm.handleSubmit}>
            <Grid container spacing={2} className="form-grid">
              {/* Trading Partner Identification */}
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="tradingPartnerName">
                  Trading Partner Name*:
                </InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Trading Partner Name"
                  size="small"
                  id="tradingPartnerName"
                  name="tradingPartnerName"
                  value={partnerForm.values.tradingPartnerName}
                  onBlur={partnerForm.handleBlur}
                  onChange={partnerForm.handleChange}
                  error={
                    partnerForm.touched.tradingPartnerName &&
                    Boolean(partnerForm.errors.tradingPartnerName)
                  }
                  helperText={
                    partnerForm.touched.tradingPartnerName &&
                    partnerForm.errors.tradingPartnerName
                  }
                />
              </Grid>

              {/* Business Unit */}
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="businessUnit">Business Unit*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Business Unit"
                  size="small"
                  id="businessUnit"
                  name="businessUnit"
                  value={partnerForm.values.businessUnit}
                  onBlur={partnerForm.handleBlur}
                  onChange={partnerForm.handleChange}
                  error={
                    partnerForm.touched.businessUnit &&
                    Boolean(partnerForm.errors.businessUnit)
                  }
                  helperText={
                    partnerForm.touched.businessUnit &&
                    partnerForm.errors.businessUnit
                  }
                />
              </Grid>

              {/* Contact Persons */}
              <Grid size={12}>
                <Typography variant="h6" className="heading-small">
                  Contact Persons
                </Typography>
                {partnerForm.values.contactPersons.map((contact, index) => (
                  <Box
                    key={index}
                    padding={2}
                    marginBottom={2}
                    className="contact-box"
                  >
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <TextField
                          fullWidth
                          placeholder="First Name"
                          size="small"
                          id={`contactPersons[${index}].firstName`}
                          name={`contactPersons[${index}].firstName`}
                          value={contact.firstName}
                          onBlur={partnerForm.handleBlur}
                          onChange={partnerForm.handleChange}
                          error={
                            partnerForm.touched.contactPersons?.[index]
                              ?.firstName &&
                            Boolean(
                              partnerForm.errors.contactPersons?.[index]
                                ?.firstName
                            )
                          }
                          helperText={
                            partnerForm.touched.contactPersons?.[index]
                              ?.firstName &&
                            partnerForm.errors.contactPersons?.[index]
                              ?.firstName
                          }
                        />
                      </Grid>

                      <Grid size={6}>
                        <TextField
                          fullWidth
                          placeholder="Last Name"
                          size="small"
                          id={`contactPersons[${index}].lastName`}
                          name={`contactPersons[${index}].lastName`}
                          value={contact.lastName}
                          onBlur={partnerForm.handleBlur}
                          onChange={partnerForm.handleChange}
                          error={
                            partnerForm.touched.contactPersons?.[index]
                              ?.lastName &&
                            Boolean(
                              partnerForm.errors.contactPersons?.[index]
                                ?.lastName
                            )
                          }
                          helperText={
                            partnerForm.touched.contactPersons?.[index]
                              ?.lastName &&
                            partnerForm.errors.contactPersons?.[index]?.lastName
                          }
                        />
                      </Grid>

                      <Grid size={6}>
                        <TextField
                          fullWidth
                          placeholder="Email"
                          size="small"
                          id={`contactPersons[${index}].email`}
                          name={`contactPersons[${index}].email`}
                          value={contact.email}
                          onBlur={partnerForm.handleBlur}
                          onChange={partnerForm.handleChange}
                          error={
                            partnerForm.touched.contactPersons?.[index]
                              ?.email &&
                            Boolean(
                              partnerForm.errors.contactPersons?.[index]?.email
                            )
                          }
                          helperText={
                            partnerForm.touched.contactPersons?.[index]
                              ?.email &&
                            partnerForm.errors.contactPersons?.[index]?.email
                          }
                        />
                      </Grid>

                      <Grid size={6}>
                        <TextField
                          fullWidth
                          placeholder="Phone"
                          size="small"
                          id={`contactPersons[${index}].phone`}
                          name={`contactPersons[${index}].phone`}
                          value={contact.phone}
                          onBlur={partnerForm.handleBlur}
                          onChange={partnerForm.handleChange}
                          error={
                            partnerForm.touched.contactPersons?.[index]
                              ?.phone &&
                            Boolean(
                              partnerForm.errors.contactPersons?.[index]?.phone
                            )
                          }
                          helperText={
                            partnerForm.touched.contactPersons?.[index]
                              ?.phone &&
                            partnerForm.errors.contactPersons?.[index]?.phone
                          }
                        />
                      </Grid>

                      <Grid size={6}>
                        <TextField
                          fullWidth
                          placeholder="Role"
                          size="small"
                          id={`contactPersons[${index}].role`}
                          name={`contactPersons[${index}].role`}
                          value={contact.role}
                          onBlur={partnerForm.handleBlur}
                          onChange={partnerForm.handleChange}
                          error={
                            partnerForm.touched.contactPersons?.[index]?.role &&
                            Boolean(
                              partnerForm.errors.contactPersons?.[index]?.role
                            )
                          }
                          helperText={
                            partnerForm.touched.contactPersons?.[index]?.role &&
                            partnerForm.errors.contactPersons?.[index]?.role
                          }
                        />
                      </Grid>

                      {/* Remove Contact Person Button */}
                      <Grid size={12}>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Remove />}
                          onClick={() => handleRemoveContactPerson(index)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={handleAddContactPerson}
                  className="add-row-btn"
                >
                  Add Contact
                </Button>
              </Grid>
              {/* Add Multiple sFTP Login IDs */}
              <Grid size={12}>
                <Typography variant="h6" className="heading-small">
                  sFTP Login IDs
                </Typography>
                {partnerForm.values.sftpLoginIds.map((item, index) => (
                  <Grid container key={index} spacing={2}>
                    <Grid size={5} className="mb-10">
                      <TextField
                        fullWidth
                        placeholder="Enter sFTP Login ID"
                        size="small"
                        value={item.loginId}
                        onChange={(e) => {
                          const newIds = [...partnerForm.values.sftpLoginIds];
                          newIds[index].loginId = e.target.value;
                          partnerForm.setValues({
                            ...partnerForm.values,
                            sftpLoginIds: newIds,
                          });
                        }}
                      />
                    </Grid>
                    <Grid size={5} className="mb-10">
                      <TextField
                        fullWidth
                        placeholder="Enter Password"
                        size="small"
                        value={item.password}
                        onChange={(e) => {
                          const newIds = [...partnerForm.values.sftpLoginIds];
                          newIds[index].password = e.target.value;
                          partnerForm.setValues({
                            ...partnerForm.values,
                            sftpLoginIds: newIds,
                          });
                        }}
                      />
                    </Grid>
                    <Grid size={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Remove />}
                        onClick={() => {
                          const newIds = partnerForm.values.sftpLoginIds.filter(
                            (_, idx) => idx !== index
                          );
                          partnerForm.setValues({
                            ...partnerForm.values,
                            sftpLoginIds: newIds,
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={handleAddSFTPLogin}
                  className="add-row-btn"
                >
                  Add
                </Button>
              </Grid>
              {/* Add Multiple CIMS Partner IDs */}
              <Grid size={12}>
                <Typography variant="h6" className="heading-small">
                  CIMS Partner IDs
                </Typography>
                {partnerForm.values.cimsPartnerIds.map((item, index) => (
                  <Grid container key={index} spacing={2}>
                    <Grid size={5} className="mb-10">
                      <Autocomplete
                        multiple
                        freeSolo
                        options={["user1", "user2", "user3", "user4", "user5"]} // Random login options
                        value={item.loginIds}
                        onChange={(event, newValue) => {
                          const newIds = [...partnerForm.values.sftpLoginIds];
                          // This should be cimsPartnerIds, not sftpLoginIds
                          if (!newIds[index]) {
                            newIds[index] = { loginIds: [] }; // Initialize with an empty array
                          }
                          newIds[index].loginIds = newValue || [];
                          // Ensure that the correct field is being updated
                          partnerForm.setValues({
                            ...partnerForm.values,
                            sftpLoginIds: newIds, // This should be cimsPartnerIds
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select sFTP Login IDs"
                            size="small"
                            fullWidth
                          />
                        )}
                        renderOption={(props, option, state) => (
                          <li {...props}>
                            <Checkbox checked={state.selected} />
                            <ListItemText primary={option} />
                          </li>
                        )}
                      />
                    </Grid>
                    <Grid size={5}>
                      <TextField
                        fullWidth
                        placeholder="Enter CIMS Partner ID"
                        size="small"
                        value={item.partnerId}
                        onChange={(e) => {
                          const newIds = [...partnerForm.values.cimsPartnerIds];
                          newIds[index].partnerId = e.target.value;
                          partnerForm.setValues({
                            ...partnerForm.values,
                            cimsPartnerIds: newIds,
                          });
                        }}
                      />
                    </Grid>
                    <Grid size={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Remove />}
                        onClick={() => {
                          const newIds =
                            partnerForm.values.cimsPartnerIds.filter(
                              (_, idx) => idx !== index
                            );
                          partnerForm.setValues({
                            ...partnerForm.values,
                            cimsPartnerIds: newIds,
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  startIcon={<Add />}
                  onClick={handleAddCIMSPartner}
                  className="add-row-btn"
                >
                  {user_id ? "Update" : "Add"}
                </Button>
              </Grid>

              <Grid size={12} className="submit-div">
                <Button type="submit" fullWidth className="btn-submit">
                  Save
                </Button>
                <Button
                  className="btn-clear"
                  onClick={() => {
                    navigate("/trading-partner");
                    partnerForm.resetForm();
                  }}
                  fullWidth
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>

          <Popup
            open={success}
            success
            body="Trading Partner Added Successfully"
            handleSuccess={() => {
              partnerForm.resetForm();
              setSuccess(false);
              navigate("/trading-partner");
            }}
            cancelButton="OK"
            confirmButton="OK"
          />
        </Box>
      </Container>
    </div>
  );
}
