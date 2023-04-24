import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
//import styles from './webpage.module.css'
import styles from './webpage.module.css'
import Logo from "@/AR-Logo"

import Image from 'next/image';
import Link from 'next/link';

import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa'

import { Footer as FooterText} from '@/text/data.js';

export default function Footer(props) {

    return (
        <footer>
            <div className={`${styles['footer-top-wrapper']}`}>
                <div className={`${styles['footer-section']} ${styles['first-section']}`}>
                    <h4>{FooterText.Top.FirstSection.h4}</h4>
                    <p>{FooterText.Top.FirstSection.p}</p>
                    <div className={`${styles['footer-section-icon-wrapper']}`}>
                        <div className={`${styles['footer-section-icon']}`}><FaLinkedinIn size={'1.25em'} color={'#fff'}/></div>
                        <div className={`${styles['footer-section-icon']}`}><FaFacebookF  size={'1.25em'} color={'#fff'}/></div>
                        <div className={`${styles['footer-section-icon']}`}><FaInstagram  size={'1.25em'} color={'#fff'}/></div>
                        <div className={`${styles['footer-section-icon']}`}><FaYoutube  size={'1.25em'} color={'#fff'}/></div> 
                    </div>   
                </div>
                <div className={`${styles['footer-section']} ${styles['second-section']}`}> 
                    <h4>{FooterText.Top.SecondSection.h4}</h4>
                    <p>{FooterText.Top.SecondSection.p}</p>
                    <button>{FooterText.Top.SecondSection.button}</button>
                </div>
                <div className={`${styles['footer-section']} ${styles['third-section']}`}>
                    <h4>{FooterText.Top.ThirdSection.h4}</h4>
                    <div className={`${styles['footer-section-list-box']}`}>
                    {FooterText.Top.ThirdSection.QuickLinks.map((element, index) => {
                        return (
                            <li key={`footer-li-${index}`}><a key={`element-${index}`} href={element.link}>{element.name}</a></li>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className={`${styles['footer-bottom-wrapper']}`}>
                <div className={`footer-flow ${styles['footer-bottom-content']}`}>
                    <div className="flex">&nbsp; {FooterText.Bottom.TermCondition} &nbsp;</div> | 
                    <div className="flex">&nbsp; {FooterText.Bottom.PrivacyPolicy} &nbsp;</div> | 
                    <div className="flex">&nbsp; {FooterText.Bottom.Year}{FooterText.Bottom.SoundscapeText}</div>
                </div>
                <div className={`${styles['footer-bottom-content']}`}>
                    <p>
                        {FooterText.Bottom.An}
                        <Link href="https://new.rcos.io/" style={{textDecoration: 'none', color: 'red'/*'#4a88e8'*/}}>
                            {FooterText.Bottom.RCOS}
                        </Link>
                        {FooterText.Bottom.Project}
                    </p>
                </div>
            </div>
        </footer>
    );
}


