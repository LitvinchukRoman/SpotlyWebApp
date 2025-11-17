import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <h3 className={styles.logo}> Spotly </h3>
      <nav className={styles.nav}>
        <button className= {`${styles.login} text-14`}> Вхід </button>
        <button className= {`${styles.register} text-14`}>Реєстрація</button>
      </nav>
    </header>
  );
}

export default Header;