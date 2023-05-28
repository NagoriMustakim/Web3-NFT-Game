import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { logo } from '../assets';
import styles from '../styles'
import Alert from './Alert';
import background from '../assets/background/background.mp4'
const PageHOC = (Component, title, description) => () => {
    const navigate = useNavigate();
    const { showAlert } = useGlobalContext()
    return (
        <div>
            <video autoPlay loop className="absolute z-10 w-auto min-w-full min-h-full max-w-none">
                <source src={background} typeof='video/mp4' />
            </video>
            {
                showAlert?.status && <Alert type={showAlert?.type} message={showAlert?.message}></Alert>
            }
            <div className={`${styles.hocContentBox} ${styles.hocvideooverlay}`}>
                <img src={logo} alt="logo" className={styles.hocLogo} onClick={() => navigate('/')} />

                <div className={styles.hocBodyWrapper}>
                    <div className="flex flex-row w-full">
                        <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
                    </div>

                    <p className={`${styles.normalText} my-10`}>{description}</p>

                    <Component />
                </div>
                <div>
                <a href='https://mustakim.vercel.app/' className={styles.footerText}>Made with 💚 by Nagori Mustakim</a>
                </div>
            </div>
        </div >



    );
};

export default PageHOC;