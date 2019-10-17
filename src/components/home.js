import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

import Data from '../json/bus_travel_schedules.json';
import CodeData from '../json/country_code.json';
import BusInfo from '../components/busInfo'

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      getCodes: [],
      getUsersIPFeed: [],
      getNAPIBusbudFeed: [],
      getFormValues: null,
      value: '',
      search_display: "block"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

/*
  componentDidMount(){
    const urlIPAPI = 'https://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency';
    fetch(urlIPAPI).then(function(response) {
      return response.json()
    }, function(error) {
      console.log('error', error.message );
    }).then(ipdata => {
      console.log('ipdata',ipdata);
      this.setState({ getUsersIPFeed: ipdata });
    });
  }
*/

  renderOptions (data){
    return data.codes.map((item, o) => (
      <option key={o} value={item.value}>{item.name}</option>
    ))
  }

  handleSubmit(event) {
    event.preventDefault();
    const thisSet = this.state
    // console.log('state',this.state);
    const data = new FormData(event.target);
    const form = event.currentTarget;
    let forms = document.getElementsByClassName('needs-validation');

    let getOrigin = data.get('bustkts.SelectOrigin'),
      getDestination = data.get('bustkts.SelectDestination')

    if (form.checkValidity() === true) {
      if (getOrigin === getDestination){
        // console.log('select different cities', event.target);
        event.target.reset()
      } else {
        // console.log('happy travels')
          this.setState({
            getFormValues: {
              origin: data.get('bustkts.SelectOrigin'),
              destination: data.get('bustkts.SelectDestination'),
              date: data.get('bustkts.SelectDate'),
              passenger: data.get('bustkts.SelectPassenger')
            },
            search_display: "none"
          });
      }
    }
  }

  render() {
    const form_values = this.state.getFormValues;
    const sd = this.state.search_display

    return (
      <div>
      <Container id="search_bus_form" style={{display: sd}} >
        <Form className="form-inline needs-validation" onSubmit={this.handleSubmit} noValidate>
          <Row className="mx-auto">
            <Form.Group controlId="bustkts.SelectOrigin" className="m-2">
              <Form.Label>Leaving from </Form.Label>
              <Form.Control as="select" name="bustkts.SelectOrigin" placeholder="Select" required>
                {this.renderOptions(CodeData)}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="bustkts.SelectDestination" className="m-2">
              <Form.Label>Going to </Form.Label>
              <Form.Control as="select" name="bustkts.SelectDestination" placeholder="Select" required>
                {this.renderOptions(CodeData)}
              </Form.Control>
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Control className="m-2" type="text" placeholder="2020-08-20" name="bustkts.SelectDate" value="2020-08-20" readOnly />
            </Form.Group>
            <Form.Group controlId="bustkts.SelectPassenger" className="m-2">
              <Form.Label>Passenger</Form.Label>
              <Form.Control as="select" name="bustkts.SelectPassenger">
                <option>1</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Row>
        </Form>

      </Container>
              {/*form_values ? <BusInfo data={this.state.getFormValues}/> : null*/}
              {/*this.state.getFormValues && <BusInfo data={this.state.getFormValues}/>*/}
              {form_values && <BusInfo data={form_values}/>}
      </div>

    );
  }
}

export default Home;
