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
import { Add } from "@mui/icons-material";
import Table from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export default function ClientKeyManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(apiData);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(apiData);
    }
  }, [searchQuery]);

  const columns = [
    { id: "sftpId", name: "SFTP ID" },
    { id: "tpName", name: "Trading Partner Name" },
    { id: "authType", name: "Auth Type" },
    { id: "action", name: "#", align: "right" },
  ];

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const result = apiData.filter((item) => {
      return item.sftpId.toLowerCase().includes(query);
    });
    setFilteredData(result);
  };

  const renderAction = (item) => {
    return (
      <Tooltip title="Update" arrow>
        <IconButton
          className="update-icon"
          onClick={() => navigate(`/update/client_key/${item.id}`)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    );
  };

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
            Client Key Management
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
                onClick={() => navigate("/add/client_key")}
              >
                Add Client Key
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
                placeholder="Search SFTP Login ID"
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
}

const apiData = [
  {
    id: "9eb84cf0-fa18-4141-80b9-5deb092056ff",
    tpName: "Walmart",
    sftpId: "eid001",
    authType: "Password",
  },
  {
    id: "5ad0e2cd-fe4a-40a2-83f4-21994615a6d8",
    tpName: "Walmart",
    sftpId: "eid002",
    authType: "Client Key",
  },
];
