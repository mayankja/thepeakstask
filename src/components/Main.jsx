import React, { Component } from 'react';
import Header from './header/Header';
import Home from './home/Home';
import Article from './articles/Article';
import { Routes, Route } from 'react-router-dom';
import '../styles/main.scss';

export default class Main extends Component {
    state = {
        search_query: '',
        bookmarked_articles: [],
        view_bookmark: false
    }

    handleBookmark = (article_details) => {
        if (!this.state.bookmarked_articles.some(article => article.id === article_details.id)) {
            this.setState({
                bookmarked_articles: [...this.state.bookmarked_articles, article_details]
            });
        } else {
            this.setState({
                bookmarked_articles: this.state.bookmarked_articles.filter(article => !(article.id === article_details.id))
            })
        }
    }

    render() {
        const { search_query, bookmarked_articles, view_bookmark } = this.state;
        return (
            <div className="container">
                <Header
                    handle_search={(search_query) => this.setState({search_query})}
                    handleViewBookmark = {() => this.setState({view_bookmark: false})}
                />
                <Routes>
                    <Route
                        path="/" 
                        element={
                            <Home
                                handleViewBookmark = {() => this.setState({view_bookmark: true})}
                                view_bookmark={view_bookmark}
                                bookmarked_articles={bookmarked_articles} 
                                search_query={search_query}
                            />
                        }
                    />
                    <Route path="/article" element={<Article bookmarked_articles={bookmarked_articles} handleBookmark={(article_details) => this.handleBookmark(article_details)} />} />
                </Routes>
            </div>
        )
    }
}
