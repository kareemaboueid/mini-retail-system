/** ## Database Strings */
const cnst_db_strings = () => {
  const data = {
    /**
     * ## User DB Structure
     * ```
     * coll: `users`
     * model: `User`
     * ```
     */
    user: {
      /** coll: `users` */
      coll: String('users'),
      /** model: `User` */
      model: String('User'),
    },

    /**
     * ## Company DB Structure
     * ```
     * coll: `companies`
     * model: `Company`
     * ```
     */
    company: {
      /** coll: `companies` */
      coll: String('companies'),
      /** model: `Company` */
      model: String('Company'),
    },
  };

  return data;
};

export default cnst_db_strings;
