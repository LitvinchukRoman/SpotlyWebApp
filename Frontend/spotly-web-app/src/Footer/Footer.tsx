import footerStyles from './Footer.module.scss';

const Footer = () => {
  return (
    <>
      <div className={footerStyles.footer}>
        <div className={footerStyles.footer__mainWrapper}>
          <div className={footerStyles.footer__firstWrapper}>
            <h4 className={footerStyles.footer__title}>Spotly</h4>
            <button className={footerStyles.footer__describe}>Платформа пошуку подій <br /> і нових знайомств.</button>
          </div>

          <div className={footerStyles.footer__secondWrapper}>
            <div className={footerStyles.footer__spotlyInfo}>
              <div className={footerStyles.footer__company}>Компанія</div>
              <button className={footerStyles.footer__aboutUs}>Про нас</button>
              <button className={footerStyles.footer__contacts}>Контакти</button>
            </div>

            <div className={footerStyles.footer__socials}>
              <div className={footerStyles.footer__monitor}>Слідкуй за нами</div>
              <button className={footerStyles.footer__insta}>
                <img src="../../public/images/icons/instagram.svg" alt="img" />
                Instagram
              </button>
              <button className={footerStyles.footer__telegram}>
                <img src="../../public/images/icons/telegram.svg" alt="img" />
                Telegram
              </button>
              <button className={footerStyles.footer__youtube}>
                <img src="../../public/images/icons/youtube.svg" alt="img" />
                YouTube
              </button>
              <button className={footerStyles.footer__facebook}>
                <img src="../../public/images/icons/facebook-white.svg" alt="img" />
                Facebook
              </button>
            </div>

            <div className={footerStyles.footer__helpColumn}>
              <div className={footerStyles.footer__support}>Підтримка</div>
              <button className={footerStyles.footer__faqAndHelp}>Допомога / FAQ</button>
              <button className={footerStyles.footer__conditionOfUsing}>Умови використання</button>
              <button className={footerStyles.footer__confidential}>Політика конфіденційності</button>
            </div>

          </div>
        </div>

        <div className={footerStyles.footer__line}></div>
        <div className={footerStyles.footer__rights}>© 2025 Всі права захищені, Spotly®</div>
      </div>
    </>
  );
}

export default Footer;
