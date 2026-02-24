// Return the class name string for any property access so className={styles.foo} = "foo"
module.exports = new Proxy(
  {},
  {
    get: (_, prop) => (typeof prop === 'string' ? prop : undefined),
  },
);
