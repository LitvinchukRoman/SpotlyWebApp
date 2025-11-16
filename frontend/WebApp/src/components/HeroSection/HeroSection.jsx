import Container from '../Container/Container.jsx';
import Header from './Header/Header.jsx';
import Hero from './Hero/Hero.jsx';
import Categories from './Categories/Categories.jsx';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  return (
    <section className={styles.hero__section}>
      <Container className={styles.hero__container}>
        <Header />
        <Hero />
        <Categories />
      </Container>
    </section>
  );
};

export default HeroSection;