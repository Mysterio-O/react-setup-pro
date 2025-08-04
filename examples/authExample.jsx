/**
 *  Managing authentication is a big deal. here i have made handling authentication simpler.
 * 
 *  use useAuth custom hook to manage authentication state. this hook calls authContext and returns the authInfo.
 *  you can use this hook in any component to access the authentication state.
 */

import React from 'react';

const authExample = () => {

    /**
     *  suppose you need user info with auth loading state, just use useAuth hook and destructure the values.
     *  check /providers/AuthProvider.jsx for more details.
     */

    const { user, loading, createUser, loginUser, setUserProfile, userLogOut, deleteUserFirebase } = useAuth();

    // this is how you can use the hook and get your preferred information or functions without calling auth context directly.

    return (
        <div>
            
        </div>
    );
};

export default authExample;
