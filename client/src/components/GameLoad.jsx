import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { player01, player02 } from '../assets'
import RegisterButton from './RegisterButton'
import styles from '../styles'
import { useGlobalContext } from '../context'

const GameLoad = () => {
    const { walletAddress } = useGlobalContext()
    const navigate = useNavigate()

    return (
        <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
            <div className={styles.gameLoadBtnBox} >
                <RegisterButton
                    title="Choose Battleground"
                    handleClick={() => navigate('/battleground')}
                    restStyles="mt-6"
                ></RegisterButton>
            </div>
            <div className={`flex-1 ${styles.flexCenter} flex-col`}>
                <h1 className={`${styles.headText} text-center`}>
                    Waiting for a <br /> worthy opponent...
                </h1>
                <p className={styles.gameLoadText}>
                    Protip: while you're waiting, choose your preferred battleground
                </p>
                <div className={styles.gameLoadPlayersBox}>
                    <div className={`${styles.flexCenter} flex-col`}>
                        <img src={player01} className={styles.gameLoadPlayerImg} />
                        <p className={styles.gameLoadPlayerText}>
                            {walletAddress.slice(0, 30)}
                        </p>
                    </div>
                </div>
                <h2 className={styles.gameLoadVS}>Vs</h2>

                <div className={`${styles.flexCenter} flex-col`}>
                    <img src={player02} className={styles.gameLoadPlayerImg} />
                    <p className={styles.gameLoadPlayerText}>Waiting for other to join...</p>
                </div>
            </div>

        </div>
    )
}

export default GameLoad