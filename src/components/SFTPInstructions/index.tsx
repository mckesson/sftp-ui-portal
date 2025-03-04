import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const headings: string[] = [
  "Replacement from Mck_TestView",
  "Manual send to Premier",
  "Inmar",
  "for Symphony Health",
  "InnerWorkings",
  "Altus",
  "MSH",
  "NetRX",
  "CBGP",
  "BioMatrix",
  "CBG",
  "n/a",
  "Applied Underwriters",
  "HealthMart",
  "ScriptPro",
  "Savmor",
  "ReconRX",
  "Walgreens",
  "Well care pharmacy Utah PHS CBG",
  "CBG-NOMI Health",
];

const SFTPServiceAccordion: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(headings[0]);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {headings.map((heading, index) => (
        <Grid container spacing={2} key={index}>
          <Grid size={12} sx={{ marginBottom: "10px" }}>
            <Accordion
              expanded={expanded === heading}
              onChange={handleChange(heading)}
              key={index}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" className="heading-small">
                  {heading}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
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
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default SFTPServiceAccordion;
