import {Figure} from "react-bootstrap"
import {getEmbed} from "./embeds.js"

function innerHTML(segments) {
  const htmls = segments.map((segment, index) => {
    var html = segment.text
    if (segment.bold) {html = <strong>{html}</strong>}
    if (segment.italic) {html = <em>{html}</em>}
    if (segment.strikethrough) {html = <s>{html}</s>}
    if (segment.underline) {html = <u>{html}</u>}
    if (segment.code) {html = <code>{html}</code>}
    if (segment.link) {html = <a href={segment.link} target="_blank" rel="noreferrer" className="text-muted">{html}</a>}
    return <span key={index}>{html}</span>
  })
  return htmls
}

export function renderBlock(type, content, id) {

  const tags = {"heading_1":"h1", "heading_2":"h3", "heading_3":"h5"}

  if (type == "paragraph") {
    return <div className="h6 text-light mb-4" key={id}>{innerHTML(content)}</div>
  }

  else if (type == "image") {
    return (
      <Figure className="d-flex flex-column" key={id}>
        <Figure.Image src={content.url} fluid/>
        <Figure.Caption className="text-center">{innerHTML(content.caption)}</Figure.Caption>
      </Figure>
    )
  }

  else if (type in tags) {
    return <p className={`${tags[type]} text-white mt-4 mb-2`} key={id}>{innerHTML(content)}</p>
  }

  else if (type == "divider") {
    const test = ""
  }

  else if (type == "numbered_list") {
    const listItems = content.map(listItem => <li key={listItem.id}>{innerHTML(listItem.content)}</li>)
    return <ol key={id} className="h6 text-white">{listItems}</ol>
  }

  else if (type == "bulleted_list_item") {
    return <ul key={id} className="h6 text-white"><li>{innerHTML(content)}</li></ul>
  }

  else if (type == "code") {
    return <pre className="language-python mb-3"><code className="language-python">{content.text}</code></pre>
  }
  
  else if (type == "embed") {
    return <div dangerouslySetInnerHTML={content} key={id}/>
  }
}

export async function getPageData(record) {
  return {
    title: record.properties.Title.title[0].plain_text,
    date: record.properties.Date.created_time.split('T')[0]
  }
}

//For your sanity, don't look too closely at this function. Just know it works.
export function groupLists(blocks) {

  // Return [0, 1, no, ..] if numbered_list_item at index 0, 1 but not 2 and so on.
  const listItems = blocks.map((block, index) => {return (block.type == "numbered_list_item") ? index : "no"})

  // Return list of indices of numbered_list_item
  var listIndex = listItems.filter(item => item != "no")

  // Return lists of lists where each list is of a block of numbered_list_items
  const lists = listItems.join("-").split("no").filter(string => string != '')
  .map(list => {
    return list.split('-').filter(item => item != '').map(item => parseInt(item)).map(item => {
      const blockItem = blocks[item]
      blockItem.blockIndex = item
      return blockItem
    })}).filter(item => item.length > 0)

  // Get a list of leading blocks of numbered_list_item blocks
  const leadingIndex = lists.map(list => list[0].blockIndex)
  listIndex = listIndex.filter(index => !leadingIndex.includes(index))

  blocks = blocks
  .map((block, index) => {
    if (leadingIndex.includes(index)) {
      const new_block = lists.filter(list => list[0].blockIndex == index)[0]
      return new_block
    }
    else {
      return block
    }
  })
  .filter((block, index) => !listIndex.includes(index))

  return blocks
}

export function formatListObject(listObject) {
  const lists = listObject.map(obj => {
    return {
      id: obj.id,
      content: obj.content,
    }
  })

  return {
    type: "numbered_list",
    id: null,
    content: lists
  }
}
