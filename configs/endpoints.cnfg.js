
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

const user = {
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
}

export { user };