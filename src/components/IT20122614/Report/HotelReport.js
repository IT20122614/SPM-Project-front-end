import axios from "axios";
import React, { useEffect} from "react";
// import jsPDF from "jspdf";
import "jspdf-autotable";

export default function HotelReport() {
  // const [hotel, setHotels] = useState([]);

  useEffect(() => {
    function getHotels() {
      axios
        .get("http://localhost:8081/api/v1/hotel/display")
        .then((result) => {
          // setHotels(result.data);
          console.log("mv kfl")
          console.log(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getHotels();
  }, []);
  return (
    <div>

    </div>
  )
}
