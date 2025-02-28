import axios from "axios";
import { useState } from "react";
import Table from "../../shared/Table";
import UpdateClientStatusPopup from "../../components/UpdateClientStatusPopup";
import {
  Box,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import Container from "../../components/Container";
import Popup from "../../components/Popup";

interface FormData {
  clientId: string;
  clientPartnerName: string;
  directContactNumber: string;
  zipCode: string;
}

interface ResponseData {
  clientId: string;
  clientPartnerName: string;
  directContactNumber: string;
  zipCode: string;
  contactName: string;
  clientLocation: string;
  department: string;
  address: string;
  email: string;
  downloadFlag: string;
  downloadActionTimestamp: string;
}

export default function ClientPartners() {
  const [formData, setFormData] = useState<FormData>({
    clientId: "",
    clientPartnerName: "",
    directContactNumber: "",
    zipCode: "",
  });
  const [response, setResponse] = useState<ResponseData[]>([]);
  const [filteredData, setFilteredData] = useState<ResponseData[]>([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [updateClientPopup, setUpdateClientPopup] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const columns = [
    { id: "clientID", name: "Client ID", width: 120 },
    { id: "clientPartnerName", name: "Client Partner Name", width: 120 },
    {
      id: "directContactNumber",
      name: "Direct Contact Number",
      width: 100,
    },
    { id: "email", name: "Email", width: 100 },
    { id: "zipCode", name: "Zip Code", width: 120 },
    { id: "contactName", name: "Contact Name", width: 120 },
    { id: "clientLocation", name: "Client Location", width: 120 },
    { id: "department", name: "Department", width: 120 },
    { id: "address", name: "Address", width: 120 },
    { id: "downloaded", name: "Downloaded", width: 120 },
    { id: "downloadTimestamp", name: "Download Timestamp", width: 120 },
  ];
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = `http://localhost:8080/api/items`;
    try {
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const filteredResults = res.data.filter((item: any) => {
        return (
          (formData.clientId
            ? item.clientID.includes(formData.clientId.toLowerCase())
            : false) ||
          (formData.clientPartnerName
            ? item.clientPartnerName.includes(
                formData.clientPartnerName.toLowerCase()
              )
            : false) ||
          (formData.directContactNumber
            ? item.directContactNumber?.includes(formData.directContactNumber)
            : true) ||
          (formData.zipCode ? item.zipCode?.includes(formData.zipCode) : false)
        );
      });
      setResponse(res.data);
      setFilteredData(filteredResults);
      setNoDataFound(filteredResults.length === 0);
    } catch (error) {
      console.error("Error in GET request:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      clientId: "",
      clientPartnerName: "",
      directContactNumber: "",
      zipCode: "",
    });

    setFilteredData([]);
    setResponse([]);
    setNoDataFound(false);
  };

  const rowData = apiData.map((item: any) => ({
    ...item,
    directContactNumber: item.directContactNumber || "-",
    zipCode: item.zipCode || "-",
    contactName: item.contactName || "-",
    clientLocation: item.clientLocation || "-",
    department: item.department || "-",
    address: item.address || "-",
    email: item.email || "-",
    downloaded: item.downloaded ? "Yes" : "No",
    downloadTimestamp: item.downloadTimestamp || "-",
  }));

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Search for Client Partner
          </Typography>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2} className="form-grid">
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="text"
                  label="Client ID:"
                  size="small"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Client Partner Name:"
                  type="text"
                  size="small"
                  name="clientPartnerName"
                  value={formData.clientPartnerName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Direct Contact Number:"
                  type="tel"
                  size="small"
                  name="directContactNumber"
                  value={formData.directContactNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Zip Code:"
                  type="text"
                  name="zipCode"
                  size="small"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12} className="submit-div">
                <Button type="submit" fullWidth className="btn-submit">
                  Search
                </Button>
                <Button className="btn-clear" onClick={handleClear} fullWidth>
                  Clear
                </Button>
              </Grid>
            </Grid>
            {/* <div className="submit-div">
                <button type="submit" className="btn-submit">
                  Search
                </button>
                <button
                  type="button"
                  className="btn-clear"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div> */}
          </form>
          {/* </div> */}
          {noDataFound || rowData.length === 0 ? (
            <div className="submit-div" style={{ marginTop: "20px" }}>
              <div className="no-data-found">
                No data found, please modify your search!
              </div>
            </div>
          ) : (
            <Table
              clientPartner
              onRowClick={(data) => {
                setUpdateClientPopup(true);
              }}
              pagination
              columns={columns}
              data={rowData}
            />
          )}
          <Popup
            success
            open={success}
            handleClose={() => setSuccess(false)}
            body="Client successfully updated"
          />

          <UpdateClientStatusPopup
            isVisible={updateClientPopup}
            onClose={() => setUpdateClientPopup(false)}
            handleSubmit={() => {
              setUpdateClientPopup(false);
              setSuccess(true);
            }}
          />
        </Box>
      </Container>
    </div>
  );
}

const apiData = [
  {
    clientID: "CPID3882",
    clientPartnerName: "Walgreens",
    directContactNumber: "+1-415-555-0123",
    zipCode: "94105",
    contactName: "Sarah Miller",
    clientLocation: "San Francisco",
    department: "Pharmacy",
    address: "456 Market Street, San Francisco, CA",
    email: "sarah.miller@wg-test.com",
    downloaded: false,
    downloadTimestamp: 1738713600000,
  },
  {
    clientID: "CPID4571",
    clientPartnerName: "CVS Pharmacy",
    directContactNumber: "+1-312-555-0189",
    zipCode: "60601",
    contactName: "Michael Chen",
    clientLocation: "Chicago",
    department: "Operations",
    address: "233 Michigan Ave, Chicago, IL",
    email: "m.chen@cvs-test.net",
    downloaded: true,
    downloadTimestamp: 1738800000000,
  },
  {
    clientID: "CPID7823",
    clientPartnerName: "Walmart Pharmacy",
    directContactNumber: "+1-214-555-0145",
    zipCode: "75201",
    contactName: "Jessica Thompson",
    clientLocation: "Dallas",
    department: "Retail",
    address: "789 Main Street, Dallas, TX",
    email: "j.thompson@wm-test.com",
    downloaded: false,
    downloadTimestamp: 1738886400000,
  },
  {
    clientID: "CPID9234",
    clientPartnerName: "Rite Aid",
    directContactNumber: "+1-404-555-0178",
    zipCode: "30308",
    contactName: "Robert Wilson",
    clientLocation: "Atlanta",
    department: "Supply Chain",
    address: "567 Peachtree St, Atlanta, GA",
    email: "rwilson@riteaid-test.org",
    downloaded: true,
    downloadTimestamp: 1738972800000,
  },
  {
    clientID: "CPID6547",
    clientPartnerName: "Kroger Pharmacy",
    directContactNumber: "+1-713-555-0134",
    zipCode: "77002",
    contactName: "Emily Davis",
    clientLocation: "Houston",
    department: "Logistics",
    address: "890 Smith Street, Houston, TX",
    email: "e.davis@kroger-test.com",
    downloaded: false,
    downloadTimestamp: 1739059200000,
  },
  {
    clientID: "CPID5129",
    clientPartnerName: "Costco Pharmacy",
    directContactNumber: "+1-206-555-0167",
    zipCode: "98101",
    contactName: "David Martinez",
    clientLocation: "Seattle",
    department: "Procurement",
    address: "321 Pine Street, Seattle, WA",
    email: "d.martinez@costco-test.net",
    downloaded: true,
    downloadTimestamp: 1739145600000,
  },
];
