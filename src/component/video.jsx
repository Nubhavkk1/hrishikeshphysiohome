import React from 'react';

// VideoPlayer Component
const VideoPlayer = ({ src }) => {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        title="Cloudinary Video"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></iframe>
    </div>
  );
};

// App Component to render the VideoPlayer
const App = () => {
  // Example Cloudinary video embed URL
  const videoSrc = "https://player.cloudinary.com/embed/?cloud_name=dlofql51b&public_id=webvidx_k21rqg&profile=cld-default";

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Responsive Cloudinary Video Player</h1>
      <VideoPlayer src={videoSrc} />
    </div>
  );
};

export default App;
