import Router from "next/router"
import { useState } from "react"
import { Button, Form, Input, Message } from "semantic-ui-react"
import Campaign from "../ethereum/campaign"
import web3 from "../ethereum/web3"


export default({address})=>{

    const [value,setValue]=useState('')
    const [errorMessage,setErrorMessage]=useState('')
    const [loading,setLoading]=useState(false)

    const onsubmit=async(e) =>{

        try {
            setLoading(true)
            setErrorMessage('')
            e.preventDefault()
            const campaign = Campaign(address)
            const accounts= await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(value,'ether')
            })
            console.log('before replace');
            Router.replace(`/campaigns/${address}`)

        } catch (error) {
            setErrorMessage(error.message)
        }finally{
            setLoading(false)
            setValue('')
        }
    }

    return(
        <Form onSubmit={(e)=>onsubmit(e)} error={!!errorMessage}>
            <Form.Field>
                <label htmlFor="">Amount to Contribute</label>
                <Input
                value={value}
                onChange={e=>setValue(e.target.value)}
                    label="ether" labelPosition='right'
                />
            </Form.Field>
            <Message error header="Oops!"  content={errorMessage}/>
            <Button primary loading={loading}>
                Contribute
            </Button>
        </Form>
    )
}