export const statusList = {
  Open: 0,
  Paid: 1,
  Outstanding: 2,
};
export type Status = keyof typeof statusList;

export type TextValues = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  price: number;
  description: string;
};

export type Invoice = TextValues & {
  creationDate: Date;
  dueDate: Date;
  status: Status;
};

export type InvoiceListProps = {
  invoiceList: Invoice[];
  updateStatus: (id: number, newStatus: Status) => void;
};
export type RowProps = {
  invoice: Invoice;
  updateStatus: (id: number, newStatus: Status) => void;
};
export type DetailProps = { invoice: Invoice };
export type DialogProps = { handleAddInvoice: (invoice: Invoice) => void };
