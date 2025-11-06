import styles from './CategoryButton.module.scss';

export default function CategoryButton({ icon, label }) {
  return (
    <div className={styles.card}>
      <button className={styles.icon}>
        <img src={icon} alt={label}/>
      </button>
      <p className='text-14'>{label}</p>
    </div>
  );
}
