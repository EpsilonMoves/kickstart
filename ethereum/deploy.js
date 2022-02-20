const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3=require('web3')
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
    'replace toss reform regret young exhaust tuna slush alley hobby trim divide',
    'https://rinkeby.infura.io/v3/5fd3e7580f3343d4913746503ba687c1'
)

const web3=new Web3(provider)

const deploy=async()=>{
    try {
        
        const accounts = await web3.eth.getAccounts()
        console.log('attemtins to deploy from account ',accounts[0]);
        const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data:compiledFactory.evm.bytecode.object})
        .send({from: accounts[0]})
        
        console.log('deployed to ',result.options.address);
    } catch (error) {
        console.log('error: ', error);
        
    }

}

deploy()


