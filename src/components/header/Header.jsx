import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../../styles/header.scss'

export default class Header extends Component {
    state = {
        search_bar_active: false
    }
    render() {
        const { search_bar_active } = this.state;
        const { handleViewBookmark } = this.props;
        return (
            <div onClick={() => this.setState({search_bar_active: false})} className="container_header">
                <h1 onClick={() => handleViewBookmark()}><Link to='/'>The Peacks</Link></h1>
                <div style={{background: search_bar_active && '#2153a3'}} className="search_section">
                    {search_bar_active && <input onChange={(event) => this.props.handle_search(event.target.value)} type="search" />}
                    <span onClick={() => this.setState({search_bar_active: !search_bar_active})} className="search_icon">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        )
    }
}
