/**
 *  in Pages, you will find  a folder named Scroll
 *  this is a very useful and easy to use function component 
 * 
 * in development phase, many component or page opens with no proper view, like show the bottom part of the component initially
 * 
 * use the Scroll component at the root layout to avoid this. after using it, every component or page will open and it will instantly scroll to top and increase the user experience
 * 
 */

import React from 'react';
import Scroll from '../template/src/pages/Scroll/Scroll'; // adjust with your path

/**
 * 
 * suppose this example component is showing the bottom part when renders for the first ime
 *  just call the Scroll component at the top
 * this will mount the page and the view of the page will be at the top
 */

const Example = () => {
    return (
        <div>
            <Scroll/>
            <div>
                {/* your code, components */}
            </div>
        </div>
    );
};

export default Example;