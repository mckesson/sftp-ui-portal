import Table from "../../../shared/Table";
import { useState } from "react";
import Container from "../../../components/Container";
import { Box, Typography } from "@mui/material";
import { Separator } from "../../../components/Divider";

export default function ReportList() {
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    {
      name: "Log Level",
      id: "logLevel",
      key: "logLevel",
    },
    {
      name: "Message",
      id: "message",
      key: "message",
    },
    {
      name: "Details",
      id: "details",
      key: "details",
    },
    {
      name: "Timestamp",
      id: "timestamp",
      key: "timestamp",
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ];

  const initialData = [
    {
      timestamp: "2025-02-01T10:15:00Z",
      logLevel: "UPLOAD",
      message: "Host key uploaded",
      details: "User ID: 12345, IP: 192.168.1.1",
    },
    {
      timestamp: "2025-02-01T10:17:00Z",
      logLevel: "DOWNLOAD",
      message: "Host key downloaded",
      details: "Server: srv001, Disk space: 2GB left",
    },
    {
      timestamp: "2025-02-01T10:18:00Z",
      logLevel: "UPLOAD",
      message: "Host key uploaded",
      details: "Error Code: 502, DB: db001",
    },
    {
      timestamp: "2025-02-01T10:19:00Z",
      logLevel: "REVIEW",
      message: "Host key reviewed by system admin",
      details: "File ID: 54321, File size: 10MB",
    },
    {
      timestamp: "2025-02-01T10:20:00Z",
      logLevel: "UPLOAD",
      message: "Host key uploaded",
      details: "User ID: 67890, Session Duration: 2 hours",
    },
    {
      timestamp: "2025-02-01T10:21:00Z",
      logLevel: "REVIEW",
      message: "Host key reviewed by system admin",
      details: "Service: payment-service, Timeout: 15 seconds",
    },
    {
      timestamp: "2025-02-01T10:22:00Z",
      logLevel: "UPLOAD",
      message: "Host key uploaded",
      details: "User ID: 23456, IP: 192.168.2.1",
    },
    {
      timestamp: "2025-02-01T10:23:00Z",
      logLevel: "REVIEW",
      message: "Host key reviewed by system admin",
      details: "Backup ID: 98765, Status: Successful",
    },
    {
      timestamp: "2025-02-01T10:24:00Z",
      logLevel: "DOWNLOAD",
      message: "Host key downloaded",
      details: "API: payment-api, Attempts: 100 requests/minute",
    },
  ];

  const filteredData = initialData.filter((item) => {
    return (
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="home-page">
      <Container>
        <Box className="content-body">
          <Typography variant="h4" gutterBottom className="heading">
            Recent Activity
          </Typography>
          <Separator />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table pagination columns={columns} data={filteredData} />
        </Box>
        {/* <Divider sx={{ margin: "20px 0" }} />
          <div className="announcements">
            <Typography variant="h4" gutterBottom>
              Announcements
            </Typography>
            <List>
              {announcements.map((announcement) => (
                <ListItem key={announcement.id}>
                  <ListItemText
                    primary={<strong>{announcement.title}</strong>}
                    secondary={announcement.content}
                  />
                </ListItem>
              ))}
            </List>
          </div> */}
        {/* </div> */}
      </Container>
    </div>
  );
}
