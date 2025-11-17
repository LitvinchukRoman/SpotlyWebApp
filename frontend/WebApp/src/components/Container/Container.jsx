import styles from './Container.module.scss';

export default function Container({ children, className, size = 'lg' }) {
  return (
    <div className={`${styles.container} ${styles[size]} ${className || ''}`}>
      {children}
    </div>
  );
}