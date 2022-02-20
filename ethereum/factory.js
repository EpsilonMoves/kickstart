import web3 from './web3'
import CampignFactory from './build/CampaignFactory.json'

const factory = new web3.eth.Contract(
    CampignFactory.abi,
    '0xc4877Af9B1c89c3e335E52d4B517CDfD082B984b',
)

export default factory