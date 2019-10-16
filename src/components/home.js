import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap/FormCheck';
import Button from 'react-bootstrap/Button';

import Data from '../json/bus_travel_schedules.json';
import CodeData from '../json/country_code.json';
import BusInfo from '../components/busInfo'

const getBrowserLang = navigator.language || navigator.userLanguage;

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      getCodes: [],
      getUsersIPFeed: [],
      getNAPIBusbudFeed: [],
      getFormValues: null,
      value: ''
    }
    //this.renderSchedule = this.renderSchedule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const urlIP = 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency';
    const response = await fetch(urlIP);
    const ipdata = await response.json();
    this.setState({ getUsersIPFeed: ipdata });
  }

  renderOptions (data){
    return data.codes.map((item, o) => (
      <option key={o} value={item.value}>{item.name}</option>
    ))
  }

  handleSubmit(event) {
    event.preventDefault();
    const thisSet = this.state
    console.log('state',this.state);
    const data = new FormData(event.target);
    const form = event.currentTarget;
    let forms = document.getElementsByClassName('needs-validation');

    // this.state = {
    //   orgin: data.get('bustkts.SelectOrigin'),
    //   destination: data.get('bustkts.SelectDestination'),
    //   date: data.get('bustkts.SelectDate'),
    //   passenger: data.get('bustkts.SelectPassenger')
    // }
    // console.log('getFormValues',this.state.getFormValues);
    // this.another()
    let getOrigin = data.get('bustkts.SelectOrigin'),
      getDestination = data.get('bustkts.SelectDestination')

    if (form.checkValidity() === true) {
      if (getOrigin === getDestination){
        console.log('make a selection', event.target);
        event.target.reset()
      } else {
        console.log('happy')

          this.setState({
            getFormValues: {
              origin: data.get('bustkts.SelectOrigin'),
              destination: data.get('bustkts.SelectDestination'),
              date: data.get('bustkts.SelectDate'),
              passenger: data.get('bustkts.SelectPassenger')
            }
          });

      }
    }
  }

  getSchedule(){
    console.log('obj',this.state);
    // this.state = {obj, feed}
    // const url = "https://napi.busbud.com/x-departures/"+this.state.obj.orgin+"/"+this.state.obj.destination+"/"+this.state.obj.date+"?adult=1&child=0&senior=0&lang="+getBrowserLang+"&currency="+this.state.feed.getUsersIPFeed.currency;
    // console.log('url',url);
    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    //     'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
    //   }
    //
    // }).then(function(response) {
    //   return response.json()
    // }, function(error) {
    //   console.log('error', error.message );
    // }).then(function(data){
    //   console.log('data',data, data.departures);
    //   const departures = data.departures;
    //   const operators = data.operators;
    //
    //   // return data.departures.map((item, o) => (
    //   //
    //   //   <Card style={{ width: '18rem' }}>
    //   //     <Card.Body>
    //   //       operators.map((op, i) =>
    //   //       if (item.operator_id === op.id) {
    //   //         return <Card.Title key={i}>{op.name}</Card.Title>
    //   //       }
    //   //
    //   //     )
    //   //       <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    //   //       <Card.Text>
    //   //         Some quick example text to build on the card title and make up the bulk of
    //   //         the card's content.
    //   //       </Card.Text>
    //   //       <Card.Link href="#">Card Link</Card.Link>
    //   //       <Card.Link href="#">Another Link</Card.Link>
    //   //     </Card.Body>
    //   //   </Card>
    //   //
    //   // ))
    //
    // })
  }

  render() {
    return (
      <div>
      <Container>
        <Form className="form-inline needs-validation" onSubmit={this.handleSubmit} novalidate>
          <Form.Group controlId="bustkts.SelectOrigin" className="mr-2">
            <Form.Label>Departures</Form.Label>
            <Form.Control as="select" name="bustkts.SelectOrigin" placeholder="Select" required>
              {this.renderOptions(CodeData)}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="bustkts.SelectDestination" className="mr-2">
            <Form.Label>Destination</Form.Label>
            <Form.Control as="select" name="bustkts.SelectDestination" placeholder="Select" required>
              {this.renderOptions(CodeData)}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mr-2">
            <Form.Control type="text" placeholder="2020-08-20" name="bustkts.SelectDate" value="2020-08-20" readOnly />
          </Form.Group>
          <Form.Group controlId="bustkts.SelectPassenger" className="mr-2">
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
              {this.state.getFormValues && <BusInfo data={this.state.getFormValues}/>}
      </div>

    );
  }
}

export default Home;
