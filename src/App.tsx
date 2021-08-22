import React, { useState, useEffect } from "react";
import FormDialog from "./components/Dialog";
import Header from "./components/Header";
import InvoiceList from "./components/InvoiceList";
import Nav from "./components/Nav";
import { Invoice, Status } from "./helpers/types";
import "./App.css";
import { getInvoiceList, sendInvoiceList } from "./helpers/api";

function App() {
  const [invoiceList, setInvoiceList] = useState([] as Invoice[]);

  const handleAddInvoice = (invoice: Invoice) => {
    const newInvoiceList = [...invoiceList, invoice];
    setInvoiceList(newInvoiceList);
    sendInvoiceList(newInvoiceList);
  };

  const updateStatus = (id: number, newStatus: Status) => {
    const newInvoiceList = invoiceList.map((invoice) =>
      invoice.id === id ? { ...invoice, status: newStatus } : invoice
    );
    setInvoiceList(newInvoiceList);
    sendInvoiceList(newInvoiceList);
  };

  useEffect(() => {
    getInvoiceList().then((invoiceList) => setInvoiceList(invoiceList));
  }, []);

  return (
    <div className="App">
      <div className="Nav">
        <div className="container right">
          <Nav />
        </div>
      </div>
      <div className="Header">
        <div className="container left">
          <Header />
        </div>
      </div>

      <div className="Body">
        <div className="container">
          <FormDialog handleAddInvoice={handleAddInvoice} />
          <InvoiceList invoiceList={invoiceList} updateStatus={updateStatus} />
        </div>
      </div>
    </div>
  );
}

export default App;
