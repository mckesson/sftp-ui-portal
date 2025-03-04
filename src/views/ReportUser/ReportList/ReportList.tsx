import Table from "../../../shared/Table";
import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import { Box, Typography, Grid2 as Grid, TextField } from "@mui/material";
import { Separator } from "../../../components/Divider";
import { SearchButton } from "../../../shared/SearchButton";
import SearchIcon from "@mui/icons-material/Search";

export default function ReportList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  const columns = [
    { name: "sFTP Login ID", id: "sftpUserId", key: "sftpUserId" },
    { name: "Status", id: "status", key: "status" },
    { name: "Assignee", id: "assignee", key: "assignee" },
    { name: "Date Moved to Current Status", id: "dateMoved", key: "dateMoved" },
    {
      name: "Transitioned/Complete Date",
      id: "transitionDate",
      key: "transitionDate",
    },
    { name: "Done Date", id: "doneDate", key: "doneDate" },
    { name: "TP_NAM", id: "tpNam", key: "tpNam" },
    {
      name: "Comments/Notes (Include blockers)",
      id: "comments",
      key: "comments",
    },
    { name: "CIMS_PRTNR_ID", id: "cimsPrtnrId", key: "cimsPrtnrId" },
    { name: "Third Party Name", id: "thirdPartyName", key: "thirdPartyName" },
    {
      name: "Third Party - Primary Contact Name",
      id: "thirdPartyContact",
      key: "thirdPartyContact",
    },
    {
      name: "Third Party - Email Address",
      id: "thirdPartyEmail",
      key: "thirdPartyEmail",
    },
    {
      name: "Third Party - Phone Number",
      id: "thirdPartyPhone",
      key: "thirdPartyPhone",
    },
    {
      name: "Customer - Primary Contact Name",
      id: "customerContact",
      key: "customerContact",
    },
    { name: "Customer Email", id: "customerEmail", key: "customerEmail" },
    {
      name: "Customer - Phone Number",
      id: "customerPhone",
      key: "customerPhone",
    },
  ];

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(initialData);
    }
  }, [searchQuery]);

  //Function to search data.
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const result = initialData.filter((item) => {
      return item.sftpUserId.toLowerCase().includes(query);
    });
    setFilteredData(result);
  };

  //Table rows.
  const rowData = filteredData.map((item: any) => ({
    ...item,
  }));

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="h4" gutterBottom className="heading">
                Reports
              </Typography>
              <Separator />
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
}

const initialData = [
  {
    sftpUserId: "U12345",
    status: "Active",
    assignee: "John Doe",
    dateMoved: "2025-02-01",
    transitionDate: "2025-02-05",
    doneDate: "2025-02-10",
    tpNam: "TP001",
    comments: "No blockers",
    cimsPrtnrId: "CIMS123",
    thirdPartyName: "Third Party A",
    thirdPartyContact: "Alice Smith",
    thirdPartyEmail: "alice@example.com",
    thirdPartyPhone: "+1-555-1234",
    customerContact: "Bob Johnson",
    customerEmail: "bob@example.com",
    customerPhone: "+1-555-5678",
  },
  {
    sftpUserId: "U67890",
    status: "Pending",
    assignee: "Jane Doe",
    dateMoved: "2025-02-02",
    transitionDate: "2025-02-06",
    doneDate: "2025-02-11",
    tpNam: "TP002",
    comments: "Waiting for approval",
    cimsPrtnrId: "CIMS456",
    thirdPartyName: "Third Party B",
    thirdPartyContact: "Charlie Brown",
    thirdPartyEmail: "charlie@example.com",
    thirdPartyPhone: "+1-555-9876",
    customerContact: "Eve Adams",
    customerEmail: "eve@example.com",
    customerPhone: "+1-555-4321",
  },
];
