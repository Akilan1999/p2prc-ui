module.exports = {
  siteMetadata: {
    siteUrl: "https://example.com",
    title: "P2PRC",
    discription: "DISC",
    author: "Faraz Shaikh",
    keywords: ["p2prc"],
    twitterHandle: "@CantBeFaraz",
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/markdown`,
      },
    },
    `gatsby-transformer-remark`,
  ],
};
