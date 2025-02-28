import React, { useState } from "react";
import Container from "../../components/Container";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Grid2 as Grid,
} from "@mui/material";
import { Separator } from "../../components/Divider";

export const Instructions = () => {
  const [selectedClient, setSelectedClient] = useState("IBM SI");

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Instructions
          </Typography>
          <Separator />
          <br />
          <Grid container>
            <Grid size={12}>
              <FormControl fullWidth sx={{ marginBottom: 3 }}>
                <InputLabel htmlFor="ftpClient">FTP Client</InputLabel>
                <Select
                  fullWidth
                  size="small"
                  id="ftpClient"
                  value={selectedClient}
                  onChange={handleClientChange}
                  label="FTP Client"
                >
                  <MenuItem value="IBM SI">IBM SI</MenuItem>
                  <MenuItem value="WinSCP">WinSCP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              {selectedClient === "WinSCP" && (
                <Box>
                  <Typography variant="h4" gutterBottom className="heading">
                    How to Set Up WinSCP with McKesson SFTP Host Key
                  </Typography>
                  <Typography variant="h6" className="heading-small">
                    Prerequisites
                  </Typography>
                  <ul>
                    <li>
                      WinSCP installed on your computer (Download from:{" "}
                      <a
                        href="https://winscp.net/eng/download.php"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://winscp.net/eng/download.php
                      </a>
                      )
                    </li>
                    <li>McKesson SFTP portal access credentials</li>
                    <li>Your SFTP username and password from McKesson</li>
                  </ul>

                  <Typography variant="h6" className="heading-small">
                    Step 1: Download the Host Key
                  </Typography>
                  <ol>
                    <li>Log in to the McKesson SFTP Key Management Portal</li>
                    <li>Navigate to the "Host Key Download" section</li>
                    <li>Click "Download Host Key" button</li>
                    <li>
                      Save the key file to a secure location on your computer
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 2: Install and Launch WinSCP
                  </Typography>
                  <ol>
                    <li>
                      If not already installed, download and install WinSCP
                    </li>
                    <li>Launch WinSCP</li>
                    <li>When WinSCP opens, you'll see the "Login" dialog</li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 3: Configure New Site in WinSCP
                  </Typography>
                  <ol>
                    <li>
                      In the Login dialog, click "New Site" on the left side
                    </li>
                    <li>
                      Enter the following details in the right panel:
                      <ul>
                        <li>- File Protocol: SFTP</li>
                        <li>- Host name: sftp.edi.mckesson.com</li>
                        <li>- Port number: 22</li>
                        <li>
                          - Username: [Your McKesson-provided SFTP username]
                        </li>
                        <li>
                          - Password: [Your McKesson-provided SFTP password]
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 4: Configure Host Key
                  </Typography>
                  <ol>
                    <li>Click "Advanced" button</li>
                    <li>
                      In the Advanced Site Settings dialog:
                      <ul>
                        <li>- Go to SSH → Host Keys in the left tree</li>
                        <li>- Click "Import" button</li>
                        <li>
                          - Browse to and select the host key file you
                          downloaded in Step 1
                        </li>
                        <li>- Click "OK" to import the key</li>
                        <li>
                          - Verify that the key appears in the host keys list
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 5: Save and Connect
                  </Typography>
                  <ol>
                    <li>Back in the Login dialog, click "Save" button</li>
                    <li>
                      Enter a name for this site configuration (e.g., "McKesson
                      SFTP")
                    </li>
                    <li>Click "OK" to save</li>
                    <li>Click "Login" to connect</li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 6: Verify Connection
                  </Typography>
                  <ol>
                    <li>WinSCP will attempt to connect to the SFTP server</li>
                    <li>
                      If successful, you'll see your home directory on the right
                      panel
                    </li>
                    <li>
                      You can now transfer files between your local computer
                      (left panel) and the SFTP server (right panel)
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Troubleshooting Common Issues
                  </Typography>
                  <ul>
                    <li>
                      If connection fails with "Host key verification failed":
                      <ul>
                        <li>- Verify you imported the correct host key file</li>
                        <li>- Try downloading the host key file again</li>
                      </ul>
                    </li>
                    <li>
                      If connection fails with "Authentication failed":
                      <ul>
                        <li>- Double-check your username and password</li>
                        <li>- Ensure your credentials are active</li>
                      </ul>
                    </li>
                    <li>
                      If you can't see files after connecting:
                      <ul>
                        <li>- Verify your account has proper permissions</li>
                        <li>
                          - Contact McKesson support for access verification
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <Typography variant="h6" className="heading-small">
                    Security Best Practices
                  </Typography>
                  <ul>
                    <li>- Always keep your host key file secure</li>
                    <li>- Never share your credentials with others</li>
                    <li>- Always encrypt sensitive files before transfer</li>
                    <li>- Log out when you're done with file transfers</li>
                    <li>- Regularly update your password</li>
                  </ul>

                  <Typography variant="body1">
                    For additional support or questions, contact McKesson SFTP
                    Support at [support contact details]
                  </Typography>
                </Box>
              )}

              {selectedClient === "IBM SI" && (
                <Box>
                  <Typography variant="h4" gutterBottom className="heading">
                    Setting Up IBM Sterling Integrator for McKesson SFTP
                    Connection
                  </Typography>
                  <Typography variant="h6" className="heading-small">
                    Prerequisites
                  </Typography>
                  <ul>
                    <li>- IBM Sterling Integrator installed and configured</li>
                    <li>- McKesson SFTP portal access credentials</li>
                    <li>- Your SFTP username and password from McKesson</li>
                    <li>- Administrative access to Sterling Integrator</li>
                  </ul>

                  <Typography variant="h6" className="heading-small">
                    Step 1: Download the Host Key
                  </Typography>
                  <ol>
                    <li>Log in to the McKesson SFTP Key Management Portal</li>
                    <li>Navigate to the "Host Key Download" section</li>
                    <li>Click "Download Host Key" button</li>
                    <li>
                      Save the key file to a secure location on your SI server
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 2: Configure Host Key in Sterling Integrator
                  </Typography>
                  <ol>
                    <li>Launch IBM Sterling Integrator Administrator</li>
                    <li>Navigate to Services → Security Services</li>
                    <li>Select "Known Hosts Configuration"</li>
                    <li>Click "Add" to create a new known host entry</li>
                    <li>
                      Enter the following details:
                      <ul>
                        <li>- Host: sftp.edi.mckesson.com</li>
                        <li>- Port: 22</li>
                        <li>- Type: SFTP</li>
                        <li>
                          - Import the host key file you downloaded in Step 1
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 3: Create SFTP Consumer/Producer Service
                  </Typography>
                  <ol>
                    <li>Navigate to Services → Protocol Services</li>
                    <li>Create a new SFTP Consumer or Producer service</li>
                    <li>
                      Configure the basic service properties:
                      <ul>
                        <li>- Service Name: [e.g., "McKesson_SFTP"]</li>
                        <li>- Description: [Optional]</li>
                        <li>- Service Type: SFTP Consumer/Producer</li>
                        <li>- State on Startup: Active</li>
                      </ul>
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 4: Configure Connection Details
                  </Typography>
                  <ol>
                    <li>
                      In the service configuration, enter the following:
                      <ul>
                        <li>- Remote Host: sftp.edi.mckesson.com</li>
                        <li>- Port: 22</li>
                        <li>- Authentication Method: Password</li>
                        <li>
                          - Username: [Your McKesson-provided SFTP username]
                        </li>
                        <li>
                          - Password: [Your McKesson-provided SFTP password]
                        </li>
                        <li>
                          - Remote Directory: [Your assigned directory path]
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 5: Configure Additional SFTP Properties
                  </Typography>
                  <ol>
                    <li>
                      Set the following properties:
                      <ul>
                        <li>- Connection Timeout: 60 (seconds)</li>
                        <li>- Socket Timeout: 60 (seconds)</li>
                        <li>- Max Retries: 3</li>
                        <li>- Retry Interval: 60 (seconds)</li>
                        <li>
                          - Delete After Retrieval: [Based on your requirements]
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Step 6: Test Connection
                  </Typography>
                  <ol>
                    <li>Save all configurations</li>
                    <li>Start the service</li>
                    <li>Monitor the service log for connection status</li>
                  </ol>

                  <Typography variant="h6" className="heading-small">
                    Troubleshooting Common Issues
                  </Typography>
                  <ul>
                    <li>
                      - If authentication fails, verify host key and credentials
                    </li>
                    <li>
                      - If file transfer fails, check directory permissions and
                      file naming conventions
                    </li>
                  </ul>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};
