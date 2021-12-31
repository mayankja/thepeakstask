import React, { Component } from 'react';
import parse from "html-react-parser";
import '../../styles/article.scss'
import {useLocation} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={new URLSearchParams(useLocation().search).get('api_url')} />;
}

class Article extends Component {

    state = {
        response_data: null,
        loader: false,
        showStatus: ''
    }
    
    componentDidMount() {
        let api_url = this.props.params;
        this.fetchData(api_url);
    }

    fetchData = api_url => {
        this.setState({loader: true})
        const url = `${api_url}?api-key=791e2187-1dc7-4975-a2bf-e9b1a966806f&show-fields=all`
        fetch(
            url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loader: false,  
                    response_data: data.response.content
                })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    addBookmark = (article_details) => {
        this.setState({
            showStatus: 'add'
        })
        this.props.handleBookmark(article_details);
        setTimeout(() => this.setState({
            showStatus: ''
        }), 3000);
    }

    removeBookmark = (article_details) => {
        this.setState({
            showStatus: 'remove'
        })
        this.props.handleBookmark(article_details);
        setTimeout(() => this.setState({
            showStatus: ''
        }), 3000);
    }

    render() {
        const { response_data, loader, showStatus } = this.state;
        console.log(response_data);
        if (loader) {
            return <div className='spinner_icon'>
                <img alt="#" src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-2.jpg" />
            </div>
        }
        if(response_data) {
            const article_details = {
                id: response_data.id,
                apiUrl: response_data.apiUrl,
                fields: {
                    headline: response_data.fields.headline,
                    trailText: response_data.fields.trailText,
                    thumbnail: response_data.fields.thumbnail
                }
            }
            const isBookMarked = this.props.bookmarked_articles.some(bookmark_article=>bookmark_article.id === response_data.id)
            return (
                <div className='article_container'>
                    <div>
                        {isBookMarked
                            ?<div onClick={() => this.removeBookmark(article_details)} className='bookmark_section'>
                                <i className='fa fa-bookmark' aria-hidden='true'></i>
                                <span>REMOVE BOOKMARK</span>
                            </div>
                            :<div onClick={() => this.addBookmark(article_details)} className='bookmark_section'>
                                <i className='fa fa-bookmark' aria-hidden='true'></i>
                                <span>ADD BOOKMARK</span>
                            </div>
                        }
                        <p>{new Date(response_data.fields.lastModified).toISOString()}</p>
                        <h1>{response_data.fields.headline}</h1>
                        <h3>{response_data.fields.trailText}</h3>
                    </div>
                    {parse(response_data.fields.body)}
                    {showStatus === 'add' ? <p className='add_bookmark'>Saved to Bookmark</p> : (showStatus === 'remove' ? <p className='remove_bookmark'>Removed from Bookmark</p> : null)}
                </div>
            )
        }
        return null;
    }
}

export default withParams(Article);
