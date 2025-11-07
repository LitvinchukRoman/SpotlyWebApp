import styles from './CategoryButton.module.scss';

export default function CategoryButton({ icon, label, bigSize, extraClass }) {
  const baseClass = bigSize ? styles.category__button : styles.category__icon;
  const combinedClass = `${baseClass} ${extraClass || ''}`.trim();

  if (bigSize) {
    return (
      <button className={combinedClass}>
        <img src={icon} alt={label} />
      </button>
    );
  } else {
    return (
      <div className={combinedClass}>
        <img src={icon} alt={label} />
      </div>
    );
  }
}