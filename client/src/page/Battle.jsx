import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../styles'
import { Alert, PlayerInfo, ActionButton, GameInfo, Card } from '../components'
import { useGlobalContext } from '../context'
import { attack, attackSound, battlegrounds, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets'
import { playAudio } from "../utils/animation.js"
const Battle = () => {
    const navigate = useNavigate()
    const { battleName } = useParams();
    const { contract, gameData, showAlert, walletAddress, setShowAlert, setBattleGround, battleGround, errorMessage, setErrorMessage, player2Ref, player1Ref } = useGlobalContext()
    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});
    useEffect(() => {
        const getPlayerInfo = async () => {
            try {
                let player01Address = null;
                let player02Address = null;

                if (gameData.activeBattle.players[0].toLowerCase() === walletAddress.toLowerCase()) {
                    player01Address = gameData.activeBattle.players[0];
                    player02Address = gameData.activeBattle.players[1];
                } else {
                    player01Address = gameData.activeBattle.players[1];
                    player02Address = gameData.activeBattle.players[0];
                }

                const p1TokenData = await contract.getPlayerToken(player01Address);
                const player01 = await contract.getPlayer(player01Address);
                const player02 = await contract.getPlayer(player02Address);

                const p1Attack = p1TokenData.attackStrength.toNumber();
                const p1Defence = p1TokenData.defenseStrength.toNumber();
                const p1H = player01.playerHealth.toNumber();
                const p1M = player01.playerMana.toNumber();
                const p2H = player02.playerHealth.toNumber();
                const p2M = player02.playerMana.toNumber();

                setPlayer1({ ...player01, att: p1Attack, def: p1Defence, health: p1H, mana: p1M });
                setPlayer2({ ...player02, att: 'X', def: 'X', health: p2H, mana: p2M }); //x is because we dont know attack and defence strength of opponent
            } catch (error) {
                setErrorMessage(error)
            }
        };

        if (contract && gameData.activeBattle) getPlayerInfo();
    }, [contract, gameData, battleName]);

    //battle exit then riderect to home page
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!gameData?.activeBattle) navigate('/')

        }, [10])
        return () => clearTimeout(timer) //for sake of memmory leak
    }, [])
    const makeAmove = async (choice) => {
        playAudio(choice == 1 ? attackSound : defenseSound)
        try {
            await contract.attackOrDefendChoice(choice, battleName)
            setShowAlert({
                status: true,
                type: 'info',
                message: `initiating ${choice === 1 ? 'attack' : 'defense'}`
            })
        } catch (error) {
            setErrorMessage(error)
        }
    }
    return (
        <div className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}>
            {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}
            <PlayerInfo player={player2} playerIcon={player02Icon} mt />

            <div className={`${styles.flexCenter} flex-col my-10`}>
                <Card
                    card={player2}
                    title={player2?.playerName}
                    cardRef={player2Ref}
                    playerTwo
                />
                <div className="flex items-center flex-row">
                    <ActionButton
                        imgUrl={attack}
                        handleClick={() => { makeAmove(1) }}
                        restStyles="mr-2 hover:border-yellow-400"
                    />
                    <Card
                        card={player1}
                        title={player1?.playerName}
                        cardRef={player1Ref}
                        restStyles="mt-3"
                    />

                    <ActionButton
                        imgUrl={defense}
                        handleClick={() => { makeAmove(2) }}
                        restStyles="ml-6 hover:border-red-600"
                    />
                </div>
            </div>
            <PlayerInfo player={player1} playerIcon={player01Icon} mt />
            <GameInfo />
        </div>
    )
}

export default Battle