
export interface IOccurrence {
  id?: string;
  collaboratorId: string;
  customerName: string;
  collaboratorName: string;
  customerId: string;
  description: string;
  occurrenceDate: Date;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}
