import {createSelector} from 'reselect';
import moment from 'moment';  

const getAllAgencies = state => state.agencies
const getUser = state => state.user
const getToken = state => state && state.token
const getSelectedAgencyId = state => state && state.agencyId

export const getUserAgencies = createSelector(
  [getAllAgencies, getUser],
  (agencies, user) => {
        let result =  agencies.filter(a => user.agencies.map(a => a.toLowerCase()).indexOf(a.id.toLowerCase()) >=0);
        return user.isAdmin? agencies: result;
    }
)

export const isLogged = createSelector(
    [getToken],
    (token) => {
        if (token) {
            let expires = moment(parseInt(token.date_from)).add('seconds', parseInt(token.expires_in));
            //expires is bigger than now
            //console.log('moment(): ' + moment() + ' expires: ' + expires);
            return moment().isBefore(moment(expires));
        }
        return false;
    }
)

export const getSelectedOrDefault = createSelector(
    [getSelectedAgencyId],
    (id) => {
          return id ? id : getUserAgencies[0];
    }
)

export const cookieExists = createSelector(
    () => {
          return document.cookie.indexOf("NewTransitIQPortalCookie") > -1;
    }
)

