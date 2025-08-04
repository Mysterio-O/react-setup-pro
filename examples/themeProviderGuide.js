/**
 *  I have already wrapped the whole application in the theme provider
 *  You need to do a very minimal job to use this
 * 
 *  Go to shared component in the src folder. there you will find a ThemeSwitch button component. Feel free to use that or you can also customize that as your preference
 * 
 * Use daisyUi dark class to control dark mode color and other
 */

import React from 'react';
import ThemeSwitch from '../template/src/shared/ThemeSwitch'; // adjust with you path

const themeProviderGuide = () => {
    const links = [
        { name: 'home' },
        { name: 'about' },
        { name: 'login' }
    ]
    return (
        <div>
            <nav>
                <ul>
                    {
                        links.map(l => <li>{l.name}</li>)
                    }
                </ul>
                <ThemeSwitch />
                {/* this is how you can easily add theme toggle switch */}
            </nav>
        </div>
    );
};

export default themeProviderGuide;