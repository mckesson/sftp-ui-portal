import { useState } from "react";
import {
  Grid2 as Grid,
  Button,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Container from "../../../components/Container";
import { Separator } from "../../../components/Divider";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import { useSelector } from "react-redux";

interface FormValues {
  tradingPartnerName: string;
  businessUnit: string;
  contactPersons: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
  }[];
  sftpLoginIds: { loginId: string; password: string }[];
  cimsPartnerIds: { loginId: string; partnerId: string }[];
}

export default function ViewTradingPartnerDetails() {
  const { role } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  // Simulating the form values
  const partnerData: FormValues = {
    tradingPartnerName: "Walmart",
    businessUnit: "Hospital Finance Department",
    contactPersons: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        role: "Manager",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
        role: "Coordinator",
      },
    ],
    sftpLoginIds: [
      { loginId: "sftpUser1", password: "password1" },
      { loginId: "sftpUser2", password: "password2" },
    ],
    cimsPartnerIds: [
      { loginId: "cimsUser1", partnerId: "partner123" },
      { loginId: "cimsUser2", partnerId: "partner456" },
    ],
  };

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            View Trading Partner
          </Typography>
          <Separator />

          <Grid container spacing={2} className="form-grid">
            {/* Trading Partner Identification */}
            <Grid size={{ xs: 2, sm: 2 }}>
              <InputLabel htmlFor="tradingPartnerName">
                Trading Partner Name:
              </InputLabel>
            </Grid>
            <Grid size={{ xs: 10, sm: 10 }}>
              <Typography variant="body1">
                {partnerData.tradingPartnerName}
              </Typography>
            </Grid>

            {/* Business Unit */}
            <Grid size={{ xs: 2, sm: 2 }}>
              <InputLabel htmlFor="businessUnit">Business Unit:</InputLabel>
            </Grid>
            <Grid size={{ xs: 10, sm: 10 }}>
              <Typography variant="body1">
                {partnerData.businessUnit}
              </Typography>
            </Grid>

            {/* Contact Persons */}
            <Grid size={12}>
              <Typography variant="h6" className="heading-small">
                Contact Persons
              </Typography>
              <Separator />
              {partnerData.contactPersons.map((contact, index) => (
                <Box
                  key={index}
                  padding={2}
                  marginBottom={2}
                  className="contact-box"
                >
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="body1">
                        First Name: {contact.firstName}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body1">
                        Last Name: {contact.lastName}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body1">
                        Email: {contact.email}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body1">
                        Phone: {contact.phone}
                      </Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body1">
                        Role: {contact.role}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Grid>

            {/* sFTP Login IDs */}
            <Grid size={12}>
              <Typography variant="h6" className="heading-small">
                sFTP Login IDs
              </Typography>
              <Separator />
              {partnerData.sftpLoginIds.map((item, index) => (
                <Grid container key={index} spacing={2}>
                  <Grid size={5} className="mb-10">
                    <Typography variant="body1">
                      Login ID: {item.loginId}
                    </Typography>
                  </Grid>
                  <Grid size={5} className="mb-10">
                    <Typography variant="body1">
                      Password: {item.password}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* CIMS Partner IDs */}
            <Grid size={12}>
              <Typography variant="h6" className="heading-small">
                CIMS Partner IDs
              </Typography>
              <Separator />
              {partnerData.cimsPartnerIds.map((item, index) => (
                <Grid container key={index} spacing={2}>
                  <Grid size={5} className="mb-10">
                    <Typography variant="body1">
                      sFTP Login ID: {item.loginId}
                    </Typography>
                  </Grid>
                  <Grid size={5}>
                    <Typography variant="body1">
                      Partner ID: {item.partnerId}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid size={12} className="submit-div">
              <Button
                className="btn-clear"
                onClick={() => {
                  role === "System Administrator"
                    ? navigate("/view-trading-partner")
                    : navigate("/trading-partner");
                }}
                fullWidth
              >
                Back
              </Button>
            </Grid>
          </Grid>

          <Popup
            open={success}
            success
            body="Trading Partner View Successful"
            handleSuccess={() => {
              setSuccess(false);
              navigate("/trading-partner");
            }}
            cancelButton="OK"
            confirmButton="OK"
          />
        </Box>
      </Container>
    </div>
  );
}
