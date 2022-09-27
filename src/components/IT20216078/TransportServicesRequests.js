import * as React from "react"
import { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

const Record = (props) => (
    <tr>
        <td>
            {props.record.companyName}
        </td>
        <td>
            {props.record.companyEmailAddress}
        </td>
        <td>
            {props.record.companyHotline}
        </td>
        <td>
            {props.record.landTransport}
        </td>
        <td>
            {props.record.airTransport}
        </td>
        <td>
            {props.record.waterTransport}
        </td>
        <td>
            {props.record.locations}
        </td>
        <td>
            <button
                className="btn btn-danger"
                onClick={() => {
                    props.declineRequest(props.record.companyEmailAddress);
                }}
            >
                Decline
            </button>
            &nbsp;&nbsp;
            <button
                className="btn btn-primary"
                onClick={() => {
                    props.acceptRequest(props.record.companyEmailAddress);
                }}
            >
                Accept
            </button>
        </td>
    </tr>
);

export default function TransportServicesRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:8081/transport-services/requested`);

            const requests = await response.json();

            setRequests(requests);
        }

        getRecords();

        return;
    }, []);

    async function acceptRequest(id) {
        await fetch(`http://localhost:8081/transport-services/approve/?id=${id}`, {
            method: "POST",
        });

        const newRequests = requests.filter((el) => el.companyEmailAddress !== id);
        setRequests(newRequests);

        window.location.reload();
    }

    async function declineRequest(id) {
        await fetch(`http://localhost:8081/transport-services/decline/?id=${id}`, {
            method: "POST",
        });

        const newRequests = requests.filter((el) => el.companyEmailAddress !== id);
        setRequests(newRequests);

        window.location.reload();
    }

    function requestList() {
        return requests.map((request) => {
            return (
                <Record record={request}
                    acceptRequest={() => acceptRequest(request.companyEmailAddress)} declineRequest={() => declineRequest(request.companyEmailAddress)} key={request.id} />
            );
        });
    }

    const style = {
        padding: 16
    }

    return (
        <div style={style}>
            <h3>Requested List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Email</th>
                        <th>Company Hotline</th>
                        <th>Land Transport</th>
                        <th>Air Transport</th>
                        <th>Shipline Transport</th>
                        <th>Locations</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{requestList()}</tbody>
            </table>
        </div >
    );
}
