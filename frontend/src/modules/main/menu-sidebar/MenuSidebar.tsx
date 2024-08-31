import { useSelector } from 'react-redux';
import store from '../../../store/store';
import { Link } from 'react-router-dom';
import { MenuItem } from '@components';
import i18n from '@app/utils/i18n';
import { IMenuItem, IRootState } from '@app/store/Models/DisplayItems';

export const ADMIN_MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',
    path: '/',
  },
  {
    name: i18n.t('menusidebar.label.clientlist'),
    icon: 'fas fa-users nav-icon',
    path: '/client-list',
  },
  {
    name: i18n.t('menusidebar.label.adminjobs'),
    icon: 'fas fa-file-alt nav-icon',
    path: '/admin-jobs',
  },
  {
    name: i18n.t('menusidebar.label.employees'),
    icon: 'fas fa-users nav-icon',
    path: '/employee',
  },
];

export const CLIENT_MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon',
    path: '/',
  },
  {
    name: i18n.t('menusidebar.label.clientjobs'),
    icon: 'fas fa-file-alt nav-icon',
    path: '/client-jobs',
  },
  {
    name: i18n.t('menusidebar.label.upload'),
    icon: 'fas fa-upload nav-icon',
    path: '/intake',
  },
];
export const EMPLOYEE_MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.employeesjobs'),
    icon: 'fas fa-file-alt nav-icon',
    path: '/employee-jobs',
  },
];

const MenuSidebar = () => {
  const user = useSelector(() => store.getState().auth);
  const sidebarSkin = useSelector((state: IRootState) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector(
    (state: IRootState) => state.ui.menuItemFlat,
  );
  const menuChildIndent = useSelector(
    (state: IRootState) => state.ui.menuChildIndent,
  );

  function getMenuItems() {
    if (!user) return [];

    let menu: IMenuItem[];
    switch (user?.roleName?.toUpperCase()) {
      case 'ADMIN':
        menu = ADMIN_MENU;
        break;
      case 'EMPLOYEE':
        menu = EMPLOYEE_MENU;
        break;
      case 'CLIENT':
        menu = CLIENT_MENU;
        break;
      default:
        menu = [];
    }

    return menu;
  }

  const MENU: IMenuItem[] = getMenuItems();

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <img src="/img/logo.png" alt="Max Trans" height={40} />
        <span className="brand-text font-weight-light pl-3"></span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2" style={{ overflowY: 'hidden' }}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
