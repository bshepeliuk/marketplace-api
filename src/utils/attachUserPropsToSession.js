function attachUserPropsToSession(user, session) {
  session.current = {
    userId: user.id,
    role: user.role,
    isLoggedIn: true,
  };
}

export default attachUserPropsToSession;
