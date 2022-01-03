import {Container} from 'react-bootstrap';
import Expo from '../components/Expo'
import {Client} from "@notionhq/client"
import NavBar from "../components/NavBar"
import Link from 'next/link'
import {getData, getRecords} from '../lib/posts'

export default function Blog(props) {
  const short_intro=`I like to write. I can't really promise I'll keep this page up to date, since I'm not only writing the English, but the code too. As of this writing, I'm still
  on a hunt for a blogging solution that allows me to meticulously categorize my blog posts and let Google know I exist among other things without breaking my bank account. In the meantime,
  I hope you find something enjoyable/useful below :)`

  return (
    <Container className="mb-5">
      <NavBar/>
      <Expo headline="Blog" text={short_intro}/>
      <hr/>
      <Container>
      {
        props.ids.map((item, index) =>
          <Container className="text-white my-2 ps-3" key={index}>
          <Link href={item.url}>
            <a>{item.title}</a>
          </Link>
          </Container>
        )
      }
      </Container>
    </Container>
  )
}
export async function getStaticProps() {

  const notion = new Client({auth: process.env.NOTION_KEY})
  const records = await getRecords(process.env.NOTION_DB, notion)
  const ids = records.map(record => {
    return {
      title: record.properties.Title.title[0].plain_text,
      url: '/blog/' + record.id
    }
  })

  return {props: {ids}}

}
