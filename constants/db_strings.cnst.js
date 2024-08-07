/**
 * ## User DB Structure
 * ```
 * coll: `users`
 * model: `User`
 * ```
 */
const user = {
  /** coll: `users` */
  coll: String('users'),
  /** model: `User` */
  model: String('User'),
};

/**
 * ## Company DB Structure
 * ```
 * coll: `companies`
 * model: `Company`
 * ```
 */
const company = {
  /** coll: `companies` */
  coll: String('companies'),
  /** model: `Company` */
  model: String('Company'),
};

export { user, company };
