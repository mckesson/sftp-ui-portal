import { ChangeEvent, useState } from "react";
import {
  Grid2 as Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import Container from "../../../components/Container";
import Popup from "../../../components/Popup";
import { updateContactValidation } from "../../../utils";
import { Separator } from "../../../components/Divider";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  directContactNo: string;
  sftpLoginId: string;
  cimsPartnerId: string;
  role: string;
}

export default function UpdateContact() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  //Function to submit form
  const handleUpdateContact = (data: any) => {
    console.log("data", data);
    setSuccess(true);
  };

  //Formik definition
  const updateForm = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      directContactNo: "",
      sftpLoginId: "jbu3470",
      cimsPartnerId: "LT123456789123",
      role: "",
    },
    validationSchema: updateContactValidation,
    onSubmit: handleUpdateContact,
  });

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Update Contact Information
          </Typography>
          <Separator />
          <form onSubmit={updateForm.handleSubmit}>
            <Grid container spacing={2} className="form-grid">
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="sftpLoginId">SFTP Login ID*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                {/* <TextField
                  fullWidth
                  placeholder="Enter SFTP Login ID"
                  size="small"
                  id="sftpLoginId"
                  name="sftpLoginId"
                  value={updateForm.values.sftpLoginId}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                /> */}
                <Typography>{updateForm.values.sftpLoginId}</Typography>
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="firstName">First Name*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter First Name"
                  size="small"
                  id="firstName"
                  name="firstName"
                  value={updateForm.values.firstName}
                  onBlur={updateForm.handleBlur}
                  onChange={updateForm.handleChange}
                  error={
                    updateForm.touched.firstName &&
                    Boolean(updateForm.errors.firstName)
                  }
                  helperText={
                    updateForm.touched.firstName && updateForm.errors.firstName
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="lastName">Last Name*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Last Name"
                  size="small"
                  id="lastName"
                  name="lastName"
                  value={updateForm.values.lastName}
                  onBlur={updateForm.handleBlur}
                  onChange={updateForm.handleChange}
                  error={
                    updateForm.touched.lastName &&
                    Boolean(updateForm.errors.lastName)
                  }
                  helperText={
                    updateForm.touched.lastName && updateForm.errors.lastName
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="email">Email*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Email"
                  size="small"
                  id="email"
                  name="email"
                  value={updateForm.values.email}
                  onBlur={updateForm.handleBlur}
                  onChange={updateForm.handleChange}
                  error={
                    updateForm.touched.email && Boolean(updateForm.errors.email)
                  }
                  helperText={
                    updateForm.touched.email && updateForm.errors.email
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="directContactNo">
                  Direct Contact No*:
                </InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Direct Contact No"
                  size="small"
                  id="directContactNo"
                  name="directContactNo"
                  value={updateForm.values.directContactNo}
                  onBlur={updateForm.handleBlur}
                  onChange={updateForm.handleChange}
                  error={
                    updateForm.touched.directContactNo &&
                    Boolean(updateForm.errors.directContactNo)
                  }
                  helperText={
                    updateForm.touched.directContactNo &&
                    updateForm.errors.directContactNo
                  }
                />
              </Grid>

              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="role">Role*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Role"
                  size="small"
                  id="role"
                  name="role"
                  value={updateForm.values.role}
                  onBlur={updateForm.handleBlur}
                  onChange={updateForm.handleChange}
                  error={
                    updateForm.touched.role && Boolean(updateForm.errors.role)
                  }
                  helperText={updateForm.touched.role && updateForm.errors.role}
                />
              </Grid>
              <Grid size={12} className="submit-div">
                <Button type="submit" fullWidth className="btn-submit">
                  Update
                </Button>
                <Button
                  className="btn-clear"
                  onClick={() => {
                    updateForm.resetForm();
                  }}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Success and Failure Popups */}
          <Popup
            open={failure}
            warning
            body={"Update Failed"}
            cancelButton="OK"
            confirmButton="OK"
            handleSuccess={() => setFailure(false)}
          />

          <Popup
            open={success}
            success
            body={"Contact Information Successfully Updated"}
            handleSuccess={() => {
              updateForm.resetForm();
              setSuccess(false);
            }}
            cancelButton="OK"
            confirmButton="OK"
          />
        </Box>
      </Container>
    </div>
  );
}
