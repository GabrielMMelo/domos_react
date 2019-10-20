import React, { Component } from 'react';

import Nav from 'components/Nav';
import SideBar from 'components/SideBar';

class Header extends Component { 
	constructor(props) {
		super(props)

		this.state = {
			sideBarOpened: false,
		}
	}

	handlerSideBar = (value) => {
		const { sideBarOpened } = this.state;
		this.setState({ sideBarOpened: value })
	}

  render() {

	const { sideBarOpened } = this.state;

    return (
		<>
			<Nav handlerSideBar={this.handlerSideBar}/>
			<SideBar handlerSideBar={this.handlerSideBar} opened={sideBarOpened}/>
		</>
    );
  }
}

export default Header;
