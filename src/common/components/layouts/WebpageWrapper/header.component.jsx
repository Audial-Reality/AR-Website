import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import styles from './webpage.module.css'
import Logo from "@/AR-Logo"

import Image from 'next/image';
import Link from 'next/link';

import { Header as HeaderText } from '@/text/data.js';
import DropDownMenu from 'src/common/components/DropDownMenu/DropDownMenu'

const HeaderComponent = (props) => {
    return (
        <header className="flex flex-row">

            <div className="flex flex-center fit-content header-logo-container"> 
                <Image loading="lazy" src={Logo} alt="Audio Reality Logo" /> 
            </div>
            <div className={`flex fill-horizontal flow-row justify-end ${styles['header-link-container']}`}>
                {HeaderText.buttons.map((element, index) => {
                    return (
                        /* DEV-TASK [Easy-Medium]: Make the Sign In | Sign Up Its own button with a clean minimalistic animation */
                        /* DEV-TASK [Hard-Diffiucult]: Make drop down menus compatible with the following code. 
                            Another loop and sub arrays will be needed for this to be acheived */
                        <Link className="flex flex-center" key={"Header-Element-" + index} href={element.link}>
                            {element.title}
                        </Link>
                    );
                })}
                <Link className={`flex flex-center ${styles['header-signup-button']}`} href={HeaderText.join_us_button.link}>
                    {HeaderText.join_us_button.title}
                </Link>
               

            <div>
            <DropDownMenu/>
            </div>

               <Link className={`flex flex-center ${/*styles['header-signup-button']*/""}`} href={HeaderText.join_us_button.link}>
                    {HeaderText.join_us_button.title}
               </Link>

            </div>
        </header>
    );
}
export default HeaderComponent;