import axios from 'axios';
//import {API_HOST} from '../config'

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

class Api {
    /*static requestHeaders() {
      const token = JSON.parse(localStorage.getItem('TOKEN'));
      debugger;
      return {'AUTHORIZATION': `Bearer ${token.access_token}`}
    }*/

    static setHeaders() {
        const token = JSON.parse(localStorage.getItem('TOKEN'));
        axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${token.access_token}`;
    }

    static login(name, password) {
        
      const data = {
        'grant_type': 'password',
        'username': name,
        'password': password,
      }
      const params = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');

      //this.setHeaders();

        return axios.post('/connect/token/', params, 
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                withCredentials: true
        })
        .then(function(response) {
            return response.data
        })
        .catch(error => {
            console.log('api deleteGtfs error:', error);
            throw(error);
        });
    }

    static getGtfsFiles(agencyId) {
      this.setHeaders();
      return axios.get('/Gtfs/all/' + agencyId)
        .then(function(response) {
            return response
        })
        .catch(error => {
            console.log('api getGtfsFiles error:', error);
            throw(error);
        });
    }

    static postGtfs(agencyId, file) {
        this.setHeaders();
        const form = new FormData();
        form.append('file', file.file);

        return axios.post('/Gtfs/save/' + agencyId, form, 
            {
                headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function(response) {
            return response
        })
        .catch(error => {
            console.log('api deleteGtfs error:', error);
            throw(error);
        });
    }

    static deleteGtfs(agencyId, gtfsId) {
      this.setHeaders();
      return axios.post('/Gtfs/delete/' + agencyId + '/' + gtfsId)
        .then(function(response) {
            return response
        })
        .catch(error => {
            console.log('api deleteGtfs error:', error);
            throw(error);
        });
    }

    static publishGtfs(agencyId, gtfsId) {
      this.setHeaders();
      return axios.post('/Gtfs/publish/' + agencyId + '/' + gtfsId)
        .then(function(response) {
            return response
        })
        .catch(error => {
            console.log('api publishGtfs error:', error);
            throw(error);
        });
    }

    static validateGtfs(gtfsId) {
        this.setHeaders();
        return axios.post('/Gtfs/validate/' + gtfsId)
          .then(function(response) {
              return response
          })
          .catch(error => {
              console.log('api validateGtfs error:', error);
              throw(error);
          });
    }

    static unpublishGtfs( gtfsId) {
        this.setHeaders();
        
        return axios.post('/Gtfs/unpublish/' + gtfsId)
          .then(function(response) {
              return response
          })
          .catch(error => {
              console.log('api unpublishGtfs error:', error);
              throw(error);
          });
    }
  }
  
  export default Api;