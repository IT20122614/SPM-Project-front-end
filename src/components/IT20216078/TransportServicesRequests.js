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
    const [searchString, setSearchString] = useState({
        searchText: ""
    });

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
            method: "PUT",
        });

        const newRequests = requests.filter((el) => el.companyEmailAddress !== id);
        setRequests(newRequests);
    }

    async function declineRequest(id) {
        await fetch(`http://localhost:8081/transport-services/decline/?id=${id}`, {
            method: "PUT",
        });

        const newRequests = requests.filter((el) => el.companyEmailAddress !== id);
        setRequests(newRequests);
    }

    function requestList() {
        return requests.map((request) => {
            return (
                <Record record={request}
                    acceptRequest={() => acceptRequest(request.companyEmailAddress)} declineRequest={() => declineRequest(request.companyEmailAddress)} key={request.id} />
            );
        });
    }

    function updateForm(value) {
        return setSearchString((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost:8081/transport-services/search/?searchString=${searchString.searchText}`);

        const requests = await response.json();

        if (requests.length === 0) {
            window.alert("No records found for the searched text");
        } else {
            setRequests(requests);
        }

        setSearchString({
            searchText: ""
        });
    }

    const style = {
        padding: 16
    }

    return (
        <div style={style}>
            <h3>Requested List</h3>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <form className="d-flex" role="search" onSubmit={onSubmit}>
                        <input className="form-control me-2"
                            type="search" placeholder="Search"
                            value={searchString.searchText}
                            onChange={(e) => updateForm({ searchText: e.target.value })}
                            aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
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
