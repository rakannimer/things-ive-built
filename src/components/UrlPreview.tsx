import MicrolinkCard from "react-microlink";
import isUrl from "is-url";
import { Component } from "../utils/component-component";
export const UrlPreview = ({ url }) => {
  return isUrl(url) ? (
    <Component
      key={url}
      shouldUpdate={({ nextProps }) => {
        return nextProps.url !== url;
      }}
      url={url}
    >
      <MicrolinkCard url={url} />
    </Component>
  ) : (
    <MicrolinkCard url="" />
  );
};
