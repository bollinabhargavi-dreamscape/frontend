import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setWindowClass } from '@app/utils/helpers';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { forgotPasswordAPI } from '@app/utils/oidc-providers';
import { useState } from 'react';
import { Button } from '@app/styles/common';

const ForgotPassword = () => {
  const [t] = useTranslation();
  const [isAuthLoading, setAuthLoading] = useState(false);
  const forgotPassword = async (username: string) => {
    try {
      setAuthLoading(true);
      const response: any = await forgotPasswordAPI(username);
      if (response?.isSuccess) {
        toast.success(
          'Sent Password Reset Link to your username, please check',
        );
      } else {
        console.log('Forgot password failure', response);
        toast.error('Unable to process your username. Please try again.');
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          'Unable to process your username. Please try again.',
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email('Invalid username address')
        .required('Required'),
    }),
    onSubmit: (values: { username: string }) => {
      forgotPassword(values.username);
    },
  });

  setWindowClass('hold-transition login-page');

  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <Link to="/" className="h3">
            <b>Forgot Password</b>
            {/* <span>Forgot Password</span> */}
          </Link>
        </div>
        <div className="card-body">
          <p className="login-box-msg">{t('recover.forgotYourPassword')}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <InputGroup className="mb-3">
                <Form.Control
                  id="username"
                  name="username"
                  type="email"
                  placeholder="Username"
                  onChange={handleChange}
                  value={values.username}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                {touched.username && errors.username ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                ) : (
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <i className="fas fa-envelope" />
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
                  <i>{t('recover.resetPasswordLink')}</i>
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

export default ForgotPassword;
