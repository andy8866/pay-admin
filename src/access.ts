/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { // @ts-ignore
  currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
