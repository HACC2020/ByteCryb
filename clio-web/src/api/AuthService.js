import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = 'http://localhost:8080'; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch('/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(res => {
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  async signUp(username, email, password) {
    // Get a token from api server using the fetch api
    return this.fetch('/auth/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then(res => { //what should be returned here?
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    sessionStorage.setItem('id_token', idToken)
    //localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    // return localStorage.getItem('id_token');
    return sessionStorage.getItem('id_token')

  }

  logout() {
    // Clear user token and profile data from localStorage
    sessionStorage.removeItem('id_token');
    // localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  async createCSV(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {};

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    // console.log(headers);
    // https://cors-anywhere.herokuapp.com/http://164.90.149.100:8080'+ url
    const response = await fetch(url, {
      headers,
      ...options,
    });
    // .then(this._checkStatus)
    console.log(response);

    let text = await response.blob();
    if (text.type === 'application/json') {
      return false;
    }
    // console.log(text);
    let objectURL = window.URL.createObjectURL(text);
    return objectURL;

  }

  async fetchPDF(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {};

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }
    headers['Content-Type'] = 'application/json';

    // console.log(headers);
    // https://cors-anywhere.herokuapp.com/http://164.90.149.100:8080'+ url
    const response = await fetch(url, {
      headers,
      ...options,
    });
    // .then(this._checkStatus)
    console.log(response);

    let text = await response.blob();
    if (text.type === 'application/json') {
      return false;
    }
    var objectURL = window.URL.createObjectURL(text);
    return objectURL;

  }

  async fetchXML(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {};

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    // console.log(headers);
    // https://cors-anywhere.herokuapp.com/http://164.90.149.100:8080'+ url
    const response = await fetch(url, {
      headers,
      ...options,
    });
    // .then(this._checkStatus)
    console.log(response);

    let text = await response.blob();
    if (text.type === 'application/json') {
      return false;
    }

    var xmlText = await text.text();

    return xmlText;
  }

  async fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {};

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    // console.log(headers);
    // https://cors-anywhere.herokuapp.com/http://164.90.149.100:8080'+ url
    const response = await fetch(url, {
      headers,
      ...options,
    });
    // .then(this._checkStatus)
    console.log(response);
    let text = await response.text();
    try {
      const json = JSON.parse(text);
      // console.log(json);
      return json;
    } catch (err) {
      // console.log(text);
      return text;
    }
  }

  async putPDF(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {};

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }
    headers['Content-Type'] = 'application/json';

    // console.log(headers);
    // https://cors-anywhere.herokuapp.com/http://164.90.149.100:8080'+ url
    const response = await fetch(url, {
      headers,
      ...options,
    });
    // .then(this._checkStatus)
    console.log(response);
    let text = await response.text();
    return text;
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      return response.statusText;
      // var error = new Error(response.statusText);
      // error.response = response;
      // throw error;
    }
  }
}