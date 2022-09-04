import React, { Component } from "react";
import HotelBookForm from "./hotelBookForm";
import PlaceSelectForm from "./placeSelectForm";
import TransportSelectForm from "./transportSelectForm";

export default class HotelBookModal extends Component {
  state = {
    data: "",
    isSaved: false,
  };
  handleGetSelectedData = (data) => {
    this.setState({ data });
  };

  handleSave = () => {
    this.setState({ isSaved: true });
  };

  

  render() {
    const { onClose, choice, name } = this.props;
    return (
      <div>
        {/* <!-- Modal --> */}
        <div class="modal  fade " id="staticBackdrop">
          <div
            class={`modal-dialog ${
              name === "hotel"
                ? "modal-lg"
                : name === "transport"
                ? "modal-lg"
                : ""
            }`}
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  {choice.name}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => onClose()}
                ></button>
              </div>
              {choice && (
                <div class="modal-body">
                  {name === "hotel" ? (
                    <HotelBookForm
                      selectedHotel={choice}
                      getData={this.handleGetSelectedData}
                      isSaved={this.handleSave}
                    />
                  ) : name === "place" ? (
                    <PlaceSelectForm
                      Selectedplace={choice}
                      getData={this.handleGetSelectedData}
                      isSaved={this.handleSave}
                    />
                  ) : name === "transport" ? (
                    <TransportSelectForm
                      selectedTransport={choice}
                      getData={this.handleGetSelectedData}
                      isSaved={this.handleSave}
                    />
                  ) : null}
                </div>
              )}
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => onClose()}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {this.props.onSubmit(this.state.data,name)} }
                  disabled={!this.state.isSaved}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
