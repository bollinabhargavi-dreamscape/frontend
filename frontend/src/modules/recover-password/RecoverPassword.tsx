import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  isTimestampValidAndCompare,
  IsValidString,
  setWindowClass,
} from '@app/utils/helpers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, InputGroup } from 'react-bootstrap';
import { Button } from '@app/styles/common';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Adjust import based on your routing library
import { resetPasswordAPI } from '@app/utils/oidc-providers';

interface resetPassword {
  username: string;
  password: string;
  passwordRetype: string;
}

const useHasQueryParams = (): boolean => {
  const location = useLocation();
  return new URLSearchParams(location.search)?.toString?.()?.length > 0;
};

const RecoverPassword = () => {
  const [t] = useTranslation();
  const [isAuthLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();
  const hasQueryParams = useHasQueryParams();

  useEffect(() => {
    if (hasQueryParams) {
      const queryString = location?.search ?? '';
      const params = new URLSearchParams(queryString);
      const queryObject: Record<string, string> = Object.fromEntries(
        params.entries(),
      );
      const checkExpiresAt: boolean = isTimestampValidAndCompare(
        queryObject.expiresAt,
      );
      if (!checkExpiresAt || !IsValidString(queryObject?.username)) {
        toast.error('Password reset link expired, please try again!');
        navigate('/forgot-password');
      }
      values.username = queryObject?.username;
      navigate({ search: '' }, { replace: true }); // Use `replace` to avoid adding to history stack
    }
  }, [hasQueryParams]);

  const resetPasswordSubmit = async (values: resetPassword) => {
    try {
      setAuthLoading(true);
      const { username, password } = values;
      const response = await resetPasswordAPI(username, password);
      if (response.isSuccess) {
        toast.success('Password reset successful. Please log in.');
        navigate('/login');
      } else {
        console.log('Password reset failed', response);
        toast.error('Password reset failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Password reset failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: '',
      passwordRetype: '',
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email('Invalid username address')
        .required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      passwordRetype: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match.')
        .required('Password retype is a required field'),
    }),
    onSubmit: (values: resetPassword) => {
      resetPasswordSubmit(values);
    },
  });

  setWindowClass('hold-transition login-page');
  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h1">
            <b>MaxTrans</b>
            {/* <span>LTE</span> */}
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('recover.oneStepAway')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="username"
                  name="username"
                  type="email"
                  placeholder="username"
                  onChange={handleChange}
                  value={values.username}
                  disabled={true}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="passwordRetype"
                  name="passwordRetype"
                  type="password"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  value={values.passwordRetype}
                  isValid={touched.passwordRetype && !errors.passwordRetype}
                  isInvalid={touched.passwordRetype && !!errors.passwordRetype}
                  tabIndex={15}
                />
                {touched.passwordRetype && errors.passwordRetype ? (
                  <div
                    className="position-absolute top-100 start-0 text-danger small"
                    style={{ marginTop: '2.30rem' }}
                  >
                    {errors.passwordRetype}
                  </div>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-lock" />
                    </InputGroup.Text>
                  </InputGroup.Append>
                )}
              </InputGroup>
            </div>
            <div className="row">
              <div className="col-12">
                <Button
                  loading={isAuthLoading}
                  disabled={false}
                  onClick={handleSubmit as any}
                >
                  {t('recover.changePassword')}
                </Button>
              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <Link to="/login">{t('login.button.signIn.label')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
