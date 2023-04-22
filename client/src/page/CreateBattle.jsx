import React, { useEffect, useState } from 'react';
import styles from '../styles';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { CustomInput, PageHOC, RegisterButton, GameLoad } from '../components';
const CreateBattle = () => {
    const navigate = useNavigate()
    const { battleName, setBallteName, contract, gameData, setErrorMessage } = useGlobalContext()
    const [waitBattle, setWaitBattle] = useState(false)

    useEffect(() => {
        if (gameData?.activeBattle?.battleStatus === 1) {
            navigate(`/battle/${gameData.activeBattle.name}`)
        }
        if (gameData?.activeBattle?.battleStatus === 0) {
            setWaitBattle(true)
        }
    }, [gameData])
    const handleClick = async () => {
        if (!battleName || !battleName.trim()) return null
        try {

            await contract.createBattle(battleName)
            setWaitBattle(true)
        } catch (error) {
            setErrorMessage(error)
        }
    }
    return (
        <>
            {waitBattle && <GameLoad />}
            <div className="flex flex-col mb-5">
                <CustomInput
                    label="Battle"
                    placeHolder="Enter battle name"
                    value={battleName}
                    handleValueChange={setBallteName}
                />
                <RegisterButton
                    title="Create Battle"
                    handleClick={handleClick}
                    restStyles="mt-6"
                >
                </RegisterButton>
            </div>
            <p className={styles.infoText} onClick={() => navigate('/JoinBattle')}>
                Or join already existing battles
            </p>

        </>
    )
};

export default PageHOC(
    CreateBattle,
    <>Create<br /> a New Battle</>,
    <>Create your own battle,<br />and let other people to join</>
);