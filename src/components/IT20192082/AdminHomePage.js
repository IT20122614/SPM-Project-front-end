import * as React from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./AdminPanel.css"

const AdminHomePage = () => {


  return (
    <div>
      <div>
        <Tabs>
          <div className="center adminTab">
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
        </Tabs>
      </div>
    </div>
  );
}

export default AdminHomePage;