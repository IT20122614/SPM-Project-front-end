import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import 'jspdf-autotable';

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
                Remove
            </button>
        </td>
    </tr>
);

export default function TransportServicesRegistered() {
    const [requests, setRequests] = useState([]);
    const [searchString, setSearchString] = useState({
        searchText: ""
    });

    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:8081/transport-services/registered`);

            const requests = await response.json();

            setRequests(requests);
        }

        getRecords();

        return;
    }, []);

    async function declineRequest(id) {
        await fetch(`http://localhost:8081/transport-services/decline/?id=${id}`, {
            method: "POST",
        });

        const newRequests = requests.filter((el) => el.companyEmailAddress !== id);
        setRequests(newRequests);
    }

    function requestList() {
        return requests.map((request) => {
            return (
                <Record record={request}
                    declineRequest={() => declineRequest(request.companyEmailAddress)} key={request.id} />
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

    function GeneratePDF() {
        const doc = new jsPDF();

        doc.autoTable({
            html: '#table_report',
            columns:
                [
                    { header: 'Company Name', dataKey: 'companyName' },
                    { header: 'Company Email', dataKey: 'companyEmailAddress' },
                    { header: 'Company Hotline', dataKey: 'companyHotline' },
                    { header: 'Land Transport', dataKey: 'landTransport' },
                    { header: 'Air Transport', dataKey: 'airTransport' },
                    { header: 'Shipline Transport', dataKey: 'waterTransport' },
                    { header: 'Locations', dataKey: 'locations' }
                ]
        });
        doc.save('Registered Transport Services.pdf');
    }

    return (
        <div style={style}>
            <h3>Registered List</h3>
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
            <table id="table_report" className="table table-striped" style={{ marginTop: 20 }}>
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
            <button type="button" className="btn btn-outline-success" onClick={() => GeneratePDF()}>Export as PDF</button>
        </div >
    );
}
