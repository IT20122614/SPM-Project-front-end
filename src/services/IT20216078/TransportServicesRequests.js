import { useEffect, useState } from "react";

const Record = (props) => (
    <tr>
        <td>
            {props.record.companyName}
        </td>
        <td>
            {props.record.companyEmail}
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
                    props.declineRequest(props.record.id);
                }}
            >
                Decline
            </button>
            &nbsp;&nbsp;
            <button
                className="btn btn-success"
                onClick={() => {
                    props.acceptRequest(props.record.id);
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
            const response = await fetch(`http://localhost:8080/api/transport-services/requested`);

            const requests = await response.json();

            setRequests(requests);
        }

        getRecords();

        return;
    }, [requests.length]);

    async function acceptRequest(id) {
        await fetch(`http://localhost:8080/api/transport-services/approve/?id=${id}`, {
            method: "PUT",
        });

        const newRequests = requests.filter((el) => el.id !== id);
        setRequests(newRequests);
    }

    async function declineRequest(id) {
        await fetch(`http://localhost:8080/api/transport-services/decline/?id=${id}`, {
            method: "PUT",
        });

        const newRequests = requests.filter((el) => el.id !== id);
        setRequests(newRequests);
    }

    function requestList() {
        return requests.map((request) => {
            return (
                <Record record={request}
                    acceptRequest={() => acceptRequest(request.id)} declineRequest={() => declineRequest(request.id)} key={request.id} />
            );
        });
    }

    const style = {
        padding: 16
    }

    return (
        <div style={style}>
            <h3>Request List</h3>
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
        </div>
    );
}
