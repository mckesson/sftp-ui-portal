import { ChangeEvent, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControlLabel,
  Grid2 as Grid,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Container from "../../../components/Container";
import Popup from "../../../components/Popup";
import { keyValidation } from "../../../utils";
import { Separator } from "../../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";

interface FormValues {
  sftpLoginId: string;
  auth_type: string;
  password: string;
  keyFile: File | undefined;
}

export default function AddUpdateClientKey() {
  const { client_id } = useParams();
  const navigate = useNavigate();
  const [passwordGen, setPasswordGen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Function to handle form submission
  const handleUploadKey = (data: FormValues) => {
    console.log(data);
    setUploadSuccess(true);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    keyForm.setFieldValue("keyFile", selectedFile);
  };

  const closeGeneration = () => {
    const generatedPassword = Math.random().toString(36).slice(-8);
    keyForm.setFieldValue("password", generatedPassword);
    setPasswordGen(false);
  };

  // Formik definition
  const keyForm = useFormik<FormValues>({
    initialValues: {
      sftpLoginId: "",
      auth_type: "password",
      password: "",
      keyFile: undefined,
    },
    validationSchema: keyValidation,
    onSubmit: handleUploadKey,
  });

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Client Key Management
          </Typography>
          <Separator />

          <form onSubmit={keyForm.handleSubmit}>
            <Grid container spacing={2} className="form-grid">
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor={"sftpLoginId"}>SFTP Login ID*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="SFTP Login ID*"
                  value={keyForm.values.sftpLoginId}
                  onChange={keyForm.handleChange}
                  name="sftpLoginId"
                  id="sftpLoginId"
                  error={
                    keyForm.touched.sftpLoginId &&
                    Boolean(keyForm.errors.sftpLoginId)
                  }
                  helperText={
                    keyForm.touched.sftpLoginId && keyForm.errors.sftpLoginId
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor={"sftpLoginId"}>Auth Type*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <FormControlLabel
                  control={
                    <RadioGroup
                      row
                      name="auth_type"
                      value={keyForm.values.auth_type}
                      onChange={keyForm.handleChange}
                    >
                      <FormControlLabel
                        value="password"
                        control={<Radio />}
                        label="Password"
                      />
                      <FormControlLabel
                        value="key"
                        control={<Radio />}
                        label="Key"
                      />
                    </RadioGroup>
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel
                  htmlFor={
                    keyForm.values.auth_type === "password"
                      ? "password:"
                      : "keyFile"
                  }
                >
                  {keyForm.values.auth_type === "password"
                    ? "Enter Password*:"
                    : "Client Key*:"}
                </InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                {keyForm.values.auth_type === "password" ? (
                  <TextField
                    fullWidth
                    size="small"
                    label="Enter Password*"
                    value={keyForm.values.password}
                    onChange={keyForm.handleChange}
                    name="password"
                    error={
                      keyForm.touched.password &&
                      Boolean(keyForm.errors.password)
                    }
                    helperText={
                      keyForm.touched.password && keyForm.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            className="generate-btn"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setPasswordGen(true);
                            }}
                            size="small"
                          >
                            Generate Password
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    type="file"
                    name="keyFile"
                    onChange={handleFileChange}
                    error={
                      keyForm.touched.keyFile && Boolean(keyForm.errors.keyFile)
                    }
                    helperText={
                      keyForm.touched.keyFile && keyForm.errors.keyFile
                    }
                  />
                )}
              </Grid>
              <Grid size={12} className="submit-div">
                <Button type="submit" fullWidth className="btn-submit">
                  {client_id
                    ? "Update"
                    : keyForm.values.auth_type === "password"
                    ? "Save"
                    : "Upload"}
                </Button>
                <Button
                  className="btn-clear"
                  onClick={() => {
                    keyForm.resetForm();
                    navigate("/client-key-management");
                  }}
                  fullWidth
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>

          <Popup
            success
            open={passwordGen}
            cancelButton="OK"
            confirmButton="OK"
            body="Password generation is complete. Kindly save it before uploading."
            handleSuccess={closeGeneration}
          />

          <Popup
            success
            open={uploadSuccess}
            cancelButton="OK"
            confirmButton="OK"
            body="Password/Key Successfully Updated"
            handleSuccess={() => {
              navigate("/client-key-management");
              setUploadSuccess(false);
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
