import React, { Component } from 'react';
import PedalShowTile from '../components/PedalShowTile';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

class PedalShowContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      pedal:[]
    };
  }

  componentDidMount() {
    let pedalId = this.props.params.id;
    fetch(`/api/v1/pedals/${pedalId}`,{
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ pedal: body.pedal });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render () {

    return (
      <div>
        <PedalShowTile
          key={this.state.pedal.id}
          id={this.state.pedal.id}
          pedalName={this.state.pedal.name}
          pedalType={this.state.pedal.effect_type}
          pedalImage={this.state.pedal.image_url}
          pedalDescription={this.state.pedal.description}
        />
      </div>
    );
  }
}

export default PedalShowContainer;