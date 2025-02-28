import {
  Box,
  Grid2 as Grid,
  Tooltip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Container from "../../../components/Container";
import { Download, ExpandMore } from "@mui/icons-material";
import { NoDataFound, Separator } from "../../../components/Divider";
import { addOneYear } from "../../../utils/addOneYear";
import Table from "../../../shared/Table";
import { useState } from "react";
import { getTypeForYear } from "../../../utils/getTypeForYears";

export default function FileDownloadPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0);

  //Table column.
  const columns = [
    { id: "type", name: "Key Status", width: 80 },
    { id: "keyType", name: "Key Type", width: 80 },
    { id: "keyLength", name: "Key Length", width: 80 },
    { id: "version", name: "Version" },
    { id: "effectiveDate", name: "Effective Date", width: 80 },
    { id: "expiryDate", name: "Expiry Date" },
    { id: "download", name: "Download", align: "center" },
  ];

  //Download host key button.
  const renderDownload = (item: any) => {
    return (
      <Tooltip arrow title="Download Host Key">
        <Download sx={{ color: "#000" }} />
      </Tooltip>
    );
  };

  // Function to generate row data
  const generateRowData = (details: any[]) => {
    return details.map((item: any) => ({
      ...item,
      effectiveDate: new Date(item.effectiveDate).toLocaleString(),
      expiryDate: addOneYear(new Date(item.effectiveDate).toLocaleString()),
      type: getTypeForYear(new Date(item.effectiveDate).toLocaleString()),
      download: renderDownload(item),
    }));
  };

  //Sample data.
  const sftpData = [
    {
      sftpLoginId: "efts03",
      details: [
        {
          keyType: "DSA",
          keyLength: "2048",
          version: "v1.9",
          effectiveDate: 1738713600000,
        },
      ],
    },
    {
      sftpLoginId: "efts02",
      details: [
        {
          keyType: "RSA",
          keyLength: "4096",
          version: "v1.1",
          effectiveDate: 1672531200000,
        },
      ],
    },
  ];

  // Toggle expansion on click
  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? false : index);
  };

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Download Host Key
          </Typography>
          <Separator />

          <Grid container spacing={2}>
            {sftpData.length > 0 ? (
              sftpData?.map((item: any, index: number) => (
                <Grid size={{ xs: 12, sm: 12 }} key={index}>
                  <Accordion
                    expanded={expandedIndex === index}
                    onChange={() => handleAccordionChange(index)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography variant="h6">
                        sFTP Login Id : {item.sftpLoginId}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Table inside accordion */}
                      <Table
                        pagination
                        columns={columns}
                        data={generateRowData(item.details)}
                        noDataText="Host Key Not Found"
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12, sm: 12 }}>
                <NoDataFound>Host Key Not Found</NoDataFound>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
