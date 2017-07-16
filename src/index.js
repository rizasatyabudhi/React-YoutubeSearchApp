import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBbwED3twnHGoNGxANGv6cM8UQA0Uj825g';

// Create a new component. This component should produce
// some HTML

class App extends Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.videoSearch('macbook pro');
  }


  videoSearch(term) {
    YTSearch({ key: API_KEY, term }, (videos) => {   // {key: API_KEY, term: term}
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term); }, 300);
    return (
      <div>
        {/* term will be sent to videoSearch */}
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        {/* Passing props 'videos' to VideoList */}
        <VideoList
          videos={this.state.videos}
        // Function, It Takes a video, and update to App State
        // We pass this (onVideoSelect) properties to VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
        />
      </div>
    );
  }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));
