import React, { useEffect, useState } from 'react';
import { PageHOC, CustomInput, RegisterButton } from '../components';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  const { contract, walletAddress, setShowAlert, gameData, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('')

  const handleClick = async () => {
    if(!walletAddress){
      setShowAlert({
        status: true,
        type: 'info',
        message: 'Connect your wallet',
      });
      return null
    }
    if (!playerName) {
      setShowAlert({
        status: true,
        type: 'info',
        message: 'Enter Player name',
      });
      return null
    }
    try {
      const playerExists = await contract.isPlayer(walletAddress);
      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 });

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being successfully Registered!`,
        });

      }
    } catch (error) {
      setErrorMessage(error)
    }
  }
  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress)
      const playerTokenExists = await contract.isPlayerToken(walletAddress)
      if (playerExists && playerTokenExists) navigate('/createbattle')
    }
    if (contract) createPlayerToken()
  }, [contract])
  useEffect(() => {
    if (gameData.activeBattles) {
      navigate(`/battle/${gameData.activeBattles.name}`)
    }
  }, [gameData])
  return (
    <div>
      <div className='flex flex-col'>
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
        />
      </div>
      <RegisterButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6 hover:bg-blue-700"
      />
    </div>
  )
};

export default PageHOC(
  Home,
  <>Enter the World of NFT Battles with Your Token</>,
  <>Connect Your Wallet and Unleash the Power in<br /> the ultimate Battle Card Game</>
);