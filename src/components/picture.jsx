import React from 'react';
import Img from 'gatsby-image';
import { useAnyImage } from 'src/hooks';
import { AspectRatio } from 'src/components';

const Picture = ({ relativePath, fadeIn, durationFadeIn, alt, className, style, loading, draggable }) => {
  // useAnyImageの返り値のdesktopImageとmobileImageを分割代入で取り出す
  const { mobileImage, desktopImage } = useAnyImage(relativePath);

  //mobileImageとdesktopImageが存在する時にmediaを追加したobjectを作る
  //どちらもない場合はdesktopImageを返す
  const source =
    mobileImage && desktopImage
      ? [
          mobileImage,
          {
            ...desktopImage,
            media: `(min-width: 1000px)`,
          },
        ]
      : desktopImage;

  return (
    <>
      {//sourceがある時の処理
        source ? (
        <div className='relative'>
          {//mobileImageがある時の処理
            mobileImage && (
            <AspectRatio
              className='test-none'
              width={mobileImage.presentationWidth}
              height={mobileImage.presentationHeight}
            />
          )}

          {//desktopImageがある時の処理
            desktopImage && (
            <AspectRatio
              className={mobileImage && `hidden test-block`}
              width={desktopImage.presentationWidth}
              height={desktopImage.presentationHeight}
            />
          )}

          <Img
            fluid={source}
            style={style}
            className={`img ${className ?? ''}`}
            alt={alt}
            fadeIn={fadeIn}
            durationFadeIn={durationFadeIn}
            loading={loading}
            draggable={draggable}
          />
        </div>
      ) : (
        <div>
          <span style={{color: 'red'}}>
            エラー<span style={{ fontWeight: "bold" }}>"{relativePath}"</span>
            は存在しません。
          </span>
          <br />
          ogp.pngの様に指定してください。
          <br />
          または
          <br />
          common/ogp.pngの様に指定してください。
        </div>
      )}
    </>
  );
};

export default Picture;
