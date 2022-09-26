import React, { useEffect, useState } from "react";

export default function RegisterTransportServices() {
    const loggedEmailAddress = sessionStorage.getItem("email");

    const [form, setForm] = useState({
        id: null,
        companyName: "",
        companyEmailAddress: loggedEmailAddress,
        companyHotline: "",
        landTransport: "",
        airTransport: "",
        waterTransport: "",
        locations: "",
        approved: ""
    });


    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:8081/transport-services/search/registered/?searchString=${loggedEmailAddress}`);

            if (response.status === 302) {
                const request = await response.json();
                setForm(request);
            }

        }

        getRecords();

        return;
    }, []);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newTransportService = { ...form };

        const response = await fetch("http://localhost:8081/transport-services/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransportService),
        }).catch((error) => {
            window.alert(error);
            return;
        });

        console.log(response);
        if (response.status === 400) {
            window.alert("We have received your request before. Please stay tuned. Until that you can't edit submitted information");
        } else {
            window.alert("Your request has sent successfully");
        }
    }

    const style = {
        padding: 16
    }

    function heading() {
        if (!form.approved) {
            return (
                <h3>
                    Register Transport Service
                </h3>
            );
        } else if (form.approved) {
            return (
                <h3>
                    Your registered services
                </h3>
            );
        }
    }

    function submitButton() {
        if (!form.approved) {
            return (
                <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                />
            );
        } else if (form.approved) {
            return (
                <input
                    type="submit"
                    value="Update"
                    className="btn btn-warning"
                />
            );
        }
    }

    return (
        <div style={style}>
            <br />
            {heading()}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Company Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="companyName"
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
                        id="companyEmailAddress"
                        disabled
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
                        id="companyHotline"
                        value={form.companyHotline}
                        onChange={(e) => updateForm({ companyHotline: e.target.value })}
                    />
                </div>
                <br />
                <div>Please enter tranport services you are expected to provide as "5, 10, 10.00" which means
                    in each same type of 5 vehicles can tranport for 10 travellers and each traveller can carry
                    10KG. Put a space in-between when enter multiple vehicles details.</div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Land Transport Services You are Going to Provide</label>
                    <input
                        type="tex"
                        className="form-control"
                        id="landTransport"
                        value={form.landTransport}
                        onChange={(e) => updateForm({ landTransport: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Air Transport Services You are Going to Provide</label>
                    <input
                        type="tex"
                        className="form-control"
                        id="airTransport"
                        value={form.airTransport}
                        onChange={(e) => updateForm({ airTransport: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="position">Shipline Transport Services You are Going to Provide</label>
                    <input
                        type="text"
                        className="form-control"
                        id="waterTransport"
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
                        id="locations"
                        value={form.locations}
                        onChange={(e) => updateForm({ locations: e.target.value })}
                    />
                </div>
                <br />
                <div className="form-group">
                    {submitButton()}
                </div>
            </form>
        </div>
    );
}
