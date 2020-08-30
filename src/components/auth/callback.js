import React, { useEffect }  from 'react'

// a callback url should be set on your auth0 dashboard

export default function Callback(props){

  const {auth, location} = props;

  useEffect(() => {

    if(/access_token|id_token|error/.test(location.hash)){

        auth.handleAuthentication()
    } else {
      throw new Error('invalid callback url')
    }

  })

  // ought to be component did mount equivalent

    return(
       <>
        <div>
          Loading ....
        </div>
       </>
    );
}
