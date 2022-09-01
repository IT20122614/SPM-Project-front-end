import { Component } from "react";
import { places } from "../../services/IT20192082/placeManagement";

export default class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.retrievePlaces();
  }

  async retrievePlaces() {
    await places()
      .then((res) => {
          this.setState({
            places: res.data,
          });
          console.log(this.state.places); 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <p>All Places</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Rating</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            {this.state.places.map((place, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a
                    href={`/place/${place.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {place.name}
                  </a>
                </td>
                <td>{place.location}</td>
                <td>{place.rating}</td>
                <td><a href={`/edit/${place.id}`}>
        <button type="button" className="btn btn-success">Edit</button>
        </a>
        <a href={`/delete/${place.id}`}>
        <button type="button" className="btn btn-success">Delete</button>
        </a></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    );
  }
}
