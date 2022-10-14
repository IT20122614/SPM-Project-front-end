import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  deletePackage,
  getAllPackages,
} from "../../../services/IT20122096/packageService";
import BackDrop from "../common/backDrop";
import color from "../common/color";
import SearchBar from "../common/searchBar";
import TripCard from "../TripPlaning/currentPlannings/tripCard";
import PackageCard from "./packageCard";

export default class CurrentPackages extends Component {
  state = {
    tripPlans: [],
    empty: false,
    searchResult: "",
  };

  handleSideMenu = (item) => {
    this.setState({ selectedSideMenu: item });
  };

  async componentDidMount() {
    await getAllPackages()
      .then(({ data }) => {
        this.setState({ tripPlans: data });
        if (data.length === 0) {
          this.setState({ empty: true });
        }
      })
      .catch((error) => {
        this.setState({ empty: true });
      });
  }
  handleDelete = async (id) => {
    await deletePackage(id)
      .then(() => {
        toast.success("Deleted Successfully", { autoClose: 1000 });
        setTimeout(() => {
          window.location = "/packages";
        }, 2000);
      })
      .catch((error) => toast.error(error.response));
  };
  handleSearch = (item) => {

    this.setState({ searchResult: item });
    console.log(item)
  };
  getData = () => {
    const { tripPlans,searchResult } = this.state;
    let data = [];
    if (searchResult) {
      data = tripPlans.filter((t) =>
        (t.name+"").toLowerCase().includes(searchResult.toLowerCase())
      )
    }
    else {
      data = tripPlans;
    }
    return data;
  };
  render() {
    const {  empty } = this.state;
    const tripPlans = this.getData();
    console.log(tripPlans);
    console.log(tripPlans.length);
    return (
      <div
        style={{ overflowY: "scroll", height: `${window.innerHeight - 210}px` }}
      >
        <div>
          <SearchBar onChange={this.handleSearch} placeholder="Search..." />
        </div>
        {tripPlans.length !== 0 && !empty ? (
          <div>
            {tripPlans.map((plan, index) => {
              return <PackageCard plan={plan} onDelete={this.handleDelete} />;
            })}
          </div>
        ) : empty ? (
          <div>
            <center style={{ fontSize: "25px", color: color.primary }}>
              No Items to display
            </center>
          </div>
        ) : (
          tripPlans.length === 0 && <BackDrop />
        )}
      </div>
    );
  }
}
