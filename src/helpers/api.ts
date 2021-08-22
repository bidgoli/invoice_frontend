import superagent from "superagent";
import { dateTimeReviver } from "./date";
import { Invoice } from "./types";

const baseURL = "http://localhost:3001/";

export function sendInvoiceList(invoiceList: Invoice[]) {
  superagent
    .post(baseURL)
    .send({ invoiceList })
    .then((res) => {
      if (res.status !== 200) {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
}

export function getInvoiceList(): Promise<Invoice[]> {
  return superagent
    .get(baseURL)
    .then((res) => {
      const parsedInvoiceList: Invoice[] = JSON.parse(
        res.body.invoiceList,
        dateTimeReviver
      );

      return parsedInvoiceList;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export function sendEmail(invoice: Invoice) {
  superagent.post(baseURL + "email/").send({ invoice });
}
