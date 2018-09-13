import getConfig from "next/config";
const signInAnonymously = async firebase => {
  await firebase.auth().signInAnonymously();
};

const signInWithGihub = async firebase => {
  const provider = new firebase.auth.GithubAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

export const signOut = async firebase => {
  await firebase.auth().signOut();
};
export const signIn = async ({ provider = "anonymous", firebase }) => {
  if (window.location.search.includes("CI=1")) {
    return await signInAnonymously(firebase);
  }
  return await signInWithGihub(firebase);
};

const getQueryStringParams = query => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : "";
          return params;
        }, {})
    : {};
};
