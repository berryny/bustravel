import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
class BusInfo extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log('this.props.data',this.props.data);
    // const url = "https://napi.busbud.com/x-departures/"+this.state.obj.orgin+"/"+this.state.obj.destination+"/"+this.state.obj.date+"?adult=1&child=0&senior=0&lang="+getBrowserLang+"&currency="+this.state.feed.getUsersIPFeed.currency;
    const url_NY2CA = "https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02?adult=1&child=0&senior=0&lang=en&currency=USD";
    console.log('url',url_NY2CA);
    fetch(url_NY2CA, {
      method: "GET",
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
      }

    }).then(function(response) {
      return response.json()
    }, function(error) {
      console.log('error', error.message );
    }).then(function(data){
      console.log('data',data, data.departures);
      // const departures = data.departures;
      // const operators = data.operators;

      // return data.departures.map((item, o) => (
      //
      //   <Card style={{ width: '18rem' }}>
      //     <Card.Body>
      //       operators.map((op, i) =>
      //       if (item.operator_id === op.id) {
      //         return <Card.Title key={i}>{op.name}</Card.Title>
      //       }
      //
      //     )
      //       <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
      //       <Card.Text>
      //         Some quick example text to build on the card title and make up the bulk of
      //         the card's content.
      //       </Card.Text>
      //       <Card.Link href="#">Card Link</Card.Link>
      //       <Card.Link href="#">Another Link</Card.Link>
      //     </Card.Body>
      //   </Card>
      //
      // ))

    })

  }

  render() {
    return (
      <div><h1>hi</h1></div>

    );
  }
}

export default BusInfo;
