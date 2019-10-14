import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

import DatePicker from "react-datepicker";

import moment from 'moment'
import 'moment/min/locales.min'

import "react-datepicker/dist/react-datepicker.css";

import Data from './json/bus_travel_schedules.json';

class Search extends Component {
  state = {
    startDate: new Date()
  };
  handleChange = date => {
    this.setState({
      startDate: date
    });
    console.log(date);
  };

  constructor(props) {
    // invoke or call parent class constructor
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log("event.target", event.target);
    console.log('data',data);

    data.set('origin', data.get('bustkts.SelectOrigin'));
    data.set('destination', data.get('bustkts.SelectDestination'));
    data.set('outbound_date', data.get('state.startDate'));
    data.set('passenger', data.get('bustkts.SelectPassenger'));
    console.log('data',data.get('bustkts.SelectOrigin'), data.get('bustkts.SelectDestination'), data.get('state.startDate'), data.get('bustkts.SelectPassenger'));
    console.log('date', data.date);
  }
/*
  componentWillMount(){
    fetch('https://napi.busbud.com', {
      credentials: 'include'
    });
  }
*/
  render() {
    const { startDate } = this.state;
    return (
        <Container>
          <Form className="form-inline" onSubmit={this.handleSubmit}>
            <Form.Group controlId="bustkts.SelectOrigin">
              <Form.Label>Departures</Form.Label>
              <Form.Control as="select" name="bustkts.SelectOrigin">
                <option>New York</option>
                <option>Montreal</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="bustkts.SelectDestination">
              <Form.Label>Destination</Form.Label>
              <Form.Control as="select" name="bustkts.SelectDestination">
                <option>New York</option>
                <option>Montreal</option>
              </Form.Control>
            </Form.Group>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              minDate={new Date()}
              id="bustkts.SelectDate"
              locale="fr-ch"
            />
            <Form.Group controlId="bustkts.SelectPassenger">
              <Form.Label>Passenger</Form.Label>
              <Form.Control as="select" name="bustkts.SelectPassenger">
                <option>1</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Container>
    );
  }
}

export default Search;
