import { Button, Table } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

export default ({ key, request, address, id, approversCount }) => {
  console.log("request: ", request);

  const approveClicked = async() => {
        const campaign=Campaign(address)
        const accounts=await web3.eth.getAccounts()
        await campaign.methods.approveRequest(id).send({
            from:accounts[0]
        })

  };

  const onFinilaize=async()=>{
    const campaign=Campaign(address)
    const accounts=await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(id).send({
        from:accounts[0]
    })
  }

  const { Row, Cell } = Table;

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        <Button color="green" basic onClick={() => approveClicked()}>
          Approve
        </Button>
      </Cell>
      <Cell>
          <Button color="teal" basic onClick={()=>onFinilaize()}>
          Finilaize
          </Button>
          </Cell>
    </Row>
  );
};
