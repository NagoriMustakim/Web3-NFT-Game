import React, { useEffect, useState } from 'react';
import { PageHOC, CustomInput, RegisterButton, Alert } from '../components';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState('')

  const handleClick = async () => {
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
      setShowAlert({
        status: true,
        type: 'failure',
        message: "Something went wrong",
      });
    }
  }
  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress)
      const playerTokenExists = await contract.isPlayerToken(walletAddress)
      if (playerExists && playerTokenExists) navigate('/createbattle')
    }
    if(contract) createPlayerToken()
  }, [contract])
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
  <>Welcome to AVAX Gods <br /> a Web3 NFT Card Game</>,
  <>Connect your wallet to start the Game <br /> the ultimate Battle Card Game</>
);