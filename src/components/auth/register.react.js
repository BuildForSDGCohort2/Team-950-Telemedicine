import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { string, object, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers';

import AuthService from './auth.service';

const schema = object().shape({
  name: string().required().min(3).max(50),
  email: string().required().email(),
  password: string().required().min(8),
  password_confirmation: string().required('Please confirm your password')
                                .oneOf([ref('password'), null], "Passwords don't match")
});


export default function RegisterComponent() {

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });


  const history = useHistory();

  const dashboard = {
    pathname: `/dashboard`,
    state: {
      fromRegister: true,
      message: 'Account creation was successful.',
    },
  };

  const onSubmit = async (formdata) => {
    const auth = new AuthService();
    console.log(formdata);
    try {
      const { data } = (await auth.register(formdata)).data;
      auth.storeToken(data.token);
      history.push(dashboard);
    } catch (error) {
      const { status, data: errorData } = error.response;
      console.log(status);
      console.log(errorData);
    }
  };

  return (
    <div className={'container mt-3 py-5'}>
      <div className={'row justify-content-center'}>
        <div className="col-12 col-md-6 col-lg-4 card px-3 py-4">
          <div>
            <h4 className={'text-center'}>Sign up</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="name" ref={register} />
            <p>{errors.name?.message}</p>

            <input type="email" name="email" ref={register} />
            <p>{errors.name?.message}</p>

            <input type="password" name="password" ref={register} />
            <p>{errors.password?.message}</p>

            <input type="password" name="password_confirmation" ref={register} />
            <p>{errors.password_confirmation?.message}</p>

            <input type="submit" />
          </form>
          <p>
            Already have an account? <Link to={'/login'}>Sign in</Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
