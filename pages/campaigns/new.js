import Router  from "next/router";
import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

export default () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading ] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true)
        setErrorMessage('')
        const accounts=await web3.eth.getAccounts()
        console.log("minimumContribution: ", minimumContribution);
        await factory.methods.createCampaign(minimumContribution)
        .send({from:accounts[0]})

        Router.push('/')
    } catch (error) {
        console.log('error: ', error);
        setErrorMessage(error.message)
    }finally{
        setLoading(false)
    }
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)} error={!!errorMessage}>
      <h3>Create a Campaign</h3>
      <Form.Field>
        <label htmlFor="">Minimum Contribution</label>
        <Input
          label="wei"
          labelPosition="right"
          value={minimumContribution}
          onChange={(e) => {
            setMinimumContribution(e.target.value);
          }}
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage}/>
      <Button loading={loading} primary>Create!</Button>
    </Form>
  );
};
