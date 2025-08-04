/**
 * This example shows how to use useAxiosSecure hook to make secure API requests.
 * It uses axios to create a secure instance that automatically adds the user's access token to the request headers.
 * It also handles unauthorized access and role-based access control.
 * You can use this hook in any component to make secure API requests.
 * You don't need to manually add the access token to every request.
 * Use this hook on private routes or when you need to make secure API requests.
 */

import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../template/src/hooks/useAxiosSecure';
import useAuth from '../../template/src/hooks/useAuth';
import { useQuery } from "@tanstack/react-query";

const AxiosPrivateGuide = () => {

    /**
     * suppose you need to make an API request which returns user profile details
     * you should make this API request using useAxiosSecure hook.
     * otherwise anyone with the API endpoint can access the data.
     *  - example endpoint: /user/profile
     */

    const axiosSecure = useAxiosSecure();

    /**
     * you can get the user profile data by using normal axios get method with state management and useEffect.
     * or you can also use react-query to manage the data fetching and caching.
     */


    // get the user using useAuth hook
    const { user } = useAuth();





    /**
     *  Approach 1- Using react query (Best approach for fetching and caching)
     *  step 1- import useQuery function
     *     - this function gives you a lot of things, like data, isPending, isLoading, isError, onError etc and takes some parameters like key, function etc
     *  step 2- set a query key (an unique name identifier "string" and the object which which is the dependent of this request)
     *     - in my case, its user. i am using user email from the user object
     *  step 3- enabled: !!user means when user is true, so this function only executes when user is true
     *  step 4- queryFn: this should be an async function, and in this function i am calling the axios secure hook for a get request and returning the data
     * 
     * -- as you can see i have destructured data and isLoading from the useQuery. The value which returns from the queryFn, stores in the data which i have already destructured
     * 
     */

    const { data: userProfile = {}, isLoading, isError } = useQuery({
        queryKey: ['user-profile-data', user],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(`https://example_url/user/profile/${user?.email}`);
            return res.data
        }
    });





    /**
     *  Approach 2: Use useEffect
     *  
     * useEffect is a react hook to avoid side effects and more
     * lets see how can we use useEffect to fetch the user data using axiosSecure
     * 
     * step 1- create state to store user data
     * step 2- call useEffect. inside of it create another function which will eventually call the API
     * step 3- store the data in the state
     * **IMPORTANT** (DON'T LEAVE THE DEPENDENCY ARRAY EMPTY. OBVIOUSLY USE THE DEPENDENT) otherwise it will create infinity loop
     * 
     */

    const [userProfileData, setUserProfileData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axiosSecure.get(`https://example_url/user/profile/${user?.email}`);
                setUserProfileData(res.data);
            } catch (err) {
                console.error('Error fetching user data (useState/useEffect):', err);
            }
        };

        if (user?.email) {
            fetchUserData();
        }
    }, [user, axiosSecure])


    return (
        <div>
            {JSON.stringify(userProfile)}
            {JSON.stringify(userProfileData)}
        </div>
    );
};

export default AxiosPrivateGuide;