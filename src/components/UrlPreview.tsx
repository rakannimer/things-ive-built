import * as React from "react";
import MicrolinkCard from "react-microlink";
import isUrl from "is-url";
import { Component } from "../utils/component-component";
export const UrlPreview = ({ url }) => {
  return (
    <Component
      key={url}
      shouldUpdate={({ nextProps }) => {
        return nextProps.url !== url && isUrl(url);
      }}
      url={url}
    >
      {isUrl(url) ? (
        <MicrolinkCard url={url} />
      ) : (
        <MicrolinkCard url="https://http.cat/200" />
      )}
    </Component>
  );
};
