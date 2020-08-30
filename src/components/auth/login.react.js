import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { string, object } from 'yup';
import { yupResolver } from '@hookform/resolvers';

import AuthService from './auth.service';

const schema = object().shape({
  email: string().required().email(),
  password: string().required().min(8),
});

/**
 * The Login component
 * @See the Register component for more details
 * @param {*} props
 */
export default function LoginComponent() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const location = {
    pathname: `/dashboard`,
    state: {
      fromLogin: true,
      message: 'Welcome.',
    },
  };

  const onSubmit = async (data) => {
    const auth = new AuthService();
    try {
      await auth.login(data);
      this.storeToken(data);
      this.history.push(location);
      return;
    } catch (error) {
      console.error(error.response);
      return error;
    }
  };

  return (
    <div className={'container py-5 my-3'} id="main">
      <div className={'row justify-content-center'}>
        <div className={'col-12 col-md-6 col-lg-4 card px-3 py-4'}>
          <div className={'text-center'}>
            <h4>Sign in</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" name="email" ref={register} />
            <p>{errors.email?.message}</p>

            <input type="password" name="password" ref={register} />
            <p>{errors.password?.message}</p>

            <input type="submit" />
          </form>
          <div className={'row'}>
            <div className={'col-6'}>
              <p>
                <Link to={'/forgot-password'}>Forgot password?</Link>
              </p>
            </div>
            <div className={'col-6 text-right'}>
              <p>
                <Link to={'/register'}>Yet to register?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
