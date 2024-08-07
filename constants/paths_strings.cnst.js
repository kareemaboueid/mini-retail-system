/** ## Paths Strings */
const cnst_paths_strings = () => {
  const path = {
    /**
     * ## User Endpoints
     * ```
     * root: `/v1/users`
     * create: `/create`
     * login: `/login`
     * logout: `/logout`
     * username: `/:username`
     * ```
     */
    user: {
      /** root: `/v1/users` */
      root: String('/v1/users'),
      /** create: `/create` */
      create: String('/create'),
      /** login: `/login` */
      login: String('/login'),
      /** logout: `/logout` */
      logout: String('/logout'),
      /** username: `/:username` */
      username: String('/:username'),
    },
  };

  return path;
};

export default cnst_paths_strings;
