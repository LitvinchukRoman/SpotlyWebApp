// import eyeStyles from './BlackRedEye.module.scss';

type Props = {
  isOpenEye: boolean;
  onOpenEye: () => void;
  isError: boolean;
}

const BlackRedEye: React.FC<Props> = ({ isOpenEye, onOpenEye, isError }) => {
  console.log(isError);

  if (isError) {
    return (
      <>
        {!isOpenEye ? (
          <img
            src="./images/icons/eye_closed-1.svg"
            alt="red eye"
            onClick={onOpenEye}
          />
        ) : (
          <img
            src="./images/icons/Eye_opened-1.svg"
              alt="red eye"
              onClick={onOpenEye}
          />
        )}
      </>
    );
  }

  return (
    <>
      {!isOpenEye ? (
        <img
          src="./images/icons/eye_closed.svg"
          alt="eye"
          onClick={onOpenEye}
        />
      ) : (
        <img
          src="./images/icons/Eye_opened.svg"
          alt="eye"
          onClick={onOpenEye}
        />
      )}
    </>
  );
}

export default BlackRedEye;
