import React from 'react';
import './Header.css';
import SelectAgency from './SelectAgency';
import {Image, Menu, Item } from "semantic-ui-react";
import logo from '../../static/logo.png';

const Header = ({}) => {
    return (
        <Menu fixed="top" >
            <Menu.Item className="marginLeft100">
                <Image className="margin-left120" as='a' src={logo} href="#home"></Image>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item><SelectAgency /></Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default Header;