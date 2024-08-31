import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation, Location } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setfileUpload } from '@app/store/reducers/fileupload';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '@app/utils/alert';
import { IMenuItem } from '@app/store/Models/DisplayItems';

const MenuItem = ({ menuItem }: { menuItem: IMenuItem }) => {
  const [t] = useTranslation();
  const [isMenuExtended, setIsMenuExtended] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [isMainActive, setIsMainActive] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [isOneOfChildrenActive, setIsOneOfChildrenActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuExtended(!isMenuExtended);
  };

  const fileUploadClicked = useSelector(
    (state: any) => state.uploadfile.fileupload,
  );

  const handleModalConfirm = () => {
    dispatch(setfileUpload());
    setMenuClicked(false);
    navigate(menuItem.path ? menuItem.path : '/');
  };

  const handleModalCancel = () => {
    setMenuClicked(false);
  };

  const handleMainMenuAction = () => {
    if (isExpandable) {
      toggleMenu();
      return;
    }
    if (!fileUploadClicked) {
      navigate(menuItem.path ? menuItem.path : '/');
    } else {
      setMenuClicked(true);
    }
  };
  const calculateIsActive = (url: Location) => {
    setIsMainActive(false);
    setIsOneOfChildrenActive(false);
    if (isExpandable && menuItem && menuItem.children) {
      menuItem.children.forEach((item: IMenuItem) => {
        if (item.path === url.pathname) {
          setIsOneOfChildrenActive(true);
          setIsMenuExtended(true);
        }
      });
    } else if (menuItem.path === url.pathname) {
      setIsMainActive(true);
    }
  };

  useEffect(() => {
    if (location) {
      calculateIsActive(location);
    }
  }, [location, isExpandable, menuItem]);

  useEffect(() => {
    if (!isMainActive && !isOneOfChildrenActive) {
      setIsMenuExtended(false);
    }
  }, [isMainActive, isOneOfChildrenActive]);

  useEffect(() => {
    setIsExpandable(
      Boolean(menuItem && menuItem.children && menuItem.children.length > 0),
    );
  }, [menuItem]);

  return (
    <>
      <li className={`nav-item${isMenuExtended ? ' menu-open' : ''}`}>
        <a
          className={`nav-link${
            isMainActive || isOneOfChildrenActive ? ' active' : ''
          }`}
          role="link"
          onClick={handleMainMenuAction}
          style={{ cursor: 'pointer' }}
        >
          <i className={`${menuItem.icon}`} />
          <p>{t(menuItem.name)}</p>
          {isExpandable ? <i className="right fas fa-angle-left" /> : null}
        </a>

        {isExpandable &&
          menuItem &&
          menuItem.children &&
          menuItem.children.map((item: IMenuItem) => (
            <ul key={item.name} className="nav nav-treeview">
              <li className="nav-item">
                <NavLink className="nav-link" to={`${item.path}`}>
                  <i className={`${item.icon}`} />
                  <p>{t(item.name)}</p>
                </NavLink>
              </li>
            </ul>
          ))}
      </li>
      <AlertModal
        show={menuClicked}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        bodyMessage="File Upload is in Progress. Are You Sure You want to Switch Tab?"
        title="Confirmation"
      />
    </>
  );
};

export default MenuItem;
