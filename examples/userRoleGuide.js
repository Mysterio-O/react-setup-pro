/**
 * useUserRole is a custom hook which returns the current user status in the database
 * see how to use it
 * 
 *  - Open the hook from hooks
 *  - adjust your API here const "res = await axiosSecure.get(`/user/${user?.email}/role`)" 
 *  - adjust the response path which are coming from the server "return res.data?.role"
 * 
 *  Now you are all set to use this hook
 * 
 */


import React from 'react';
import useUserRole from '../template/src/hooks/useUserRole';

const UserRoleGuide = () => {

    const {role, role_loading}=useUserRole(); // calling the hook

    /**
     *  console log role and role_loading to see the value of these properties
     *  role contain the user role which is user by default and role_loading returns if the role getting API call is still in process or not
     */

    return (
        <div>
            this user is a {role} 
            {/* this prints the user role */}
        </div>
    );
};

export default UserRoleGuide;