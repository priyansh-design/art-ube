import React ,{useState} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import {NavLink} from 'react-router-dom'
import {ethers} from 'ethers'


const Navbar = () => {
    const[nav,setNav]=useState(false)
    const handleNav= () => {
         setNav(!nav)
    }
    
    const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

    
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>ARTUBE.</h1>
        <ul className='hidden md:flex'>
            <li className='p-4'><NavLink to='/'>Home</NavLink></li>
            <li className='p-4'><NavLink to='/marketplace'>Marketplace</NavLink></li>
           
            <li className='p-4'><NavLink to='/verify'>Verify</NavLink></li>
            
        </ul>
        <div className='hidden md:block'>
        <a href="https://bobbyhadz.com" target="_blank" rel="noopener noreferrer">
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black mx-3'>New Artist</button>

      </a></div>
        <div className='hidden md:block'><button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black ' onClick={connectWalletHandler}>{connButtonText}</button></div>
        <div onClick={handleNav} className='block md:hidden'>
            {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
            
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 md:hidden' :'fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>APTUBE.</h1>
            <ul className='p-4 uppercase'>
                <li className='p-4 border-b border-gray-600'><NavLink to='/'>Home</NavLink></li>
                <li className='p-4 border-b border-gray-600'><NavLink to='/marketplace'>Marketplace</NavLink></li>
                
                <li className='p-4 border-b border-gray-600'><NavLink to='/verify'>Verify</NavLink></li>
                
            </ul>
            <div className=' justify-center items-center m-4'><button className=' bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>New Artist</button></div>

            <div className=' justify-center items-center m-4'><button className=' bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Connect Wallet</button></div>
            
        </div>
    </div>
  )
}

export default Navbar