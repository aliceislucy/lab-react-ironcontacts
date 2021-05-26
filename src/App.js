import React, { Component } from 'react'
import contactsJSON from "./contacts.json"

export default class App extends Component {

  state = {
    contacts: contactsJSON.splice(0, 5),
  }

  handleAddRandom = () => {
    let copyContacts = [...this.state.contacts];
    let randomContact = contactsJSON[Math.floor(Math.random() * contactsJSON.length)];
    while (copyContacts.includes(randomContact)) {
      randomContact = contactsJSON[Math.floor(Math.random() * contactsJSON.length)];
    }
    copyContacts.push(randomContact);

    this.setState({
      contacts: copyContacts,
    })
  }

  handleSortName = () => {
    const copyContacts = [...this.state.contacts];
    let sortedContacts = copyContacts.sort((a, b) => a.name.localeCompare(b.name));

    this.setState({
      contacts: sortedContacts
    })
}

  handleSortPopularity = () => {
    const copyContacts = [...this.state.contacts];
    let sortedContacts = copyContacts.sort((a, b) => a.popularity - b.popularity);

    this.setState({
      contacts: sortedContacts
    })
  }

  handleDelete = (name) => {
    const afterDelete = this.state.contacts.filter((contact) => contact.name !== name);
    this.setState({
      contacts: afterDelete,
    });
  };


  render() {

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th><h1>IronContact</h1></th>
            </tr>
            <tr>
              <th><button onClick={() => this.handleAddRandom()}>Add Random Contact</button></th>
              <th><button onClick={() => this.handleSortName()}>Sort by name</button></th>
              <th><button onClick={() => this.handleSortPopularity()}>Sort by popularity</button></th>
            </tr>
            <tr>
              <th><h2>Picture</h2></th>
              <th><h2>Name</h2></th>
              <th><h2>Popularity</h2></th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact) => {
              return <tr>
                <td><img src={contact.pictureUrl} alt={contact.name}></img></td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td> <button onClick={() => this.handleDelete(contact.name)}>Delete</button> </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}