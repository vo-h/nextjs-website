import {Container, Figure} from 'react-bootstrap';
import {getPageIds, getPageData, getPageContent, getRecord, renderBlock, groupLists, formatListObject} from '../../lib/posts'
import {Client} from "@notionhq/client"
import NavBar_Posts from '../../components/NavBar_Posts'
import Script from 'next/script'
import {useEffect} from 'react'
import Prism from "Prismjs"
import 'prismjs/components/prism-python.js'

export default function Post({pageData}) {
  useEffect(() => {Prism.highlightAll()}, [])

  return (
    <Container className="px-5 mb-5 pb-5">
      <NavBar_Posts/>

      <Container>
        <p className="display-6 text-white my-3">{pageData.title}</p>
        <p className="h6 text-muted"> {pageData.date} </p>
      </Container>
      <Container className="mt-3">
        {pageData.body.map(item => renderBlock(item.type, item.content, item.id))}
      </Container>
    </Container>
  )
}

export async function getStaticPaths() {
  const notion = new Client({auth: process.env.NOTION_KEY})
  const posts = await getPageIds(process.env.NOTION_DB, notion)
  const ids = posts.map(post => {return {params: {id: post.id}}})
  return {paths: ids, fallback: false}
}


export async function getStaticProps({params}) {

  const notion = new Client({auth: process.env.NOTION_KEY})
  const record = await getRecord(process.env.NOTION_DB, params.id, notion)
  const pageData = await getPageData(record)
  var pageContent = await getPageContent(record, notion)

  pageContent = groupLists(pageContent)
  pageContent = pageContent.map(block => {
    if (typeof(block.length) == "number") {
      return formatListObject(block)
    }
    else {
      return block
    }
  }
  )

  pageData.body = pageContent

  return {props: {pageData}}
}
