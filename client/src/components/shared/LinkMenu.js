import React from 'react';
import {Image, Menu, Item } from "semantic-ui-react";
import {Link} from 'react-router-dom';

const OLD_PORTAL_URL = process.env.REACT_APP_OLD_PORTAL_URL;

const LinkMenu = ({}) => {
    return (
       
        <div className='padding10'>
            <a className='margin-right30' href= {OLD_PORTAL_URL + '/External/Schedule'}>Schedule</a>
            <a className='margin-right30' href= {OLD_PORTAL_URL + '/External/TripPlanner'}>Trip Planner</a>
            <a className='margin-right30' href= {OLD_PORTAL_URL + '/External/Dispatcher'}>Dispatcher</a>
            <a className='margin-right30' href= {OLD_PORTAL_URL + '/Internal/Dashboard'}>BI Dashboard</a>
            <a className='margin-right30' href= {OLD_PORTAL_URL + '/BusHistory'}>Bus Position History</a>
            <a className='margin-right30' href= {OLD_PORTAL_URL + '/Internal/AvgSpeed'}>Avg Speed Map</a>
            <a href= {OLD_PORTAL_URL + '/Internal/Devices'}>Devices</a>
        </div>
    );
}

export default LinkMenu;