import Container from "../../../components/Container";
import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Table from "../../../shared/Table";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { SearchButton } from "../../../shared/SearchButton";
import { Separator } from "../../../components/Divider";
import { Add, DeleteForever, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";

const UsersList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(apiData);
  const [deletePopup, setDeletePopup] = useState(false);

  const columns = [
    { id: "userId", name: "User ID/EID", width: 100 },
    { id: "fullName", name: "Full Name", width: 180 },
    { id: "role", name: "Role", width: 150 },
    { id: "permissions", name: "Permissions", width: 180 },
    {
      id: "accountActivationDate",
      name: "Account Activation Date",
      width: 180,
    },
    { id: "email", name: "Email Address", width: 200 },
    { id: "phone", name: "Phone Number", width: 160 },
    { id: "action", name: "#", align: "right" },
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
        item.userId.toLowerCase().includes(query) ||
        item.fullName.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query)
      );
    });
    setFilteredData(result);
  };

  const renderAction = (item: any) => {
    return (
      <Box className="action-gap">
        <Tooltip title="Update" arrow>
          <IconButton
            className="update-icon"
            onClick={() => navigate(`/search-ba/update/${item.userId}`)}
          >
            <Edit className="action-icons" />
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

  const rowData = filteredData.map((item: any) => ({
    ...item,
    action: renderAction(item),
    accountActivationDate: new Date(item.accountActivationDate).toISOString(),
    lastLoginTime: new Date(item.lastLoginTime).toISOString(),
  }));

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading">
                User Overview
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
                onClick={() => navigate("/search-ba/add")}
              >
                Add User
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
                placeholder="Search EID, User Name or Role"
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
    userId: "EMP001",
    fullName: "Sarah Miller",
    role: "Manager",
    permissions: "Read, Write",
    accountActivationDate: 1738368000000,
    lastLoginTime: 1738454400000,
    email: "sarah.miller@example.com",
    phone: "123-456-7890",
  },
  {
    userId: "EMP002",
    fullName: "Michael Chen",
    role: "Business Admin",
    permissions: "Read, Write, Admin",
    accountActivationDate: 1738540800000,
    lastLoginTime: 1738627200000,
    email: "michael.chen@example.com",
    phone: "234-567-8901",
  },
  {
    userId: "EMP003",
    fullName: "Jessica Thompson",
    role: "Business Admin",
    permissions: "Read, Write, Admin",
    accountActivationDate: 1738713600000,
    lastLoginTime: 1738800000000,
    email: "jessica.thompson@example.com",
    phone: "345-678-9012",
  },
  {
    userId: "EMP004",
    fullName: "Robert Chen",
    role: "Manager",
    permissions: "Read, Write",
    accountActivationDate: 1738886400000,
    lastLoginTime: 1738972800000,
    email: "robert.chen@example.com",
    phone: "456-789-0123",
  },
];

export default UsersList;
