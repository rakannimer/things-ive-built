export const getFirebasePath = (path: string) => {
  return `${process.env.NODE_ENV}/${path}`;
};
