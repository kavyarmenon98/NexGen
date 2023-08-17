export interface ReceivedAppreciation {
  id: string;
  type: number;
  remarks: string;
  userResponse: string;
  by: string;
  hasResponded: boolean;
  createdDate: Date;
  respondedDate: Date;
}
