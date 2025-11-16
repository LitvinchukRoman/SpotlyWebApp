import styles from './Hero.module.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Title from '../Title/Title.jsx';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Title />
      <SearchBar />
    </div>
  );
}

export default Hero;