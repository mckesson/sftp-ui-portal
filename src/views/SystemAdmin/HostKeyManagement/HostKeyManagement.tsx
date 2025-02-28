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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Container from "../../../components/Container";
import { uploadKeyValidation } from "../../../utils";
import Popup from "../../../components/Popup";
import { Separator } from "../../../components/Divider";
import Backdrop from "../../../components/Backdrop";
import { uploadHostKey } from "../../../api/fileServices";
import { useNavigate } from "react-router-dom";

interface FormValues {
  version: string;
  partnerType: string;
  keyEncrypt: string;
  keyLength: string;
  url: string;
  description: string;
  changeRequestId: string;
  effectiveDate: Date | null;
  hostKey: File | undefined;
}

export default function HostKeyManagement() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  //Function to submit form and api calling.
  const handleUploadKey = (data: any) => {
    setLoading(true);
    setSuccess(false);
    setFailure(false);
    uploadHostKey(data).then((response: any) => {
      if (response?.status === 200) {
        setSuccess(true);
        setLoading(false);
      } else {
        setLoading(false);
        setFailure(true);
      }
    });
  };

  //Formik definition
  const uploadForm = useFormik<FormValues>({
    initialValues: {
      version: "",
      partnerType: "",
      keyEncrypt: "",
      url: "",
      description: "",
      changeRequestId: "",
      keyLength: "",
      effectiveDate: dayjs(new Date()),
      hostKey: undefined,
    },
    validationSchema: uploadKeyValidation,
    onSubmit: handleUploadKey,
  });

  //Function to file change.
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      uploadForm.setValues({
        ...uploadForm.values,
        hostKey: event.target.files[0],
      });
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Host Key Management
          </Typography>
          <Separator />
          <form onSubmit={uploadForm.handleSubmit}>
            <Grid container spacing={2} className="form-grid">
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="version">Version*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Version"
                  size="small"
                  id="version"
                  name="version"
                  value={uploadForm.values.version}
                  onBlur={uploadForm.handleBlur}
                  onChange={uploadForm.handleChange}
                  error={
                    uploadForm.touched.version &&
                    Boolean(uploadForm.errors.version)
                  }
                  helperText={
                    uploadForm.touched.version && uploadForm.errors.version
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="keyEncrypt">Key Type*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  select
                  name="keyEncrypt"
                  id="keyEncrypt"
                  size="small"
                  fullWidth
                  placeholder="Select Key Type"
                  value={uploadForm.values.keyEncrypt}
                  onBlur={uploadForm.handleBlur}
                  onChange={uploadForm.handleChange}
                  error={
                    uploadForm.touched.keyEncrypt &&
                    Boolean(uploadForm.errors.keyEncrypt)
                  }
                >
                  <MenuItem value="DSA">DSA</MenuItem>
                  <MenuItem value="RSA">RSA</MenuItem>
                  <MenuItem value="ECC">ECC</MenuItem>
                </TextField>
                <FormHelperText>
                  {uploadForm.touched.keyEncrypt &&
                    uploadForm.errors.keyEncrypt}
                </FormHelperText>
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="keyLength">Key Length*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  select
                  name="keyLength"
                  size="small"
                  fullWidth
                  placeholder="Select Key Length"
                  value={uploadForm.values.keyLength}
                  onBlur={uploadForm.handleBlur}
                  onChange={uploadForm.handleChange}
                  error={
                    uploadForm.touched.keyLength &&
                    Boolean(uploadForm.errors.keyLength)
                  }
                >
                  <MenuItem value="2048_bits">2048 bits</MenuItem>
                  <MenuItem value="3072_bits">3072 bits</MenuItem>
                  <MenuItem value="4096_bits">4096 bits</MenuItem>
                </TextField>
                <FormHelperText>
                  {uploadForm.touched.keyLength && uploadForm.errors.keyLength}
                </FormHelperText>
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="url">URL*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  placeholder="Enter Url"
                  size="small"
                  id="url"
                  name="url"
                  value={uploadForm.values.url}
                  onBlur={uploadForm.handleBlur}
                  onChange={uploadForm.handleChange}
                  error={
                    uploadForm.touched.url && Boolean(uploadForm.errors.url)
                  }
                  helperText={uploadForm.touched.url && uploadForm.errors.url}
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="description">Description*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  size="small"
                  placeholder="Enter Description"
                  id="description"
                  name="description"
                  value={uploadForm.values.description}
                  onBlur={uploadForm.handleBlur}
                  onChange={uploadForm.handleChange}
                  error={
                    uploadForm.touched.description &&
                    Boolean(uploadForm.errors.description)
                  }
                  helperText={
                    uploadForm.touched.description &&
                    uploadForm.errors.description
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="effectiveDate">
                  Effective Date*:
                </InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <FormControl fullWidth className="date-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        className="effective-date"
                        name="effectiveDate"
                        id="effectiveDate"
                        value={dayjs(uploadForm.values.effectiveDate)}
                        onChange={(date) => {
                          uploadForm.setValues({
                            ...uploadForm.values,
                            effectiveDate: date?.$d,
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <FormHelperText>
                    {uploadForm.touched.effectiveDate &&
                      uploadForm.errors.effectiveDate}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="changeRequestId">
                  Change Request ID*:
                </InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={1}
                  size="small"
                  placeholder="Enter Change Request ID"
                  id="changeRequestId"
                  name="changeRequestId"
                  value={uploadForm.values.changeRequestId}
                  onBlur={uploadForm.handleBlur}
                  onChange={uploadForm.handleChange}
                  error={
                    uploadForm.touched.changeRequestId &&
                    Boolean(uploadForm.errors.changeRequestId)
                  }
                  helperText={
                    uploadForm.touched.changeRequestId &&
                    uploadForm.errors.changeRequestId
                  }
                />
              </Grid>
              <Grid size={{ xs: 2, sm: 2 }}>
                <InputLabel htmlFor="hostKey">Host Key*:</InputLabel>
              </Grid>
              <Grid size={{ xs: 10, sm: 10 }}>
                <TextField
                  fullWidth
                  size="small"
                  // label="Upload Host Key *"
                  type="file"
                  name="hostKey"
                  id="hostKey"
                  error={
                    uploadForm.touched.url && Boolean(uploadForm.errors.hostKey)
                  }
                  helperText={
                    uploadForm.touched.url && uploadForm.errors.hostKey
                  }
                  onChange={handleFileChange}
                />
              </Grid>

              <Grid size={12} className="submit-div">
                <Button type="submit" fullWidth className="btn-submit">
                  Upload
                </Button>
                <Button
                  className="btn-clear"
                  onClick={() => {
                    uploadForm.resetForm();
                    navigate("/host-key-management");
                  }}
                  fullWidth
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>

          <Popup
            open={failure}
            warning
            body={"Upload Failed, Please try again"}
            cancelButton="OK"
            confirmButton="OK"
            handleSuccess={() => setFailure(false)}
          />

          <Popup
            open={success}
            success
            body={"Host Key Successfully Uploaded"}
            handleSuccess={() => {
              uploadForm.resetForm();
              setFile(null);
              navigate("/host-key-management");
              setSuccess(false);
            }}
            cancelButton="OK"
            confirmButton="OK"
          />
          <Backdrop open={loading} />
        </Box>
      </Container>
    </div>
  );
}
