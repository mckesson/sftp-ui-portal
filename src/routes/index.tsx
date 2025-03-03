import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FileDownloadPage from "../views/TradingPartner/DownloadHostKey/FileDownloadPage";
import UsersList from "../views/SystemAdmin/AddUsers";
import AddUsers from "../views/SystemAdmin/AddUsers/AddUsers";
import { Instructions } from "../views/Instructions";
import TradingPartnerList from "../views/BusinessAdmin/TradingPartner";
import AddTradingPartner from "../views/BusinessAdmin/TradingPartner/AddTradingPartner";
import ClientPartners from "../views/BusinessAdmin/ClientPartners";
import ReportList from "../views/ReportUser/ReportList/ReportList";
import HostKeyManagement from "../views/SystemAdmin/HostKeyManagement/HostKeyManagement";
import { useSelector } from "react-redux";
import ClientKeyManagement from "../views/TradingPartner/ClientKeyManagement";
import ViewTradingPartner from "../views/SystemAdmin/TradingPartner";
import UpdateContact from "../views/TradingPartner/UpdateContact";
import Support from "../views/TradingPartner/Support";
import ListHostKey from "../views/SystemAdmin/HostKeyManagement";
import KeyManagement from "../views/BusinessAdmin/KeyManagement";
import AddUpdateClientKey from "../views/TradingPartner/ClientKeyManagement/AddUpdateClientKey";
import ViewTradingPartnerDetails from "../views/SystemAdmin/TradingPartner/ViewTradingPartner";

export default function AppRoutes() {
  const { role } = useSelector((state) => state?.user);

  // Redirect logic based on role
  const getInitialRedirectPath = () => {
    if (role === "System Administrator") return "/host-key-management";
    if (role === "Business Administrator") return "/trading-partner";
    if (role === "Trading Partner") return "/download";
    if (role === "Report User") return "/report-list";
    return "/"; // Default route
  };

  if (!role) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/host-key-management" element={<ListHostKey />} />
        <Route
          path="/upload/host-key-management"
          element={<HostKeyManagement />}
        />
        <Route path="/report-list" element={<ReportList />} />
        <Route path="/sftp-key-management" element={<KeyManagement />} />
        <Route path="/trading-partner" element={<TradingPartnerList />} />
        <Route path="/view-trading-partner" element={<ViewTradingPartner />} />
        <Route
          path="/view/trading-partner/:partner-id"
          element={<ViewTradingPartnerDetails />}
        />
        <Route path="/add/trading_partner" element={<AddTradingPartner />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/search-ba" element={<UsersList />} />
        <Route path="/search-ba/add" element={<AddUsers />} />
        <Route path="/download" element={<FileDownloadPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/update-contact" element={<UpdateContact />} />
        <Route
          path="/client-key-management"
          element={<ClientKeyManagement />}
        />
        <Route
          path="/update/client_key/:client_id"
          element={<AddUpdateClientKey />}
        />
        <Route path="/add/client_key" element={<AddUpdateClientKey />} />
        <Route path="/client-partners" element={<ClientPartners />} />
        <Route
          path="*"
          element={<Navigate to={getInitialRedirectPath()} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
