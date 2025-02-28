import React, { useState } from "react";

interface UpdateClientStatusPopupProps {
  isVisible: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

const UpdateClientStatusPopup: React.FC<UpdateClientStatusPopupProps> = ({
  isVisible,
  onClose,
  handleSubmit,
}) => {
  // State to track the checkboxes
  const [clientStatus, setClientStatus] = useState<string[]>([]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setClientStatus((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((status) => status !== value)
    );
  };

  if (!isVisible) return null;

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <h2 className="title">Update Client Status</h2>
        <div className="form-box">
          <form style={popupStyles.formDiv}>
            <div style={{ ...popupStyles.radioContainer, marginTop: "15px" }}>
              <label style={popupStyles.label}>
                <input
                  type="checkbox"
                  name="clientStatus"
                  value="clientContacted"
                  checked={clientStatus.includes("clientContacted")}
                  onChange={handleCheckboxChange}
                />
                Client Contacted
              </label>
            </div>
            <div style={popupStyles.radioContainer}>
              <label style={popupStyles.label}>
                <input
                  type="checkbox"
                  name="clientStatus"
                  value="hostKeyDownloaded"
                  checked={clientStatus.includes("hostKeyDownloaded")}
                  onChange={handleCheckboxChange}
                />
                Host Key Downloaded by Client
              </label>
            </div>
            <div style={popupStyles.radioContainer}>
              <label style={popupStyles.label}>
                <input
                  type="checkbox"
                  name="clientStatus"
                  value="canUseNewHostKey"
                  checked={clientStatus.includes("canUseNewHostKey")}
                  onChange={handleCheckboxChange}
                />
                Client Can Use New Host Key
              </label>
            </div>
            <div style={popupStyles.buttons}>
              <button
                type="button"
                onClick={onClose}
                style={popupStyles.closeButton}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                style={popupStyles.submitButton}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Simple styling for the popup
const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
    // textAlign: 'center',
  },
  radioContainer: {
    // marginBottom: '10px',
    // textAlign: 'left',
  },
  label: {
    color: "#333",
  },
  checkboxContainer: {
    marginBottom: "10px",
    textAlign: "left",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  closeButton: {
    padding: "8px 16px",
    backgroundColor: "#FFF",
    color: "#000",
    border: "1px solid #000",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "15px",
  },
  submitButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UpdateClientStatusPopup;
