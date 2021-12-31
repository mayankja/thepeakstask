import React, { Component } from 'react';
import '../../styles/filter.scss'

export default class Filter extends Component {
    render() {
        const { handleFilter, filter_by, search_query, handleViewBookmark, view_bookmark } = this.props;
        return (
            <div className='filter_container'>
                <h1>{view_bookmark ? 'All bookmark' : (search_query ? 'Search Results' : 'Top stories')}</h1>
                <div className='filter_section'>
                    {!view_bookmark && <div onClick={() => handleViewBookmark()} className='bookmark_section'>
                        <i className='fa fa-bookmark' aria-hidden='true'></i>
                        <span>VIEW BOOKMARK</span>
                    </div>}
                    <select value={filter_by} onChange={(event) => handleFilter(event.target.value)}>
                        <option value='newest'>Newest first</option>
                        <option value='oldest'>Oldest first</option>
                        <option value='relevance'>Most popular</option>
                    </select>
                </div>
            </div>
        )
    }
}
