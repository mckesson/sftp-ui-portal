import { Typography, Box, Grid2 as Grid } from "@mui/material";
import Container from "../../../components/Container";
import { Separator } from "../../../components/Divider";
import { PhoneIphone, MailOutline } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function Support() {
  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Need Assistance? We're Here to Help!
          </Typography>
          <Separator />
          <Grid spacing={2} className="contact-support-content column">
            <Grid size={12}>
              <Typography className="heading-contact">
                Hello, Partner! If you're experiencing issues with downloading
                the host key or uploading your SFTP client key, don’t
                worry—we’ve got your back. Our dedicated support team is ready
                to assist you.
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography className="heading-support">
                Contact Support:
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="contact-support-content">
            <Grid size={1}>
              <PhoneIphone />
            </Grid>
            <Grid size={11}>
              <Typography>
                Call us at <b>(800) 793-9875</b> for immediate help.
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="contact-support-content">
            <Grid size={1}>
              <MailOutline />
            </Grid>
            <Grid size={11}>
              <Typography>
                Send us an email at{" "}
                <a
                  href="mailto:edicustomersupport@mckesson.com"
                  className="mail-link"
                >
                  edicustomersupport@mckesson.com
                </a>{" "}
                and we'll get back to you within 24 hours.
              </Typography>
            </Grid>
          </Grid>
          <Grid spacing={2} className="contact-support-content column">
            <Grid size={12}>
              <Typography className="heading-support">
                Self-Help Resources:
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="contact-support-content">
            <Grid size={12}>
              <Typography style={{ listStyleType: "circle" }}>
                <b>Step-by-Step Guides:</b> Easy-to-follow{" "}
                <NavLink className="mail-link" to="/instructions">
                  instructions
                </NavLink>{" "}
                for downloading and uploading keys.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
