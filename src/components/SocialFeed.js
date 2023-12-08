import React from 'react';

function SocialFeed({ imagePath, text }) {
    const textContent = text.length > 100 ? text.substring(0, 100) + "..." : text;

    return (
        <div style={{ width: '512px' }}>
            <img src={imagePath} alt="Feed" width="512" height="512" />
            <p style={{textAlign: 'left'}}>{textContent}</p>
        </div>
    );
}

export default SocialFeed;
