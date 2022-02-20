import { useEffect, useState } from "react";
import { Button, Card, Grid } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign.js";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

const CampaignShow = ({ address }) => {
  const [summaryObj, setSummaryObj] = useState("");

  useEffect(async () => {
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummery().call();
    console.log("summary: ", summary);
    setSummaryObj(
      renderCards({
        minimumContribution: summary[0],
        balance: summary[1],
        requestCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      })
    );
  }, []);

  const renderCards = (obj) => {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount,
    } = obj;
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this campaign and can request to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimu Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestCount,
        meta: "Number of Requests",
        description:
          "A request to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have allready donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description: "how much money this campaign have tp spend",
      },
    ];
    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{summaryObj}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary> View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

CampaignShow.getInitialProps = async (context) => {
  return { address: context.query.address };
};

export default CampaignShow;
