export interface ReportItemProps {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  type: string;
  createdAt: string;
  location: string;
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
