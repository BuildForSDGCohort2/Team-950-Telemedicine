// eslint-disable-next-line
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'



export default function ResetPasswordComponent(props) {

    const [formData, setFormData] = useState({password: '', password_confirmation: '' })
    const [errors, setErrors] = useState({ password: true, password_confirmation: true, })

    const [form_submitted, setFormSubmitted] = useState(false)

    const options = { handleInputData, form_submitted, type: 'password' }

    function handleSubmit(event) {

        event.preventDefault()
        setFormSubmitted(form_submitted => form_submitted = true)

        if (errors.password || errors.password_confirmation) {
            event.stopPropagation(); return;
        }

        const location = {
            pathname: '/login',
            state: { fromResetPassword: true, message: "Your password has been reset! You can Login" }
        }
        props.history.push(location)
    }

    function handleInputData(data) {
        setFormData(formData => ({ ...formData, ...data.data }))
        setErrors(errors => ({ ...errors, ...data.errors }))
    }

    return (
      <div className="container mt-5 py-5">
        {/* {props.location.state && props.location.state.fromForgetPassword &&
                        // <Alert dismissible variant="info">
                        //   <Alert.Heading>Success</Alert.Heading>
                        //      {props.location.state.message}
                        // </Alert>
                } */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 card py-4 px-3">
            <h4 className="text-center">Reset Password</h4>
            <form
              className="form-horizontal"
              noValidate={true}
              onSubmit={handleSubmit}
            >
              {/* <PasswordField
                value={formData.password}
                {...options}
                conditions={"min:8|max:50"}
                confirm={formData.password_confirmation}
              />
              <Input
                name="password_confirmation"
                value={formData.password_confirmation}
                {...options}
                conditions={"required|min:8|max:50"}
              /> */}
              <button type="submit" variant="primary" block>Reset password</button>
            </form>
            <p className="mt-3">
              <Link to="/forgot-password">Go back</Link>
            </p>
          </div>
        </div>
      </div>
    );
}
