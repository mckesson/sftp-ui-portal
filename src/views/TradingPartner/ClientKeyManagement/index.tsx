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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useFormik } from "formik";
import Container from "../../../components/Container";
import Popup from "../../../components/Popup";
import { keyValidation } from "../../../utils";
import { NoDataFound, Separator } from "../../../components/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FormValues {
  data: {
    sftpLoginId: string;
    auth_type: string;
    password: string;
    keyFile: File | undefined;
  }[];
}

export default function ClientKeyManagement() {
  const [passwordGen, setPasswordGen] = useState(false);
  const [index, setIndex] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0);

  const sftpData = [
    {
      sftpLoginId: "jbu3470",
    },
    {
      sftpLoginId: "efg2456",
    },
  ];

  // Function to handle form submission for each sftpLoginId
  const handleUploadKey = (data: any) => {
    console.log(data);
    setUploadSuccess(true);
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    keyForm.setFieldValue(`data[${index}].keyFile`, selectedFile);
  };

  const closeGeneration = (index: number) => {
    const generatedPassword = Math.random().toString(36).slice(-8);
    keyForm.setFieldValue(`data[${index}].password`, generatedPassword);
    setPasswordGen(false);
    setIndex(0);
  };

  // Formik definition
  const keyForm = useFormik<FormValues>({
    initialValues: {
      data: sftpData.map((item) => ({
        sftpLoginId: item.sftpLoginId,
        auth_type: "password",
        password: "",
        keyFile: undefined,
      })),
    },
    validationSchema: keyValidation,
    onSubmit: handleUploadKey,
  });

  // Toggle expansion on click
  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? false : index);
  };

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Client Key Management
          </Typography>
          <Separator />

          <Grid container spacing={2}>
            {keyForm.values.data.length > 0 ? (
              keyForm.values.data.map((item, index) => (
                <Grid size={{ xs: 12, sm: 12 }} key={item.sftpLoginId}>
                  <Accordion
                    expanded={expandedIndex === index}
                    onChange={() => handleAccordionChange(index)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${item.sftpLoginId}-content`}
                      id={`${item.sftpLoginId}-header`}
                    >
                      <Typography variant="h6">
                        sFTP Login Id : {item.sftpLoginId}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <form onSubmit={keyForm.handleSubmit}>
                        <Grid container spacing={1} className="form-grid">
                          <Grid size={{ xs: 2, sm: 2 }}>
                            <InputLabel htmlFor={`data[${index}].auth_type`}>
                              Auth Type*:
                            </InputLabel>
                          </Grid>
                          <Grid size={{ xs: 10, sm: 10 }}>
                            <RadioGroup
                              row
                              name={`data[${index}].auth_type`}
                              id={`data[${index}].auth_type`}
                              value={item.auth_type}
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
                          </Grid>

                          <Grid size={{ xs: 2, sm: 2 }}>
                            <InputLabel
                              htmlFor={
                                item.auth_type === "password"
                                  ? "password:"
                                  : "keyFile"
                              }
                            >
                              {item.auth_type === "password"
                                ? "Enter Password*:"
                                : "Client Key*:"}
                            </InputLabel>
                          </Grid>
                          <Grid size={{ xs: 10, sm: 10 }}>
                            {item.auth_type === "password" ? (
                              <TextField
                                fullWidth
                                id={`data[${index}].password`}
                                name={`data[${index}].password`}
                                size="small"
                                placeholder="Enter Your Password"
                                value={item.password}
                                onChange={keyForm.handleChange}
                                error={
                                  keyForm.touched.data?.[index]?.password &&
                                  Boolean(
                                    keyForm.errors.data?.[index]?.password
                                  )
                                }
                                helperText={
                                  keyForm.touched.data?.[index]?.password &&
                                  keyForm.errors.data?.[index]?.password
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
                                          setIndex(index);
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
                                name={`data[${index}].keyFile`}
                                onChange={(e) => handleFileChange(e, index)}
                                error={
                                  keyForm.touched.data?.[index]?.keyFile &&
                                  Boolean(keyForm.errors.data?.[index]?.keyFile)
                                }
                                helperText={
                                  keyForm.touched.data?.[index]?.keyFile &&
                                  keyForm.errors.data?.[index]?.keyFile
                                }
                              />
                            )}
                          </Grid>

                          <Grid size={12} className="submit-div">
                            <Button
                              type="submit"
                              fullWidth
                              className="btn-submit"
                            >
                              {item.auth_type === "password"
                                ? "Update"
                                : "Upload"}
                            </Button>
                            <Button
                              className="btn-clear"
                              onClick={() => {
                                keyForm.resetForm();
                              }}
                              fullWidth
                            >
                              Cancel
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12, sm: 12 }}>
                <NoDataFound>Host Key Not Found</NoDataFound>
              </Grid>
            )}
          </Grid>
          <Popup
            success
            open={passwordGen}
            cancelButton="OK"
            confirmButton="OK"
            body="Password generation is complete. Kindly save it before uploading."
            handleSuccess={() => closeGeneration(index)}
          />

          <Popup
            success
            open={uploadSuccess}
            cancelButton="OK"
            confirmButton="OK"
            body="Password/Key Successfully Updated"
            handleSuccess={() => {
              setUploadSuccess(false);
            }}
          />
        </Box>
      </Container>
    </div>
  );
}
