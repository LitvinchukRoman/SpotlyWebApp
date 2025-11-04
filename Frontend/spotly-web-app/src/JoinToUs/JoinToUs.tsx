import joinUsStyles from './JoinToUs.module.scss';

type Props = {
  onOpen: () => void
}

const JoinToUs: React.FC<Props> = ({ onOpen }) => {
  return (
    <>
      <div className={joinUsStyles.joinUs}>
        <div className={joinUsStyles.joinUs__wrapper}>
          <h2 className={joinUsStyles.joinUs__title}>Приєднуйся до подій поруч</h2>
          <div className={joinUsStyles.joinUs__action}>Створи безкоштовний акаунт, щоб брати участь <br /> у подіях та знайомитися з іншими.</div>
          <button onClick={onOpen} className={joinUsStyles.joinUs__registrait}>Зареєструватися</button>

          <div className={joinUsStyles.joinUs__isAccount}>
            <div className={joinUsStyles.joinUs__question}>Вже маєш акаунт?</div>
            <button onClick={onOpen} className={joinUsStyles.joinUs__logIn}>Увійти</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinToUs;
