import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function AdminHomePage() {
  const navigateToAddNewHotel = () => {
    // 👇️ navigate to /contacts
    window.location.href = "/add-hotel";
  };
  const navigateToEditHotel = () => {
    // 👇️ navigate to /contacts
    window.location.href = "/edit-hotel";
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
            </TabList>
          </div>

          <TabPanel>
            <h2>Any content 1</h2>
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
                      onClick={navigateToAddNewHotel}
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
            <h2>Any content 3</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
