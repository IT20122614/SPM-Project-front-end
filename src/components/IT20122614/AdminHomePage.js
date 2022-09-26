import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Packages from "../IT20122096/packeges/packeges";
import Header from "../IT20192082/Header";
import TransportServicesRegistered from "../IT20216078/TransportServicesRegistered";
import TransportServicesRequests from "../IT20216078/TransportServicesRequests";

export default function AdminHomePage() {
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
    window.location.href = "/report";
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
                <h3>Plan Management</h3>
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
                      class="button button5 btnShadow"
                      onClick={navigateToAddNewHotel}
                    >
                      <i class="material-icons">add_home_work</i>
                    </button>
                  </td>
                  <td>
                    <button
                      class="button button5 btnShadow"
                      onClick={navigateToEditHotel}
                    >
                      <i class="material-icons">edit</i>
                    </button>
                  </td>
                  <td>
                    <button
                      class="button button5 btnShadow"
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
