import React from 'react';

const Tag = ({ tag }) => {
  console.log('====================================');
  console.log(tag);
  console.log('====================================');
  
  return (
    <div className="tag" style={{ backgroundColor: "#"+tag.color , color: "white" } }>
      {tag.label}
    </div>
  );
};

export default Tag;
