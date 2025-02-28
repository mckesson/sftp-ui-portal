import { useState } from "react";
import Container from "../../../components/Container";
import {
  Box,
  Grid2 as Grid,
  Tooltip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Separator } from "../../../components/Divider";
import { addOneYear } from "../../../utils/addOneYear";
import { Download, ExpandMore } from "@mui/icons-material";
import Table from "../../../shared/Table";
import Modal from "../../../components/Modal";
import { useFormik } from "formik";
import Popup from "../../../components/Popup";
import { getTypeForYear } from "../../../utils/getTypeForYears";
import { SearchButton } from "../../../shared/SearchButton";
import SearchIcon from "@mui/icons-material/Search";

const KeyManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionType, setActionType] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [passwordGen, setPasswordGen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0);

  //Formik for popup.
  const formik = useFormik({
    initialValues: {
      password: "",
      keyFile: null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  //table column for host key.
  const columns = [
    { id: "type", name: "Key Status", width: 80 },
    { id: "keyType", name: "Key Type", width: 80 },
    { id: "keyLength", name: "Key Length", width: 80 },
    { id: "version", name: "Version" },
    { id: "effectiveDate", name: "Effective Date" },
    { id: "expiryDate", name: "Expiry Date" },
    { id: "download", name: "Download", align: "center" },
  ];

  //Table column for client.
  const clientColumns = [
    { id: "sftpId", name: "SFTP ID" },
    { id: "host", name: "Host" },
    { id: "auth", name: "Authentication" },
    { id: "action", name: "Action" },
    { id: "cimsPartnerId", name: "CIMS Partner IDs" },
  ];

  //Download button for host key download.
  const renderDownload = (item: any) => {
    return (
      <Tooltip arrow title="Download Host Key">
        <Download sx={{ color: "#000" }} />
      </Tooltip>
    );
  };

  // Function to generate row data
  const generateRowData = (details: any[]) => {
    return details.map((item: any) => ({
      ...item,
      effectiveDate: new Date(item.effectiveDate).toLocaleString(),
      expiryDate: addOneYear(new Date(item.effectiveDate).toLocaleString()),
      type: getTypeForYear(new Date(item.effectiveDate).toLocaleString()),
      download: renderDownload(item),
    }));
  };

  const sftpData = [
    {
      sftpLoginId: "efts02",
      details: [
        {
          keyType: "RSA",
          keyLength: "4096",
          version: "v1.1",
          effectiveDate: 1672531200000,
        },
      ],
    },
    {
      sftpLoginId: "efts03",
      details: [
        {
          keyType: "DSA",
          keyLength: "2048",
          version: "v1.9",
          effectiveDate: 1738713600000,
        },
      ],
    },
  ];

  const handleActionChange = (item: any) => {
    setActionType(item);
    setFormOpen(true);
  };

  //Table row for client.
  const rowData = apiData.map((item: any) => ({
    ...item,
    action: (
      <Typography
        className="update-key-pass"
        onClick={() => handleActionChange(item)}
      >
        {item?.action}
      </Typography>
    ),
  }));

  const renderKeyPass = () => {
    return (
      <>
        <div>
          <Typography className="heading-small">
            {actionType?.action !== "Change Key"
              ? "Update Password"
              : "Update Key"}
          </Typography>
        </div>
        <Separator />
        <Box>
          <form onSubmit={formik.handleSubmit} className="form-grid">
            <Grid container spacing={1}>
              <Grid size={3}>
                <InputLabel
                  htmlFor={
                    actionType?.action !== "Change Key" ? "password" : "keyFile"
                  }
                >
                  {actionType?.action !== "Change Key"
                    ? "Enter Password*:"
                    : "Client Key*:"}
                </InputLabel>
              </Grid>

              <Grid size={9}>
                {actionType?.action !== "Change Key" ? (
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    size="small"
                    placeholder="Enter Your Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
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
                    id="keyFile"
                    onChange={(e) => {
                      formik.setFieldValue("keyFile", e.currentTarget.files[0]);
                      //   handleFileChange(e, index);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.keyFile && Boolean(formik.errors.keyFile)
                    }
                    helperText={formik.touched.keyFile && formik.errors.keyFile}
                  />
                )}
              </Grid>
              <Grid size={12} className="submit-div">
                <Button type="submit" fullWidth className="btn-submit">
                  Update
                </Button>
                <Button
                  className="btn-clear"
                  onClick={() => {
                    formik.resetForm();
                    setFormOpen(false);
                  }}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </>
    );
  };

  const closeGeneration = () => {
    const generatedPassword = Math.random().toString(36).slice(-8);
    formik.setFieldValue(`password`, generatedPassword);
    setPasswordGen(false);
  };

  // Toggle expansion on click
  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? false : index);
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    // const result = apiData.filter((item) => {
    //   return (
    //     item.sftpLoginId.toLowerCase().includes(query) ||
    //     item.emailId.toLowerCase().includes(query) ||
    //     item.contactName.toLowerCase().includes(query)
    //   );
    // });
    // setFilteredData(result);
  };

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            sFTP Key Management
          </Typography>
          <Separator />
          <Grid
            container
            spacing={0}
            sx={{ marginBottom: "16px", marginTop: "16px" }}
          >
            <Grid size={{ xs: 6, sm: 6 }}>
              <TextField
                fullWidth
                placeholder="Search for Trading Partner"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 2, sm: 2 }}>
              <SearchButton disableRipple onClick={handleSearch}>
                <SearchIcon />
              </SearchButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading-small">
                Host key
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} className="list-sftp-id">
            {sftpData.map((item, index) => (
              <Grid size={{ xs: 12, sm: 12 }} key={index}>
                <Accordion
                  expanded={expandedIndex === index}
                  onChange={() => handleAccordionChange(index)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography variant="h6">
                      sFTP Login Id : {item.sftpLoginId}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table
                      pagination
                      columns={columns}
                      data={generateRowData(item.details)}
                      noDataText="Host Key Not Found"
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={1}>
            <Grid sx={{ marginTop: "20px" }} size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading-small">
                Client Key Management
              </Typography>
              <Separator />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Table pagination columns={clientColumns} data={rowData} />
            </Grid>
          </Grid>
        </Box>
        <Modal
          width="450px"
          onClose={() => {
            formik.resetForm();
            setFormOpen(false);
          }}
          open={formOpen}
        >
          {renderKeyPass()}
        </Modal>

        <Popup
          success
          open={passwordGen}
          cancelButton="OK"
          confirmButton="OK"
          body="Password generation is complete. Kindly save it before uploading."
          handleSuccess={() => closeGeneration()}
        />
      </Container>
    </div>
  );
};

const apiData = [
  {
    sftpId: "efts02",
    host: "sftp.edi.mckesson.com",
    auth: "Client Key",
    action: "Change Key",
    cimsPartnerId: "ehd002",
  },
  {
    sftpId: "efts02",
    host: "sftp.edi.mckesson.com",
    auth: "Password",
    action: "Change Password",
    cimsPartnerId: "ehd002",
  },
];

export default KeyManagement;
