import Container from "../../../components/Container";
import {
  Box,
  Grid2 as Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Table from "../../../shared/Table";
import { Add } from "@mui/icons-material";
import { SearchButton } from "../../../shared/SearchButton";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Separator } from "../../../components/Divider";

const TradingPartnerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(apiData);

  const columns = [
    { id: "tradingPartnerName", name: "Trading Partner Name" },
    { id: "businessUnit", name: "Business Unit" },
    { id: "contactName", name: "Contact Person Name" },
    { id: "emailId", name: "Email ID" },
    { id: "phone", name: "Contact Phone No" },
    { id: "role", name: "Role" },
    { id: "sftpLoginId", name: "SFTP Login ID" },
    { id: "authMethod", name: "Authentication Method " },
    { id: "cimsPartnerId", name: "CIMS partner ID " },
    { id: "effectiveDate", name: "Effective Date" },
    { id: "hostKeyVersion", name: "Host Key Version" },
  ];

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(apiData);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const result = apiData.filter((item) => {
      return (
        item.sftpLoginId.toLowerCase().includes(query) ||
        item.emailId.toLowerCase().includes(query) ||
        item.contactName.toLowerCase().includes(query)
      );
    });
    setFilteredData(result);
  };

  const rowData = filteredData.map((item: any) => ({
    ...item,
    effectiveDate: new Date(item.effectiveDate).toLocaleString(),
  }));

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading">
                Trading Partners
              </Typography>
              <Separator />
            </Grid>
          </Grid>
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
                onClick={() => navigate("/add/trading_partner")}
              >
                Add Trading Partner
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
                placeholder="Search SFTP Login ID, Contact Name or Email ID"
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
              <Table pagination columns={columns} data={rowData} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

const apiData = [
  {
    tradingPartnerName: "Walmart",
    businessUnit: "Hospital Finance Department ",
    contactName: "Walgreens",
    phone: "+1-404-555-0178",
    emailId: "walgreens@gmail.com",
    role: "-",
    sftpLoginId: "eid001",
    authMethod: "Password",
    cimsPartnerId: "ehd002",
    hostKeyVersion: "v2",
    effectiveDate: 1738713600000,
  },
  {
    tradingPartnerName: "CVS",
    businessUnit: "Hospital Ordering Department",
    contactName: "Walgreens",
    phone: "+1-404-555-0178",
    emailId: "walgreens@gmail.com",
    role: "-",
    sftpLoginId: "eid001",
    authMethod: "Password, Client Key",
    cimsPartnerId: "ehd002",
    hostKeyVersion: "v3",
    effectiveDate: 1738886400000,
  },
];

export default TradingPartnerList;
