import React, { Component } from "react";
import axios from "axios";

class Person extends Component {
  state = {
    persons: [],
    showFullContent: false
  };

  toggleContent = () => {
    this.setState({
      showFullContent: !this.state.showFullContent
    });
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  deleteContact(index) {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${index}`)
      .then(res => {
        console.log(res.data);

        this.setState(state => {
          const persons = state.persons.filter((item, j) => index !== j);
          return {
            persons
          };
        });
      });
  }

  insertContact() {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: "Jeniffer Carvalho",
        username: "jenicarvalho",
        phone: "55 19 9999-0000",
        email: "jenicarvalho@test.com",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874"
        },
        company: {
          name: "Pixels"
        }
      })
      .then(res => {
        this.setState(state => {
          const persons = state.persons.concat(res.data);
          return {
            persons
          };
        });
      });
  }

  render() {
    return (
      <div className="person-list">
        <h1>Contact List ☎️</h1>

        <button className="button" onClick={() => this.insertContact()}>
          Add One
        </button>

        <button className="button" onClick={this.toggleContent}>
          Toggle Content
        </button>

        <ul>
          {this.state.persons.map((person, index) => (
            <li className="person-item" key={person.id}>
              <h2>
                {person.name}
                <span>{person.phone}</span>
                <button
                  className="delete"
                  title="Delete"
                  onClick={() => this.deleteContact(index)}
                >
                  &#10008;
                </button>
              </h2>

              <table
                className="person-full-content"
                style={{
                  display: this.state.showFullContent ? "block" : "none"
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      Username <span>{person.username}</span>
                    </td>
                    <td>
                      Email <span>{person.email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Address
                      <span>
                        {person.address.street} {person.address.suite}{" "}
                        {person.address.city}
                      </span>
                    </td>
                    <td>
                      Website
                      <span>{person.company.name}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Person;
