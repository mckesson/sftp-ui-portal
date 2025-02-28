import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../apiBase";
// import moment from "moment";

interface UploadResponse {
  message: string;
  fileUrl?: string;
}

interface FileUploadData {
  hostKey: File;
  version: string;
  partnerType: string;
  keyEncrypt: string;
  keyLength: string;
  url: string;
  description: string;
  changeRequestId: string;
  effectiveDate: Date | null;
}

export const uploadHostKey = async ({
  hostKey,
  version,
  partnerType,
  keyEncrypt,
  keyLength,
  url,
  description,
  changeRequestId,
  effectiveDate,
}: FileUploadData): Promise<AxiosResponse<UploadResponse> | Error> => {
  const formData = new FormData();
  formData.append("file", hostKey);
  formData.append("version", version);
  formData.append("keytype", keyEncrypt);
  formData.append("keyLength", keyLength);
  formData.append("url", url);
  formData.append("description", description);
  formData.append("change_request_id", changeRequestId);

  if (effectiveDate) {
    const formattedDate = effectiveDate.toISOString().split("T")[0];
    formData.append("effective_date", formattedDate);
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: unknown) {
    //    catch (error) {
    //     console.error("Error uploading file:", error);
    //     return error;
    //   }
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return error;
    } else {
      console.error("General error:", (error as Error).message);
      return error as Error;
    }
  }
};
