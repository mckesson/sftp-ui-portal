import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Container from "../../../components/Container";
import { Add, Download } from "@mui/icons-material";
import { Separator } from "../../../components/Divider";
import { useNavigate } from "react-router-dom";
import Table from "../../../shared/Table";
import { addOneYear } from "../../../utils/addOneYear";
import { getTypeForYear } from "../../../utils/getTypeForYears";
import { SearchButton } from "../../../shared/SearchButton";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function ListHostKey() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(apiData);

  const columns = [
    { id: "version", name: "Version" },
    { id: "keyType", name: "Key Type" },
    { id: "keyLength", name: "Key Length" },
    { id: "effectiveDate", name: "Effective Date" },
    { id: "expiryDate", name: "Expiry Date" },
    { id: "type", name: "Key Status" },
    { id: "download", name: "Download", align: "right" },
  ];

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(apiData);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const result = apiData.filter((item) => {
      return item.version.toLowerCase().includes(query);
    });
    setFilteredData(result);
  };

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

  const rowData = filteredData.map((item: any) => ({
    ...item,
    effectiveDate: new Date(item.effectiveDate).toLocaleString(),
    type: getTypeForYear(new Date(item.effectiveDate).toLocaleString()),
    expiryDate: addOneYear(item.effectiveDate),
    download: renderDownload(item),
  }));

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Host Key Management
          </Typography>
          <Separator />
          <Grid container>
            <Grid
              size={12}
              sx={{
                justifyContent: "flex-end",
                display: "flex",
                marginBottom: "20px",
              }}
            >
              <Button
                className="add-btn"
                startIcon={<Add />}
                onClick={() => navigate("/upload/host-key-management")}
              >
                Upload New Host Key
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            sx={{ marginBottom: "16px", marginTop: "16px" }}
          >
            <Grid size={{ xs: 6, sm: 6 }}>
              <TextField
                fullWidth
                placeholder="Search Host Key Version"
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
              <Table
                pagination
                columns={columns}
                data={rowData}
                noDataText="Host Key Not Found"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

const apiData = [
  {
    keyType: "RSA",
    keyLength: "4096",
    version: "v1.1",
    effectiveDate: 1738713600000,
  },
  {
    keyType: "DSA",
    keyLength: "2048",
    version: "v1.9",
    effectiveDate: 1735680000000,
  },
  {
    keyType: "ECC",
    keyLength: "2048",
    version: "v1.9",
    effectiveDate: 1672531200000,
  },
];

// const apiData = [];
