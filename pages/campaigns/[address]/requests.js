import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Table } from "semantic-ui-react"
import RequestRow from "../../../components/RequestRow"
import Campaign from "../../../ethereum/campaign"

export default()=>{
    const router = useRouter()
  const {address} = router.query

  const [approversCount,setApproversCount]=useState(0)
  const [results,setResults]=useState([])
  const [rows,setRows]=useState('')

  useEffect(async()=>{
    const campaign = Campaign(address)
    const requestCount=await campaign.methods.getRequestsCount().call()
    setResults( await Promise.all(
      Array(requestCount).fill().map((element,index)=>{
        return campaign.methods.requests(index).call()
      })
      ))

      setApproversCount(
        await campaign.methods.approversCount().call()
      )

  },[])

  useEffect(async()=>{
      console.log('results: ', results);
      setRows(results.map((req,index)=>{
        return <RequestRow
            key={index}
            id={index}
            request={req}
            address={address}
            approversCount={approversCount}
        />
    }))
  },[results])

  const {Header,Row,HeaderCell,Body}=Table

    return(
        <div>
            <Link href={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {rows}
                </Body>
            </Table>
        </div>
    )
}