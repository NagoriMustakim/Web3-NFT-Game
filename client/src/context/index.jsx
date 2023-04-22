import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';
import { ABI, ADDRESS } from '../contract';
import { createEventListeners } from './EventListner';
import { GetParams } from '../utils/onboard';
const GlobalContext = createContext();//is used because this is the value this we are going to share with each and every components
export const GlobalContextProvider = ({ children }) => {
    const navigate = useNavigate()
    //interact and connect with smart contract
    const [walletAddress, setWalletAddress] = useState('')
    const [contract, setContract] = useState('');
    const [provider, setProvider] = useState('');
    const [battleName, setBallteName] = useState('')
    const [updateGameData, setUpdateGameData] = useState(0)
    const [step, setStep] = useState(1)
    const [battleGround, setBattleGround] = useState('bg-astral')
    const [gameData, setGameData] = useState({ players: [], pendingBattles: [], activeBattle: null })
    const [showAlert, setShowAlert] = useState({ status: false, type: 'info', message: '' })
    const [errorMessage, setErrorMessage] = useState('')

    const player1Ref = useRef()
    const player2Ref = useRef()
    //* Set the wallet address to the state
    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts) setWalletAddress(accounts[0])
    }
    useEffect(() => {
        updateCurrentWalletAddress()
        window.ethereum.on('accountsChanged', updateCurrentWalletAddress)
    }, [])


    //* Set battleground to local storage
    useEffect(() => {
        const isBattleground = localStorage.getItem('battleground');

        if (isBattleground) {
            setBattleGround(isBattleground);
        } else {
            localStorage.setItem('battleground', battleGround);
        }
    }, []);

    //* Set the smart contract and provider to the state
    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3Modal = new Web3Modal();
            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            const newContract = new ethers.Contract(ADDRESS, ABI, signer);
            setProvider(provider);
            setContract(newContract);
        };

        setSmartContractAndProvider();

    }, []);

    //* alert box
    useEffect(() => {
        if (showAlert?.status) {
            const timer = setTimeout(() => {
                setShowAlert({ status: false, type: 'info', message: '' });

            }, [5000]);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    //* handle errors
    useEffect(() => {
        if (errorMessage) {
            const parsedErrorMessage = errorMessage?.reason?.slice('execution reverted: '.length).slice(0, -1);

            if (parsedErrorMessage) {
                setShowAlert({
                    status: true,
                    type: 'failure',
                    message: parsedErrorMessage,
                });
            }
        }
    }, [errorMessage])
    //* set game data to the state
    useEffect(() => {
        const fetchGameData = async () => {
            if (contract) {
                const fetchedBattles = await contract.getAllBattles();
                const pendingBattles = fetchedBattles.filter((battle) => battle.battleStatus === 0);
                let activeBattle = null;

                fetchedBattles.forEach((battle) => {
                    if (battle.players.find((player) => player.toLowerCase() === walletAddress.toLowerCase())) {
                        if (battle.winner.startsWith('0x00')) {
                            activeBattle = battle;
                        }
                    }
                });

                setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
            }
        };
        fetchGameData();
    }, [contract, updateGameData]);

    // //*event listener
    useEffect(() => {
        if (step !== -1 && contract) {
            createEventListeners({ navigate, contract, provider, walletAddress, setShowAlert, setUpdateGameData, player2Ref, player1Ref })
        }
    }, [contract, step])

    //web3modal
    useEffect(() => {
        const resetParams = async () => {
            const currentStep = await GetParams()
            setStep(currentStep.step)
        }
        resetParams()
        window?.ethereum?.on('chainChanged', () => {
            resetParams()
        })
        window?.ethereum?.on('accountsChanged', () => {
            resetParams()
        })
    }, [])
    return (
        <GlobalContext.Provider value={{ //need to pass object
            contract, walletAddress,
            showAlert, setShowAlert,
            battleName, setBallteName, gameData, battleGround, setBattleGround,
            errorMessage, setErrorMessage,
            player2Ref, player1Ref
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () => useContext(GlobalContext);
