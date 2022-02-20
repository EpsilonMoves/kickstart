import Web3 from 'web3'

let web3 

if(typeof window!=='undefined'&&typeof window.web3!=='undefined'){

    web3 = new Web3(window.web3.currentProvider)
}else{
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/5fd3e7580f3343d4913746503ba687c1'
    )
    web3 = new Web3(provider)
}



export default web3