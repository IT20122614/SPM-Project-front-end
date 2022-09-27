import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Packages from "../IT20122096/packeges/packeges";
import Header from "../IT20192082/Header";
import TransportServicesRegistered from "../IT20216078/TransportServicesRegistered";
import TransportServicesRequests from "../IT20216078/TransportServicesRequests";

export default function AdminHomePage() {
  const [hotels, setHotels] = useState([]);

  const navigateToAddNewHotel = () => {
    // 👇️ navigate to /contacts
    window.location.href = "/add-hotel";
  };
  const navigateToEditHotel = () => {
    // 👇️ navigate to /contacts
    window.location.href = "/edit-hotel";
  };

  const reportHotel = () => {
    // 👇️ navigate to /contacts
    // window.location.href = "/report";
    axios
      .get("http://localhost:8081/api/v1/hotel/display")
      .then((result) => {
        setHotels(result.data);
        console.log("mv kfl");
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });

    let doc = new jsPDF();

    const name = "Payment Report";
    const columns = ["No", "Type", "Name", "description", "Address", "city"];
    let rows = [];
    hotels.map((hotel, index) => {
      const row = [
        index + 1,
        hotel.type,
        hotel.name,
        hotel.description,
        hotel.address,
        hotel.city,
      ];
      rows.push(row);
    });
    doc.text("Hotel Report", 80, 18);
    doc.autoTable(columns, rows, { startY: 40 });
    doc.setFontSize(12);
    doc.text(`Date :${new Date()}`, 15, 38);
    doc.save(name);
  };

  return (
    <div>
      <div>
        <Tabs>
          <div className="center2 adminTab">
            <TabList>
              <Tab>
                <h3>Place Management</h3>
              </Tab>
              <Tab>
                <h3>Hotel Management</h3>
              </Tab>
              <Tab>
                <h3>Transport Management</h3>
              </Tab>
              <Tab>
                <h3>Package Management</h3>
              </Tab>
            </TabList>
          </div>

          <TabPanel>
            <div>
              <Header />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="center2">
              <table width="100%">
                <tr>
                  <td>
                    <button
                      class="button1 button5 btnShadow"
                      onClick={navigateToAddNewHotel}
                    >
                      <i class="material-icons">add_home_work</i>
                    </button>
                  </td>
                  <td>
                    <button
                      class="button1 button5 btnShadow"
                      onClick={navigateToEditHotel}
                    >
                      <i class="material-icons">edit</i>
                    </button>
                  </td>
                  <td>
                    <button
                      class="button1 button5 btnShadow"
                      onClick={reportHotel}
                    >
                      <i class="material-icons">summarize</i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Add New Hotel</td>
                  <td>Edit Hotel</td>
                  <td>Generate Report</td>
                </tr>
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <div>
                <TransportServicesRequests />
              </div>
              <div>
                <TransportServicesRegistered />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <Packages />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
