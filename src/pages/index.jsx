import React from 'react';
import { Picture } from 'src/components';

const IndexPage = () => {
  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <Picture relativePath='screenshot.png' />
      <Picture relativePath='test1/screenshot.png' />
      <Picture relativePath='test2/deeptest2/screenshot.png' />
      <Picture relativePath='test/no-iamge.png' />
    </div>
  );
};

export default IndexPage;
