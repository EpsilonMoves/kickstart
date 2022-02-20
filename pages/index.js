import React, { useEffect } from "react";
import factory from "../ethereum/factory.js";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";

const Index = ({ campaigns }) => {
  console.log("campaigns: in index", campaigns);

  useEffect(async () => {
    console.log("campaigns: ", campaigns);
  }, []);

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a >View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>

      <Link href="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link>
      {renderCampaigns()}
    </div>
  );
};

Index.getInitialProps = async (context) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { campaigns: campaigns };
};

export default Index;
