import React, {useState} from 'react'
import {Link} from 'react-router-dom'


export default function ForgotPasswordComponent(props) {


    const [formData, setFormData] = useState({email: ''})
    const [errors, setErrors] = useState({email: true})
    const [form_submitted, setFormSubmitted] = useState(false)
    const options = {handleInputData, form_submitted, name: 'email', type: 'email', conditions: 'required|email'}

    function handleInputData(data){
      setFormData(formData => ({ ...formData, ...data.data }))
      setErrors(errors => ({ ...errors, ...data.errors }))
    }

    function handleSubmit(event){

      event.preventDefault()
      setFormSubmitted(form_submitted => form_submitted = true)

      if (errors.email) {
        event.stopPropagation(); return;
      }

      const location = {
        pathname: '/reset-password',
        state: { fromForgetPassword: true, message: "A reset link has been sent to your mail" }
      }
      props.history.push(location)

    }

    return (
      <section className="mt-5 py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5 card px-3 py-4">
              <div>
                <h5 className="text-center mb-3">
                  Get password reset link
                </h5>
              </div>
              <form className="" onSubmit={handleSubmit} noValidate={true}>
                {/* <Input value={formData.email} {...options} /> */}
                <button type="submit" variant="success" block>Get Reset Link</button>
              </form>
              <p className="mt-3">
                <Link to="/login">Go back to Login page</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );

}
