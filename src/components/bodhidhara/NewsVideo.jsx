import { useEffect, useState } from 'react';
import {accessToken, pageId} from '../../utilities/fbApp';

const Play = ({videoId,height,width}) => {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  // reset video data after video id changes
  useEffect(() => {
    return () => {
      setVideoData(null);
    };
  }, [videoId]);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`https://graph.facebook.com/v17.0/${videoId}?fields=id,title,description,source&access_token=${accessToken}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideoData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVideo();
  }, [videoId, accessToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {videoData.source && (
        <video controls width={width} height={height}>
          <source src={videoData.source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Play;
