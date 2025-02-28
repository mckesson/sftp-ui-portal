import React from "react";
import Container from "../../components/Container";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

function Home() {
  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Welcome to McKesson's SFTP Key Management Portal
          </Typography>

          <Typography variant="body1" paragraph>
            Streamline your secure file transfer setup with our centralized key
            management solution. This portal simplifies how we distribute and
            manage SFTP host keys across our partner ecosystem.
          </Typography>

          <Typography variant="h6" className="heading-small" gutterBottom>
            What You Can Do Here:
          </Typography>

          <List sx={{ paddingLeft: 3, listStyleType: "initial" }}>
            <ListItem>
              <ListItemText primary="- Access and download SFTP host keys securely" />
            </ListItem>
            <ListItem>
              <ListItemText primary="- View comprehensive setup guides for your specific SFTP client" />
            </ListItem>
            <ListItem>
              <ListItemText primary="- Track key distribution and installation status" />
            </ListItem>
            <ListItem>
              <ListItemText primary="- Generate detailed activity reports" />
            </ListItem>
            <ListItem>
              <ListItemText primary="- Manage trading partner configurations" />
            </ListItem>
          </List>

          <Divider sx={{ margin: "20px 0" }} />

          <Typography variant="h6" className="heading-small" gutterBottom>
            Why This Portal Matters:
          </Typography>
          <Typography variant="body1" paragraph>
            Secure file transfer is critical to our business operations. This
            portal ensures you have everything needed to establish and maintain
            secure SFTP connections with McKesson's systems, all in one place.
          </Typography>

          <Divider sx={{ margin: "20px 0" }} />

          <Typography variant="h6" className="heading-small" gutterBottom>
            Your Security Is Our Priority:
          </Typography>
          <Typography variant="body1" paragraph>
            Every action in this portal is logged and monitored. Our systems
            comply with McKesson's stringent security standards, protecting your
            sensitive information at every step.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
