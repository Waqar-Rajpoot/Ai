import styles from "./SearchBox.module.css";

/**
 * Search form. It submits to /search with GET, so it works without JavaScript
 * and without a server.
 */
export function SearchBox() {
  return (
    <form role="search" action="/search" method="get" className={styles.form}>
      <label htmlFor="site-search" className="visually-hidden">
        Search guides, glossary, reviews and tools
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        placeholder="Search guides, glossary, reviews and tools"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}
