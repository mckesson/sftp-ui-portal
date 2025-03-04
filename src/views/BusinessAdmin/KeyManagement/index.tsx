import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import {
  Box,
  Grid2 as Grid,
  Tooltip,
  Typography,
  InputLabel,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { Separator } from "../../../components/Divider";
import { addOneYear } from "../../../utils/addOneYear";
import { Download } from "@mui/icons-material";
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
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedSftpId, setSelectedSftpId] = useState<string | null>(null);
  console.log("selectedSftpId", selectedSftpId);
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(tpData);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const result = tpData.filter((item) => {
      return (
        item.sftpId.toLowerCase().includes(query) ||
        item.cimsPartnerId.toLowerCase().includes(query) ||
        item.host.toLowerCase().includes(query)
      );
    });
    setFilteredData(result);
  };

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

  //Function to download sample .pem file.
  const handleDownload = () => {
    const fileUrl = "/sample.pem";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "sample.pem");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //Download button for host key download.
  const renderDownload = (item: any) => {
    return (
      <Tooltip arrow title="Download Host Key">
        <IconButton className="update-icon" onClick={handleDownload}>
          <Download className="action-icons" />
        </IconButton>
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
      sftpLoginId: "efts01",
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
  const rowData = apiData
    .filter((item: any) => item.sftpId === selectedSftpId)
    .map((item: any) => ({
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

  //Function of row click.
  const handleRowClick = (sftpId: string) => {
    setSelectedSftpId(sftpId);
  };

  //Trading partner table column
  const tPartnerCol = [
    { id: "sftpId", name: "SFTP ID" },
    { id: "host", name: "Trading Partner Name" },
    { id: "cimsPartnerId", name: "CIMS ID", width: 150 },
  ];

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
                placeholder="Search for Trading Partner or SFTP Login ID"
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
          {/* Trading Partner Table */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading-small">
                Trading Partner List
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Table
                pagination
                columns={tPartnerCol}
                data={filteredData}
                onRowClick={(row) => handleRowClick(row.sftpId)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading-small">
                Host key
              </Typography>
              <Separator />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {selectedSftpId ? (
              <Grid size={{ xs: 12, sm: 12 }}>
                <Table
                  pagination
                  columns={columns}
                  data={generateRowData(
                    sftpData.filter(
                      (item) => item.sftpLoginId === selectedSftpId
                    )[0]?.details || []
                  )}
                  noDataText="Host Key Not Found"
                />
              </Grid>
            ) : (
              <Grid
                size={{ xs: 12, sm: 12 }}
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                <Typography variant="h6" color="textSecondary">
                  Please select a Trading Partner / SFTP Login ID to view Host
                  Key details.
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid container spacing={1}>
            <Grid sx={{ marginTop: "20px" }} size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading-small">
                Client Key Management
              </Typography>
              <Separator />
            </Grid>
            {selectedSftpId ? (
              <Grid size={{ xs: 12, sm: 12 }}>
                <Table
                  pagination
                  columns={clientColumns}
                  data={rowData}
                  noDataText="Client Key Data Not Found"
                />
              </Grid>
            ) : (
              <Grid
                size={{ xs: 12, sm: 12 }}
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                <Typography variant="h6" color="textSecondary">
                  Please select a Trading Partner / SFTP Login ID to view Client
                  Key details.
                </Typography>
              </Grid>
            )}
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

const tpData = [
  {
    sftpId: "efts02",
    host: "CVS",
    cimsPartnerId: "mc1234_ib_po_st, mc1234_io_pr_st, mc1234_ib_in_st",
  },
  {
    sftpId: "efts01",
    host: "Walmart",
    cimsPartnerId: "mc1234_ib_po_st, mc1234_io_pr_st, mc1234_ib_in_st",
  },
];

const apiData = [
  {
    sftpId: "efts01",
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
