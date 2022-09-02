import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TransportServicesRequests() {
    const params = useParams();

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function getRequests() {
            
        }
    })
}