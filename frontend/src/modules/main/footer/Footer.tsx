import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';

const Footer = () => {
  const [t] = useTranslation();

  return (
    <footer className="main-footer">
      <strong>
        <span>Copyright © {DateTime.now().toFormat('y')} </span>
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <b>{t('footer.version')}</b>
        <span>&nbsp;0.0.1</span>
      </div>
    </footer>
  );
};

export default Footer;
