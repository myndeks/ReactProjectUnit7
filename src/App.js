import React, { Component } from 'react';
import { 
  BrowserRouter, 
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Import axios for fetching data
import axios from 'axios';


// Import Components
import './css/index.css';
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import NotFound from './components/NotFound';

// Import API KEY from config.cfg
import config from './config/config';
const apiKey = config;



class App extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      lithuania: [],
      netherlands: [],
      england: [],
      loading: true,
      name: ''
    };
  }

  componentDidMount () {
    this.getslithuaniaData();
    this.getsenglandData();
    this.getsnetherlandsnData();
  }

  getslithuaniaData = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=lithuania&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
      lithuania: response.data.photos.photo,
      loading: false
    });
    }) 
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  }

  getsnetherlandsnData = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=netherlands&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
      netherlands: response.data.photos.photo,
      loading: false
    });
    }) 
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  }

  getsenglandData = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=england&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
      england: response.data.photos.photo,
      loading: false
      });
    }) 
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  }

  performSearch = (query) => {
    this.setState({loading: true});
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
      data: response.data.photos.photo,
      loading: false,
      name: query
    });
    }) 
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  }



render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Search onSearch={this.performSearch}  />
          <Nav />
          {
            (this.state.loading)
            ? <p>Loading...</p>
          : <Switch>
              <Route exact path='/' render={() => <Redirect to="/lithuania" />} />
              <Route path='/lithuania' render={ () => <PhotoList name='Lithuania'loading={this.state.loading} data={this.state.lithuania} /> }/>
              <Route path='/netherlands' render={ () => <PhotoList name='Netherlands' loading={this.state.loading} data={this.state.netherlands} /> }/>
              <Route path='/england' render={ () => <PhotoList name='England' loading={this.state.loading} data={this.state.england} /> }/>
              <Route path='/search/:query' render={ () => <PhotoList name={this.state.name}  loading={this.state.loading}  data={this.state.data} /> }/>
              <Route component={NotFound} />
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

