import React from "react";
import { Terminal } from "../components/Terminal";
import { Default } from "../layouts/default";
import { graphql, Link } from "gatsby";

export default function Index({ data }) {
  console.log(data);
  const {
    allMarkdownRemark: { nodes },
  } = data; // data.markdownRemark holds our post data
  const { html } = nodes[0];

  return (
    <Default>
      <div className="container ml-6 mr-6 ">
        <h1 align="center" className="title is-2">
          <br />
          <a href="">
            <img src="https://raw.githubusercontent.com/Akilan1999/p2p-rendering-computation/master/Docs/images/p2prclogo.png" alt="p2prc" width="400" />
          </a>
          <br />
          P2P Rendering Computation
        </h1>

        <Terminal />
        <br />

        <div className="content">
          <h1>README.md</h1>
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Default>
  );
}

export const pageQuery = graphql`
  query posts {
    allMarkdownRemark {
      nodes {
        html
      }
    }
  }
`;
