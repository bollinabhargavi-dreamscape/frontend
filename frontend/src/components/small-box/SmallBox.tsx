import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SmallBoxProps } from '@app/store/Models/DisplayItems';

const SmallBox = ({
  type = 'info',
  icon = 'ion-bag',
  count,
  title,
  navigateTo,
}: SmallBoxProps) => {
  const [t] = useTranslation();

  return (
    <div className={`small-box bg-${type}`}>
      <div className="inner">
        <h3>{count}</h3>
        <p>{title}</p>
      </div>
      <div className="icon">
        <i className={`ion ${icon || 'ion-bag'}`} />
      </div>
      <Link to={navigateTo} className="small-box-footer">
        <span className="mr-2">{t('main.label.moreInfo')}</span>
        <i className="fa fa-arrow-circle-right" />
      </Link>
    </div>
  );
};

export default SmallBox;
