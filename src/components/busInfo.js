import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'

import '../App.css';

const getBrowserLang = navigator.language || navigator.userLanguage;

class BusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: {},
      region_country: {},
      city: [],
      departures_length: 0,
      departures: [],
      location: [],
      operator: [],
      per_page: 10,
      current_page: 1
    }
  }

  componentDidMount(){
    const interval = setInterval(() => {
      this.renderSearch(this.props.data)
    }, 20000);
    this.renderSearch(this.props.data)
    return () => clearInterval(interval);
  }

  renderPoll(getObj){
    //?index=10
    const url_poll = "https://napi.busbud.com/x-departures/"+getObj.origin+"/"+getObj.destination+"/"+getObj.date+"/poll?index="+this.state.departures_length;
    console.log('url_poll',url_poll);
    fetch(url_poll, {
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
      console.log('url_poll', data);
      console.log('url_poll getObj', getObj);
      this.setState({
        departures_length: data.departures.length,
        departures: data.departures
      });

    })
  }

  renderSearch(getObj){
    const url = "https://napi.busbud.com/x-departures/"+getObj.origin+"/"+getObj.destination+"/"+getObj.date+"/?adult=1&child=0&senior=0&lang="+getBrowserLang;
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
      // console.log('info',data, data.complete, data.departures.length);
      console.log('data.complete',data.complete);
      const updateStateData = (data) => {
        this.setState({
          feed: data,
          city: data.cities,
          departures_length: data.departures.length,
          departures: data.departures,
          location: data.locations,
          operator: data.operators
        })
      }

      if (data.complete) {
        updateStateData(data)
      } else {
        console.log('else data',data);
        updateStateData(data)
        this.renderPoll(this.props.data, data)
      }

    })

  }

  // <p>departure time, the arrival time, the location name</p>
  // <p>the price (use prices.total of the departure)</p>
  render() {

    const renderPage = (e) => {
      e.preventDefault();
      console.log('renderPage', e.target, e.target.value);
    }

    const pagination_number = this.state.departures

    let pagination_return = [];
    const pagination_list = () => {
      for (let i = 0; i < pagination_number.length/this.state.per_page; i++) {
        pagination_return.push(<Pagination.Item key={i} active={(i +1) === 1} onClick={renderPage}>{i+1} </Pagination.Item>)
      }
      return pagination_return
    };

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
      const num = price_amount/Math.pow(10, price_amount.toString().length-2)
      let num_display
      this.state.city.map((cityObj, n) => {
        if ( this.state.feed.origin_city_id === cityObj.id) {
          num_display = new Intl.NumberFormat(cityObj.region.country.default_locale, { style: 'currency', currency: cityObj.region.country.default_currency }).format(num);
        }
      })
      return num_display;
    }

    const display_departure_time = (get_timestamp) => {
      const date = new Date(get_timestamp)
      let format_time
      this.state.city.map((cityObj, n) => {
        if ( this.state.feed.origin_city_id === cityObj.id) {
          format_time = Intl.DateTimeFormat(cityObj.region.country.default_locale,{hour: "numeric", minute: "2-digit"}).format(date)
        }
      })
      return format_time;
    }

    const display_buses = this.state.departures.map((ele, idx) =>
    {
      console.log('repopulate display_buses');
      {/*Show the departure time, the arrival time, the location name and the price (use prices.total of the departure)
      console.log('ele, idx',ele, idx, this.state.feed.origin_city_id);*/}
        return (
          <Row className="justify-content-center departures p-2 mb-3 align-items-center" key={idx}>
            <Col xs={12} md={8}>
              <div className="d-flex flex-row mb-1 justify-content-start">
                <div className="departuretime mr-3">{display_departure_time(ele.departure_time)}</div>
                <div>
                   <span>{display_city(this.state.feed.origin_city_id)}</span> - <span>{display_location(ele.origin_location_id)}</span>
                 </div>
              </div>
              <div className="d-flex flex-row mb-1 justify-content-start align-items-center">
                <div className="departuretime mr-3">{display_departure_time(ele.arrival_time)}</div>
                <div>
                   <span>{display_city(this.state.feed.destination_city_id)}</span> - <span>{display_location(ele.destination_location_id)}</span>
                 </div>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <p className="h3">{display_price(ele.prices.total)}</p>
            </Col>
          </Row>
        )
    })
    return (
      <div>
        <Container>
          <div id="departures" className="m-4">{display_buses}</div>
          {/*<Pagination size="sm" className="justify-content-center">
            {pagination_list()}
          </Pagination>*/}
        </Container>
      </div>

    );
  }
}

export default BusInfo;
