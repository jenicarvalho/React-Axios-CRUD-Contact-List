import React, { Component } from "react";
import axios from "axios";

class Person extends Component {
  state = {
    persons: []
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
        phone: "55 19 9999-0000"
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
        <h1>Contact List</h1>

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
                  X
                </button>
              </h2>
            </li>
          ))}
        </ul>

        <button className="add" onClick={() => this.insertContact()}>
          Add One
        </button>
      </div>
    );
  }
}

export default Person;
