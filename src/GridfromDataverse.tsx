import React, { useEffect, useState } from "react";

const CONTACTS_API =
  "https://orgaf98a21c.api.crm4.dynamics.com/api/data/v9.2/contacts?$select=firstname,lastname,createdon";
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSIsImtpZCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSJ9.eyJhdWQiOiJodHRwczovL29yZ2FmOThhMjFjLmFwaS5jcm00LmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Q0YzIwMDJjLTU3NTItNDNlNy04NTRkLWZlMDBjYTBhMTgxYy8iLCJpYXQiOjE3NDg4NjkwOTMsIm5iZiI6MTc0ODg2OTA5MywiZXhwIjoxNzQ4ODcyOTkzLCJhaW8iOiJrMlJnWUxqSytUQ2plczBpdFNzU1A3NU0rMmxpQVFBPSIsImFwcGlkIjoiMWI4YzMyOTUtMmQwZC00MzBkLTg1NmQtNjg1YTE5ZWJmZjJiIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDRjMjAwMmMtNTc1Mi00M2U3LTg1NGQtZmUwMGNhMGExODFjLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiYmFmMjdhZDAtNzhkZi00ZDEzLWFhNjItYzc4OGVkY2IyODhmIiwicmgiOiIxLkFTOEFMQURDMUZKWDUwT0ZUZjRBeWdvWUhBY0FBQUFBQUFBQXdBQUFBQUFBQUFDd0FBQXZBQS4iLCJzdWIiOiJiYWYyN2FkMC03OGRmLTRkMTMtYWE2Mi1jNzg4ZWRjYjI4OGYiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiJkNGMyMDAyYy01NzUyLTQzZTctODU0ZC1mZTAwY2EwYTE4MWMiLCJ1dGkiOiJqV1lreWgtaGRVU1VUelFVMHA4dEFBIiwidmVyIjoiMS4wIiwieG1zX2Z0ZCI6ImYtUmZObXphR3FaSlBiNDlsZ08xOWxoMFMwWmY1ell2RG9HLWRRZVlCRGdCWm5KaGJtTmxZeTFrYzIxeiIsInhtc19pZHJlbCI6IjEwIDciLCJ4bXNfcmQiOiIwLjQyTGxZQkppMUJjUzRXQVhFdGpJVVZscl9tYUx5OXdqcG45ZkxlSXFBSXB5Q2dud0wxOVFWUFd2MVdPNTFvT0gxcWtheTRHaUhFSUM3QXdRY0FCS0F3QSJ9.Jb_5UrqwdEy1ygcyCGFzpqjg7LGSFlrUg1xBFrcXZjMgIEw9jXgBO_xGTW66hCU1lOw1vDv6U1JkgSK6t8A_2YzO04ReVH9EVY03reoHzJog7ebs2eJpzbBzE3zBx9mb0gNbOzpfDNeAwnKy9ZHN3gWNI1Mms5j_Pprm3AoNuTt-k1PU_RNbopgZSc-Qf5As8u_1a5trD6S0y5WjR08O7_W5gKTlwgaKhriqsEIokk7Fxbr5Gz_Z143Uzit2KQG9ERl-OzIxL56fpxX030j-YXVDz1B8-WeCJAYOTc7sCA9IOFIFHutJSQNsYl-4eD8e3WYVBvfpOrOJSgHodCwTxA"; // Replace with your actual token

function ContactsGrid() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(CONTACTS_API, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Sort by createdon descending (newest first)
        const sorted = (data.value || []).sort(
          (a, b) => new Date(b.createdon).getTime() - new Date(a.createdon).getTime()
        );
        setContacts(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: 40, fontSize: 20 }}>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.contactid || contact.firstname + contact.lastname}>
            <td>{contact.firstname}</td>
            <td>{contact.lastname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ContactsGrid;