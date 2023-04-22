import React, { useEffect, useState } from 'react';
import styles from '../styles';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { CustomInput, PageHOC, RegisterButton } from '../components';
const JoinBattle = () => {
    const { contract, gameData, showAlert, walletAddress, setBallteName, setErrorMessage } = useGlobalContext();
    const navigate = useNavigate()

    const handleClick = async (battleName) => {
        setBallteName(battleName)
        try {
            await contract.joinBattle(battleName)
            showAlert({ status: true, type: "success", message: `Joining ${battleName}` })
        } catch (error) {
            setErrorMessage(error)
        }
    }
    return (
        <>
            <h2 className={styles.joinHeadText}>Available Battles:</h2>
            <div className={styles.joinContainer}>
                {gameData.pendingBattles.length ?
                    gameData.pendingBattles.filter((battle) =>
                        !battle.players.includes(walletAddress))
                        .map((battle, index) => (
                            <div key={battle.name + index} className={styles.flexBetween}>
                                <p className={styles.joinBattleTitle}>
                                    
                                    {
                                        index + 1
                                    }.
                                    {
                                        battle.name
                                    }
                                </p>
                                <RegisterButton
                                    title="join"
                                    handleClick={() => handleClick(battle.name)}
                                ></RegisterButton>
                            </div>
                        ))

                    : <p className={styles.joinLoading}> Reload the page to see new Battles</p>
                }
            </div>
            <p className={styles.infoText} onClick={() => navigate('/createbattle')}>
                Or create a new battle
            </p>
        </>
    )
}

export default PageHOC(
    JoinBattle,
    <>Join <br /> a Battle</>,
    <>Join already existing battles</>,
)