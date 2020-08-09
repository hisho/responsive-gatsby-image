import React from 'react';
import { percentage } from 'src/utilities';

//画像のアスペクト比を固定したjsxを返す関数
const AspectRatio = ({ className, width, height }) => {
  return (
    <>
      <div
        aria-hidden={'true'}
        className={className}
        style={{
          display: 'block',
          width: '100%',
          paddingTop: percentage(height / width),
        }}
      />
    </>
  );
};

export default AspectRatio;
