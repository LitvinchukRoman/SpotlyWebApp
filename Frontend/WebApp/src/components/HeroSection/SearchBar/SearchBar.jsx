import styles from './SearchBar.module.scss';

export default function SearchBar() {
  return (
    <form className={styles.searchBar}>
      <input className="body-16" placeholder="Шукати події..." />
      <div className={styles.location}>
        <img src="./images/location.svg" alt="location point"/>
        <span className='body-16'>Київ</span>
        <img src="./images/arrow-down.svg" alt="arrow down"/>
      </div>
      <button className={styles.searchBtn} type='submit'>
        <img src="./images/search.svg" alt="searh for"/>
      </button>
    </form>
  );
}