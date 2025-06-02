import React, { useEffect, useState } from "react";

const CONTACTS_API =
  "https://prod-167.westeurope.logic.azure.com:443/workflows/0eef461979cc4b4ab40c5c1e4943e9b8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VTd318jljDIvdC9ntienXAr9DG8Sq5rhwexpU03sXTM";

function ContactsGrid() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if the component is unmounted

    fetch(CONTACTS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({}) // Add any required payload here
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            console.error("API Error:", error);
            throw new Error(`HTTP error! status: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Log API response for debugging
        if (isMounted) {
          // Check if data is an array or has a value property
          const contactsArray = Array.isArray(data) ? data : data.value || [];
          console.log("Contacts Array:", contactsArray); // Log the extracted contacts array

          const sorted = contactsArray.sort(
            (a, b) => new Date(b.createdon).getTime() - new Date(a.createdon).getTime()
          );
          console.log("Sorted Contacts:", sorted); // Log sorted contacts
          setContacts(sorted);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Cleanup to prevent double execution
    };
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: 40, fontSize: 20 }}>Loading data, please wait...</div>;

  if (error) return <div style={{ textAlign: "center", marginTop: 40, fontSize: 20, color: "red" }}>Error: {error}</div>;

  return (
    <div>
      {contacts.length === 0 ? (
        <div>No contacts available</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.contactid || `${contact.firstname || "Unknown"}-${contact.lastname || "Unknown"}-${index}`}>
                <td>{contact.firstname || "Unknown"}</td>
                <td>{contact.lastname || "Unknown"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactsGrid;