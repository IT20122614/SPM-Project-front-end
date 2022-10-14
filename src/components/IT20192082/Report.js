import React, {Component} from "react";
import {
userFavoritePlaces
} from "../../services/IT20192082/placeManagement";
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';


export default class Report extends Component{

    constructor(props){
        super(props);
      
        this.state = {
            columns: ["Place Name", "Location", "Rating", "Description", "Other Places"],
            places: [],
        };
      }
      
      componentDidMount(){
        this.retrieveReports();
      }

      onSubmit = async (e) => {
        await userFavoritePlaces().then((res) => {
          this.setState({
            places: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      
    
        const doc = new jsPDF();
        let date = new Date();
        let Rows = [];
        this.state.places.forEach((place) => {
          const Mark = [place.name, place.location, parseInt(place.rating/ place.ratingCount), place.description, place.otherPlacesArray[0].name + "," + place.otherPlacesArray[1].name];
          Rows.push(Mark);
          return null;
        });
        doc.setFontSize(25);
        doc.text("Places List", 70, 18);
        doc.setFontSize(15);
        doc.text(`Date :${date}`, 10, 150);
        doc.autoTable(this.state.columns, Rows, { startY: 40 });
    
        doc.save("Place Report.pdf");
      };
      
      async retrieveReports(){
        await userFavoritePlaces().then((res) => {
          this.setState({
            places: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      }

 render() {
        return (

    <div className='container'>
    <p>Places List</p>
    <table className="table">
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Place Name</th>
          <th scope='col'>Location</th>
          <th scope='col'>Rating</th> 
          <th scope='col'>Description</th> 
          <th scope='col'>Other Places</th> 
        </tr>
      </thead>
      <tbody>
      {this.state.places.map((place,index) =>(
        <tr key={index}>
          <th scope='row'>{index+1}</th>
          <td>{place.name}</td>
          <td>{place.location}</td>
          <td>{parseInt(place.rating/ place.ratingCount)}</td>  
          <td>{place.description}</td>  
          <td>{place.otherPlacesArray[0].name + ", " + place.otherPlacesArray[1].name}</td>  
        </tr>      
      ))}
      
    </tbody>
    </table>
    <button
            className="btn btn-success"
            type="submit"
            style={{ marginBottom: "15px" ,marginLeft: "15px" }}
            onClick={this.onSubmit}
          >
            <i className="far fa-check-square"></i>&nbsp; Pdf
          </button>
    </div>

        )};

      }
