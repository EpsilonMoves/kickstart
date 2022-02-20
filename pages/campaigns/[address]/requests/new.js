import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Router from "next/router";
import Link from "next/link";


const RequestIndex= () => {
  const router = useRouter();
  const { address } = router.query;

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const onSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      Router.push(`/campaigns/${address}`);
    } catch (error) {
      console.log("error: ", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href={`/campaigns/${address}`}>
        <a>Back</a>
      </Link>

      <h3>Create a Request</h3>
      <Form onSubmit={() => onSubmit()}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create
        </Button>
      </Form>
    </div>
  );
};




export default RequestIndex