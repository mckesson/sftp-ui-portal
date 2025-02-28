import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import Container from "../../../components/Container";
import { Add } from "@mui/icons-material";
import { Separator } from "../../../components/Divider";
import { useNavigate } from "react-router-dom";
import Table from "../../../shared/Table";
import { addOneYear } from "../../../utils/addOneYear";
import { getTypeForYear } from "../../../utils/getTypeForYears";

export default function ListHostKey() {
  const navigate = useNavigate();

  const columns = [
    { id: "version", name: "Version" },
    { id: "keyType", name: "Key Type" },
    { id: "keyLength", name: "Key Length" },
    { id: "effectiveDate", name: "Effective Date" },
    { id: "expiryDate", name: "Expiry Date" },
    { id: "type", name: "Key Status" },
  ];

  const rowData = apiData.map((item: any) => ({
    ...item,
    effectiveDate: new Date(item.effectiveDate).toLocaleString(),
    type: getTypeForYear(new Date(item.effectiveDate).toLocaleString()),
    expiryDate: addOneYear(item.effectiveDate),
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
