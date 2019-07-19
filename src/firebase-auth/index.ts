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
