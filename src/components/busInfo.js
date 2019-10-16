import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../App.css';

const getBrowserLang = navigator.language || navigator.userLanguage;

class BusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: {},
      city: [],
      departures: [],
      location: [],
      operator: []
    }
  }


  componentDidMount(){
    // console.log('this.props.data',this.props.data);
    const getObj = this.props.data
    const url = "https://napi.busbud.com/x-departures/"+getObj.origin+"/"+getObj.destination+"/"+getObj.date+"?adult=1&child=0&senior=0&lang="+getBrowserLang+"&currency=USD";
    // const url = "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02?adult=1&child=0&senior=0&lang=en&currency=USD";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
      }

    }).then(function(response) {
      return response.json()
    }, function(error) {
      console.log('error', error.message );
    }).then(data => {
      console.log('info',data);
      this.setState({
        feed: data,
        city: data.cities,
        departures: data.departures,
        location: data.locations,
        operator: data.operators
      });

    })

  }

  // <p>departure time, the arrival time, the location name</p>
  // <p>the price (use prices.total of the departure)</p>
  render() {

    const display_city = (cities_id) =>
      this.state.city.map((cityObj, n) => {
        if ( cities_id === cityObj.id) {
          return cityObj.name;
        }
    })

    const display_location = (location_id) =>
      this.state.location.map((local, l) => {
        if (location_id === local.id) {
          return local.address[0];
        }
    })

    const display_price = (price_amount) => {
      return price_amount/Math.pow(10, price_amount.toString().length-2);
    }

    const display_buses = this.state.departures.map((ele, idx) =>
    {
      {/*Show the departure time, the arrival time, the location name and the price (use prices.total of the departure)*/}
      console.log('ele, idx',ele, idx, this.state.feed.origin_city_id);
        return (
          <Row className="justify-content-md-center departures p-2 mb-3" key={idx}>
            <Col xs={12} md={8}>
              <div className="d-flex flex-row mb-3 justify-content-start">
                <div className="departuretime mr-3">{ele.departure_time}</div>
                <div>
                   <span>{display_city(this.state.feed.origin_city_id)}</span> - <span>{display_location(ele.origin_location_id)}</span>
                 </div>
              </div>
              <div className="d-flex flex-row mb-3 justify-content-start">
                <div className="departuretime mr-3">{ele.arrival_time}</div>
                <div>
                   <span>{display_city(this.state.feed.destination_city_id)}</span> - <span>{display_location(ele.destination_location_id)}</span>
                 </div>
              </div>
            </Col>
            <Col xs={6} md={4}><p>{display_price(ele.prices.total)}</p></Col>
          </Row>
        )
    }
  )
    return (
      <div>
        <Container><div id="departures" className="m-4">{display_buses}</div></Container>
      </div>

    );
  }
}

export default BusInfo;