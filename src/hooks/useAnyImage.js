import { graphql, useStaticQuery } from 'gatsby';

const useAnyImage = (relativePath) => {
  // desktopImages
  // 全ての画像から拡張子png,jpg,jpeg、ファイル名の先頭にsp_が付いていない画像の配列
  // mobileImages
  // 全ての画像から拡張子png,jpg,jpeg、ファイル名の先頭にsp_が付いている画像の配列
  const { desktopImages, mobileImages } = useStaticQuery(graphql`
    query useAnyImage {
      desktopImages: allFile(
        filter: {
          extension: { regex: "/(png|jpe?g)/" }
          sourceInstanceName: { eq: "images" }
          name: { regex: "/^(?!sp_)/" }
        }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 2000, quality: 90) {
                presentationWidth
                presentationHeight
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      mobileImages: allFile(
        filter: {
          extension: { regex: "/(png|jpe?g)/" }
          sourceInstanceName: { eq: "images" }
          name: { regex: "/^sp_/" }
        }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 1000, quality: 90) {
                presentationWidth
                presentationHeight
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);

  // image.png or folder/image.png or folder/folder/image.png
  const desktopImageName = relativePath;
  //上記のrelativePathの画像名の前にsp_を付ける処理
  // sp_image.png or folder/sp_image.png or folder/folder/sp_image.png
  const mobileImageName = relativePath.replace(/((?!.*\/).+\.(png|jpe?g))$/, 'sp_$1');

  //desktopImagesからrelativePathを一致するobjectを返す
  const desktopImage = desktopImages.edges.find((n) => n.node.relativePath.includes(desktopImageName))?.node
    .childImageSharp.fluid;
  //mobileImageからrelativePathのファイル名の先頭にsp_を付けたものと一致するobjectを返す
  const mobileImage = mobileImages.edges.find((n) => n.node.relativePath.includes(mobileImageName))?.node
    .childImageSharp.fluid;

  //objectにして返す
  return {
    desktopImage,
    mobileImage,
  };
};

export default useAnyImage;
