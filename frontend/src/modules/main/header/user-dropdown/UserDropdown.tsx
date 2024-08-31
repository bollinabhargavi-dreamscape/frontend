import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setAuthentication } from '@app/store/reducers/auth';
import { StyledBigUserImage, StyledSmallUserImage } from '@app/styles/common';
import {
  UserFooter,
  UserHeader,
  UserMenuDropdown,
} from '@app/styles/dropdown-menus';
import store from '../../../../store/store';
import { IUser } from '../../../../store/Models/User';

const UserDropdown = () => {
  const navigate = useNavigate();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const authentication = useSelector(() => store.getState()?.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // eslint-disable-next-line no-undef
  const logOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDropdownOpen(false);
    const user = {} as IUser;
    dispatch(setAuthentication(user));
    navigate('/login');
    localStorage.removeItem('authentication');
  };

  // eslint-disable-next-line no-undef
  const navigateToProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate('/profile');
  };

  const RoleName: string =
    useSelector(() => store.getState()?.auth?.roleName) ?? '';

  return (
    <UserMenuDropdown isOpen={dropdownOpen} hideArrow>
      <StyledSmallUserImage
        slot="head"
        fallbackSrc="/img/default-profile.png"
        alt="User"
        width={25}
        height={25}
        rounded
      />
      <div slot="body">
        <UserHeader className=" bg-primary">
          <StyledBigUserImage
            fallbackSrc="/img/default-profile.png"
            alt="User"
            width={90}
            height={90}
            rounded
          />
          <p>
            {authentication.email} ({authentication.roleName})
          </p>
        </UserHeader>
        <UserFooter>
          {RoleName === 'Client' && (
            <button
              type="button"
              className="btn btn-default btn-flat"
              onClick={navigateToProfile}
            >
              {t('header.user.profile')}
            </button>
          )}
          <button
            type="button"
            className="btn btn-default btn-flat float-right"
            onClick={logOut}
          >
            {t('login.button.signOut')}
          </button>
        </UserFooter>
      </div>
    </UserMenuDropdown>
  );
};

export default UserDropdown;
