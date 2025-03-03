export const menuItems = [
  {
    role: "System Administrator",
    items: [
      {
        label: "Host Key Management",
        path: "/host-key-management",
      },
      {
        label: "User Overview",
        path: "/search-ba",
      },
      {
        label: "View Trading Partner Details",
        path: "/view-trading-partner",
      },
    ],
  },
  {
    role: "Business Administrator",
    items: [
      {
        label: "Trading Partner",
        path: "/trading-partner",
      },
      {
        label: "sFTP Key Management",
        path: "/sftp-key-management",
      },
    ],
  },
  {
    role: "Trading Partner",
    items: [
      {
        label: "Server Key Management",
        path: "/download",
      },
      {
        label: "Client Key Management",
        path: "/client-key-management",
      },
      {
        label: "Update Contact",
        path: "/update-contact",
      },
      {
        label: "Support",
        path: "/support",
      },
      {
        label: "Instructions",
        path: "/instructions",
      },
    ],
  },
  {
    role: "Report User",
    items: [
      {
        label: "Reports",
        path: "/report-list",
      },
      // {
      //   label: "Run Reports",
      //   path: "/run-report",
      // },
    ],
  },
];
