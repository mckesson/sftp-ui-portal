import { useEffect, useState } from "react";
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
import { Separator } from "../../../components/Divider";
import SearchIcon from "@mui/icons-material/Search";
import { SearchButton } from "../../../shared/SearchButton";
import { Add, DeleteForever } from "@mui/icons-material";
import Table from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "../../../components/Popup";

export default function ContactList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(apiData);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(apiData);
    }
  }, [searchQuery]);

  //Table column.
  const columns = [
    { id: "firstName", name: "First Name" },
    { id: "lastName", name: "Last Name" },
    { id: "email", name: "Email" },
    { id: "contactNo", name: "Direct Contact number" },
    { id: "role", name: "Role" },
    { id: "action", name: "#", align: "right" },
  ];

  //Function to search data.
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const result = apiData.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      );
    });
    setFilteredData(result);
  };

  //Render Action
  const renderAction = (item) => {
    return (
      <Box className="action-gap">
        <Tooltip title="Update" arrow>
          <IconButton
            className="update-icon"
            onClick={() => navigate(`/update/contact/${item.id}`)}
          >
            <EditIcon className="action-icons" />
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

  //Row data.
  const rowData = filteredData.map((item: any) => ({
    ...item,
    effectiveDate: new Date(item.effectiveDate).toLocaleString(),
    action: renderAction(item),
  }));

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Contact Details
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
                onClick={() => navigate("/add/contact")}
              >
                Add Contact
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
                placeholder="Search First Name, Email"
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
}
const apiData = [
  {
    id: "9eb84cf0-fa18-4141-80b9-5deb092056ff",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    contactNo: "+1234567890",
    role: "Business Admin",
  },
  {
    id: "a3c91f8b-2c54-4d6b-9f45-8d1e4b7f92e1",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    contactNo: "+1987654321",
    role: "Manager",
  },
  {
    id: "f5e7c2a1-9a54-4d77-8465-3b5d6c84b234",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    contactNo: "+1122334455",
    role: "Business Admin",
  },
];
