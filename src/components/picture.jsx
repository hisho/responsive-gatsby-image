import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// interface PictureInterface {
//   relativePath: string
//   alt?: string
//   style?: React.CSSProperties
//   className?: string
// }

const Picture = (props) => {
  const data = useStaticQuery(graphql`
    query allImageFileQuery {
      desktopImages: allFile(filter: { ext: { regex: "/(png|jpg)/" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 2000, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      mobileImages: allFile(filter: { ext: { regex: "/(png|jpg)/" }, relativePath: { regex: "/sp_/" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 1000, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);

  function addPrefixForRelativePath(relativePath, prefix = 'sp_') {
    const splitPathArray = relativePath.split('/');
    const lastIndex = splitPathArray.length - 1;
    splitPathArray[lastIndex] = `${prefix}${splitPathArray[lastIndex]}`;
    return splitPathArray.join('/');
  }

  const desktopImageRelativePath = props.relativePath;
  const mobileImageRelativePath = addPrefixForRelativePath(props.relativePath);

  const desktopImages = data.desktopImages.edges.find((n) => n.node.relativePath === desktopImageRelativePath)?.node
    .childImageSharp?.fluid;
  const mobileImages = data.mobileImages.edges.find((n) => n.node.relativePath === mobileImageRelativePath)?.node
    .childImageSharp?.fluid;

  const imageSources = mobileImages
    ? [
        mobileImages,
        {
          ...desktopImages,
          media: `(min-width: 1000px)`,
        },
      ]
    : desktopImages;

  return (
    <>
      {imageSources ? (
        <Img fluid={imageSources} style={props.style} className={props.className} alt={props.alt} />
      ) : (
        <div>
          <span style={{ color: 'red' }}>
            エラー
            <span style={{ fontWeight: 'bold' }}>"{props.relativePath}"</span>
            は見つけられませんでした。
          </span>
          <br />
          screenshot.png
          <br />
          または
          <br />
          test1/screenshot.png
          <br />
          の様に指定してください。
        </div>
      )}
    </>
  );
};

export default Picture;
