import Container from "../../../components/Container";
import {
  Box,
  Grid2 as Grid,
  TextField,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Table from "../../../shared/Table";
import { Add, DeleteForever, Edit } from "@mui/icons-material";
import { SearchButton } from "../../../shared/SearchButton";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Separator } from "../../../components/Divider";
import Popup from "../../../components/Popup";

const TradingPartnerList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(apiData);
  const [deletePopup, setDeletePopup] = useState(false);

  //Table columns.
  const columns = [
    { id: "tradingPartnerName", name: "Trading Partner Name" },
    { id: "businessUnit", name: "Business Unit" },
    { id: "sftpLoginId", name: "SFTP Login ID" },
    { id: "authMethod", name: "Authentication Method " },
    { id: "cimsPartnerId", name: "CIMS partner ID " },
    { id: "effectiveDate", name: "Effective Date" },
    { id: "hostKeyVersion", name: "Host Key Version" },
    { id: "action", name: "#", align: "right" },
  ];

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(apiData);
    }
  }, [searchQuery]);

  //Function to search data.
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

  //Table actions.
  const renderAction = (item: any) => {
    return (
      <Box className="action-gap">
        <Tooltip title="Update" arrow>
          <IconButton
            className="update-icon"
            onClick={() => navigate(`/update/trading_partner/${item.id}`)}
          >
            <Edit className="action-icons" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View" arrow>
          <IconButton
            className="update-icon"
            onClick={() => navigate(`/view/trading-partner/${item.id}`)}
          >
            <VisibilityIcon className="action-icons" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <IconButton
            className="update-icon"
            onClick={() => setDeletePopup(true)}
          >
            <DeleteForever className="delete-icon" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  //Table rows.
  const rowData = filteredData.map((item: any) => ({
    ...item,
    action: renderAction(item),
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
        <Popup
          close
          open={deletePopup}
          body="Are you sure, You want to delete this data?"
          handleSuccess={() => setDeletePopup(false)}
          handleClose={() => setDeletePopup(false)}
          confirmButton="Delete"
          cancelButton="Close"
        />
      </Container>
    </div>
  );
};

const apiData = [
  {
    id: "c96563eb-f12c-4ab7-a198-61e7329ddaa2",
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
    id: "5f632fda-305f-495c-9d48-2b01b8ce94f5",
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
