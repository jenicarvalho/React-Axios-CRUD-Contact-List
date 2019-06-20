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

  render() {
    return (
      <div className="person-list">
        <h1>Contact List</h1>

        <ul>
          {this.state.persons.map(person => (
            <li className="person-item" key={person.id}>
              <h2>
                {person.name} <span>{person.phone}</span>
              </h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Person;
