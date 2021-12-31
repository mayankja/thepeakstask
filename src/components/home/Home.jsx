import React, { Component } from 'react';
import '../../styles/home.scss';
import Filter from '../filter/Filter';
import Articles from '../articles/Articles';

export default class Home extends Component {
    state = {
        filter_by: 'newest',
        response_data: null,
        loader: false
    }

    componentDidMount = () => {
        this.handleArticles(this.state.filter_by, this.props.search_query);
    }

    componentDidUpdate = (preProps) => {
        if(preProps.search_query !== this.props.search_query) {
            this.handleArticles(this.state.filter_by, this.props.search_query);
        }
    }

    handleArticles = (filter_by, query) => {
        this.setState({loader: true, filter_by})
        fetch(
            `https://content.guardianapis.com/search?api-key=791e2187-1dc7-4975-a2bf-e9b1a966806f&format=json&q=${query}&order-by=${filter_by}&show-fields=headline,trailText,thumbnail&show-elements=all&page-size=30`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loader: false,
                    response_data: data.response
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    handleFilter = (filter_by) => {
        this.setState({filter_by});
        this.handleArticles(filter_by);
    }
    render() {
        const { loader, filter_by, response_data } = this.state;
        const { search_query, bookmarked_articles, handleViewBookmark, view_bookmark } = this.props;
        if (loader) {
            return <div className='spinner_icon'>
                <img alt="#" src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-2.jpg" />
            </div>
        }
        return (
            <div className='home_container'>
                <Filter
                    handleFilter = {(filter_by) => this.handleFilter(filter_by)}
                    handleViewBookmark = {handleViewBookmark}
                    view_bookmark={view_bookmark}
                    search_query={search_query}
                    filter_by={filter_by}
                />
                <Articles
                    filter_by={filter_by}
                    bookmarked_articles={bookmarked_articles}
                    view_bookmark={view_bookmark}
                    response_data={response_data}
                />
            </div>
        )
    }
}
