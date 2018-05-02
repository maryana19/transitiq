import axios from 'axios';
import {API_HOST} from '../config'
//const API_HOST00 = 'http://localhost:32665';
//const API_HOST = process.env.REACT_APP_API_HOST;
//console.log(API_HOST);
class Api {
    static requestHeaders() {
      const token = localStorage.getItem('TOKEN');
      return {'AUTHORIZATION': `Bearer ${token}`}
    }
  
    static login(name, password) {
      const form = new FormData();
      //form.append('grant_type', 'password');
      //form.append('username', 'user@example.com');
      //form.append('password', '62882');
      
      const data = {
        'grant_type': 'password',
        'username': 'user@example.com',
        'password': '62882',
        'password10': 'TiQ04121961'
      }
      const params = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');

      const request = new Request(API_HOST+ '/connect/token/', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }), 
        body:params
      });

      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static getGtfsFiles(agencyId) {
      const headers = this.requestHeaders();
      const token = localStorage.getItem('TOKEN');

      //const request = new Request(`${process.env.API_HOST}/api/v1/cats`, {
      const request = new Request(API_HOST+ '/Gtfs/all/'+ agencyId, {
        method: 'GET',
        headers: this.requestHeaders()
      });
  
      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static postGtfs(agencyId, file) {
      const form = new FormData();
      form.append('file', file.file);

      /*for (var index = 0; index < files.files.length; index++) {
        var element = files.files[index];
        form.append('file', element);
      }*/

      //form.append('file', file);
      const request = new Request(API_HOST+ `/Gtfs/save/` + agencyId, {
        method: 'POST',
        headers: new Headers({
          //'Content-Type': 'multipart/form-data'
          //'Content-Type': "application/x-www-form-urlencoded"
        }), 
        body: form
      });
      //return  post(url, formData,config)

     

      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        throw error;
      });
    }

    static postGtfs2(files) {
      const form = new FormData();

      for (var index = 0; index < files.files.length; index++) {
        var element = files.files[index];
        form.append('file', element);
      }

      axios.post(API_HOST+ '/Gtfs/save', form)
            .then((result) => {
              return result.json();
            })
            .catch((ex) => {
                console.error(ex);
            });
    }

    static deleteGtfs(agencyId, gtfsId) {
      //const form = new FormData();
      //form.append('file', file.file);

      const request = new Request(API_HOST+ '/Gtfs/delete/' + agencyId + '/' + gtfsId, {
        method: 'POST',
        /*headers: new Headers({
         
        }), */
      });

      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static publishGtfs(agencyId, gtfsId) {
      
      const request = new Request(API_HOST+ '/Gtfs/publish/' + agencyId + '/' + gtfsId, {
        method: 'POST',
      });

      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    static validateGtfs(gtfsId) {
      
      const request = new Request(API_HOST+ '/Gtfs/validate/' + gtfsId, {
        method: 'POST',
      });

      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        throw error;
      });
    }

    static unpublishGtfs( gtfsId) {
      const request = new Request(API_HOST+ '/Gtfs/unpublish/' + gtfsId, {
        method: 'POST',
      });

      return fetch(request).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

  }
  
  export default Api;