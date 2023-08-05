export interface ReportItemType {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  type: {
    name: string;
    id: number;
  };
  createdAt: string;
  location: {
    name: string;
    id: number;
    latitude: number;
    longitude: number;
  };
  room: string;
  createdBy?: {
    name: string;
    username: string;
  };
  worker?: {
    name: string;
    phone: string;
  };
  phone: string;
  content: string;
}
