import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarMenu } from '@app/store/reducers/ui';
import UserDropdown from '@app/modules/main/header/user-dropdown/UserDropdown';
import { authName, capitalizeFirstLetter } from '@app/utils/helpers';
import { IRootState } from '@app/store/Models/DisplayItems';

const Header = () => {
  useTranslation();
  const dispatch = useDispatch();
  const { navbarVariant, headerBorder } = useSelector(
    (state: IRootState) => state.ui,
  );
  const getContainerClasses = useCallback(() => {
    let classes: string = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  const userName: string = authName();
  return (
    <nav className={getContainerClasses()}>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button
            onClick={() => dispatch(toggleSidebarMenu())}
            type="button"
            className="nav-link"
          >
            <i className="fas fa-bars" />
          </button>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <div className="d-flex align-items-center justify-content-center">
          <strong>{capitalizeFirstLetter(userName)}</strong>
        </div>
        <UserDropdown />
      </ul>
    </nav>
  );
};

export default Header;
