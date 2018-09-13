import React from "react";
import NextHead from "next/head";
import { project } from "../constants/";

const defaultTitle = project.name;
const defaultDescription = project.tagline;
const defaultOGURL = "https://things-ive-built.com";
const defaultOGImage = "";

export type HeadProps = {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
};

export const Head = ({
  title = defaultTitle,
  description = defaultDescription,
  url = defaultOGURL,
  ...props
}: HeadProps) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/favicon.png" />
    <link rel="apple-touch-icon" href="/static/favicon.png" />
    <link rel="mask-icon" href="/static/favicon.svg" color="#49B882" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:site" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

export default Head;
