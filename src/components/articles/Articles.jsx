import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/articles.scss';

export default class Articles extends Component {

    render() {
        const { response_data, bookmarked_articles, view_bookmark } = this.props;
        if (response_data) {
            const articles = view_bookmark ? bookmarked_articles : response_data.results;
            return (
                <div className='articles_container'>
                    {articles && articles.map(
                        (article, i) => <div className='article_details' key={i}>
                            <Link to={`/article?api_url=${article.apiUrl}`}>
                                {article.fields.thumbnail && <img alt={`thumbnail${i}`} src={article.fields.thumbnail} />}
                                <div>
                                    <label>{article.fields.headline}</label>
                                    <p>{article.fields.trailText}</p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            )
        }
        return null;
    }
}
