import { Component } from "react";
import { places } from "../../services/IT20192082/placeManagement";

export default class PlaceList extends Component {
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

 async filterData(places,searchKey){
    const result = await places.filter((place) => 
    place.name.toLowerCase().includes(searchKey) ||place.location.toLowerCase().includes(searchKey)
   )
   this.setState({ places: result })
 }
 
 handleSearchArea = async (e) => {
   const searchKey = e.currentTarget.value;
 
  await places().then(res =>{
         this.filterData(res.data,searchKey)
   });
 }

  render() {
    return (
      <div>
        <div className='row'>
      <div className='col-lg-9 mt-2 mb-2'>
        <h4>Serch by name and location</h4>
      </div>
      <div className='col-lg-3 mt-2 mb-2'>
        <input
        className='form-control'
        type='search'
        placeholder='Search'
        name='searchQuery'
        onChange={this.handleSearchArea}>

        </input>
      </div>
    </div>


        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Rating</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
