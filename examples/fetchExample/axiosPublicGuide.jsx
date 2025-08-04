
/**
 * This example demonstrates how to use Axios to fetch data from a public API.
 *  A base url is already there in that hook. so you won't need to write it again and again.
 *  You can use this hook to make requests to any public API. (which are not protected by authentication)
 */

import React from 'react';
import useAxiosPublic from '../../template/src/hooks/useAxiosPublic';

const axiosPublicGuide = () => {

    /**
     *  suppose you need to fetch all post data which you want to show in the home page which is not protected by authentication.
     *  just call the hook.
     *  change the base url in the hook to your public API base URL.
     */

    const axiosPublic = useAxiosPublic(); // called the hook to use it in the component

    // either you can use manual state management or you can use tanstack query to fetch data. i will show both methods here.

    return (
        <div>
            
        </div>
    );
};

export default axiosPublicGuide;