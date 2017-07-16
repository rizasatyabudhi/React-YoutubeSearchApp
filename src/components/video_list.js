import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
  const videoItems = props.videos.map(video =>        // Iterates the response (videos)
    (
      <VideoListItem
        key={video.etag}
        video={video}
        // We are taking the prop that is coming form the App, and passing it down to video_list_item
        // So video_list_item has property onVideoSelct
        onVideoSelect={props.onVideoSelect}
      />
    ));

  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
};

export default VideoList;
