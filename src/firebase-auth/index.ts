const signInAnonymously = async firebase => {
  await firebase.signInAnonymously();
};

const signInWithGihub = async firebase => {
  const provider = new firebase.auth.GithubAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

export const signOut = async firebase => {
  await firebase.auth().signOut();
};
export const signIn = async ({ provider = "anonymous", firebase }) => {
  switch (provider) {
    case "anonymous": {
      return await signInAnonymously(firebase);
    }
    case "github.com": {
      return await signInWithGihub(firebase);
    }
  }
};
