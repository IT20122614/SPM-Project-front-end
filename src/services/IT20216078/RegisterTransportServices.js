import React, { useState } from "react";

export default function RegisterTransportServices() {
    const [form, setForm] = useState({
        id: "",
        companyName: "",
        companyEmailAddress: "",
        companyHotline: "",
        landTransport: "",
        airTransport: "",
        waterTransport: "",
        locations: "",
        isApproved: ""
    });

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newTransportService = { ...form };

        await fetch("http://localhost:8080/api/transport-services/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransportService),
        }).catch((error) => {
            window.alert(error);
            return;
        });

        setForm({
            companyName: "",
            companyEmailAddress: "",
            companyHotline: "",
            landTransport: "",
            airTransport: "",
            waterTransport: "",
            locations: ""
        });
    }

    const style = {
        padding: 16
    }

    return (
        <div style={style}>
            <h3>Register Transport Service</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.companyName}
                        onChange={(e) => updateForm({ companyName: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Company Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="position"
                        value={form.companyEmailAddress}
                        onChange={(e) => updateForm({ companyEmailAddress: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Company Hotline</label>
                    <input
                        type="number"
                        className="form-control"
                        id="position"
                        value={form.companyHotline}
                        onChange={(e) => updateForm({ companyHotline: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Land Transport Services You are Going to Provide... (Please enter details as "5, 10, 10.00" which means each of 5 vehicles can provide services for 10 travellers and each of them carry 10KG)</label>
                    <input
                        type="tex"
                        className="form-control"
                        id="position"
                        value={form.landTransport}
                        onChange={(e) => updateForm({ landTransport: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Air Transport Services You are Going to Provide... (Please enter details as "5, 10, 10.00" which means each of 5 vehicles can provide services for 10 travellers and each of them carry 10KG)</label>
                    <input
                        type="tex"
                        className="form-control"
                        id="position"
                        value={form.airTransport}
                        onChange={(e) => updateForm({ airTransport: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Shipline Transport Services You are Going to Provide... (Please enter details as "5, 10, 10.00" which means each of 5 vehicles can provide services for 10 travellers and each of them carry 10KG)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.waterTransport}
                        onChange={(e) => updateForm({ waterTransport: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Countries available</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.locations}
                        onChange={(e) => updateForm({ locations: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
