import HeroSection from '../components/HeroSection/HeroSection.jsx';
import CardSection from '../components/CardSection/CardSection.jsx';

const MainPage = () => {
  return (
    <div>
      <HeroSection />
      <CardSection title="Популярні події"/>
      <CardSection title="Нові події"/>
    </div>
  );
}

export default MainPage;