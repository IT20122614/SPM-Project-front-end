import React, { Component } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getAllPayments } from "../../../services/IT20122096/tripPlanService";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import color from "../common/color";
import BackDrop from "../common/backDrop";
export default class Report extends Component {
  state = { payments: [], empty: false };
  componentDidMount = async () => {
    await getAllPayments()
      .then(({ data }) => {
        this.setState({
          payments: data,
        });
        if (data.length === 0) {
          this.setState({ empty: true });
        }
      })
      .catch((error) => {
        this.setState({ empty: true });
      });
  };
  getDate(d) {
    let date = new Date(d);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let postDate = date.getFullYear() + "-" + month + "-" + day;
    return postDate;
  }
  generatePFD() {
    let doc = new jsPDF();
    const payments = this.state.payments;
    const name = `PaymentReport_${new Date().getTime()}`;
    const columns = ["No", "Type", "Name", "Date", "Amount"];
    let rows = [];
    payments.map((payment, index) => {
      const row = [
        index + 1,
        payment.type,
        payment.name,
        this.getDate(payment.date),
        `LKR ${payment.amount}.00`,
      ];
      rows.push(row)
    });
    doc.text("Payments Report", 80, 18);
    doc.autoTable(columns, rows, { startY: 40 });
    doc.setFontSize(12)
    doc.text(`Date :${this.getDate(new Date())}`, 160, 38);
    doc.save(name);

  }

  render() {
    const { payments, empty } = this.state;
    return payments.length !== 0 && !empty ? (
      <div style={{ padding: "4rem" }}>
        <Button
          variant="contained"
          style={{ marginLeft: "90%" }}
          endIcon={<DownloadIcon />}
          onClick={() => {
            this.generatePFD()
          }}
        >
          download
        </Button>
        <div>
          <center>
            <h1 style={{color:color.primary}}>Payments Report</h1>
          </center>
        </div>
        <br />
        <br />

        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{payment.type}</td>
                    <td>{payment.name}</td>
                    <td>{this.getDate(payment.date)}</td>
                    <td>LKR {payment.amount}.00</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    ) : empty ? (
      <div>
        <center style={{ fontSize: "25px", color: color.primary }}>
          No Items to display
        </center>
      </div>
    ) : (
      payments.length == 0 && <BackDrop />
    );
  }
}
