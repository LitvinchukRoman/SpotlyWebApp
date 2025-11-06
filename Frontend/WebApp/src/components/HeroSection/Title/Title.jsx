import styles from './Title.module.scss';

const Title = () => {
  return (
    <div className={styles.title__section}>
      <h1>Досі не знаєш, що робити сьогодні?</h1>
      <div>
        <p className='body-18'>У світі стільки всього відбувається — не пропусти своє.</p>
        <p className='body-18'>Досліджуй, зустрічай, створюй спогади з Spotly</p>
      </div>
    </div>
  );
}

export default Title;