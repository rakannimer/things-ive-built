import * as React from "react";
import { addUser } from "../../firebase-mutations/add-user";
import { useFirebaseAuth } from "../../hooks/use-firebase";

export const PersonalDataLoader = () => {
  const { isAuthed, firebase, user } = useFirebaseAuth();
  React.useEffect(
    () => {
      if (!isAuthed || firebase === null || user === null) return;
      const currentUserId = user.uid;
      const authentication_data = user.providerData[0];
      const providerId = user.providerId;
      addUser({
        uid: currentUserId,
        authentication_data,
        authentication_method: providerId
      });
    },
    [isAuthed, firebase]
  );
  return null;
};
