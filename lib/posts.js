import {Figure} from "react-bootstrap"

export function getEmbed(url) {
  let html = ''
  if (url.includes('airtable')) {
      const index = url.lastIndexOf('/')
      url = url.slice(0, index) + '/embed' + url.slice(index, url.length)
      html = `<iframe class="airtable-embed" src="${url}?backgroundColor=blue&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>`
  }
  else if (url.includes('gist.github')) {
    html = `<script src="${url}.js"></script>`
  }
  else if (url.includes('canva.com')) {
    const id = url.split('/')[4]
    html = `<div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%; padding-bottom: 48px; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"    src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;${id}&#x2F;view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">  </iframe></div>`
  }
  return html
}

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

  const tags = {
    "heading_1": "h1",
    "heading_2": "h3",
    "heading_3": "h5"
  }
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
    return <pre className="language-python"><code className="language-python">{content.text}</code></pre>
  }
  else if (type == "embed") {
    return <div dangerouslySetInnerHTML={content} key={id}/>
  }
}

export async function getPageIds(database_id, notion) {
  const records = await notion.databases.query({database_id: database_id})
  const pageIds = records.results.map(record => {
    return {id: record.id}
  })
  return pageIds
}

export async function getRecord(database_id, id, notion) {
  const records = await notion.databases.query({
    database_id: database_id
  })
  return records.results.filter(record => record.id === id)[0]
}

export async function getPageData(record) {
  return {
    title: record.properties.Title.title[0].plain_text,
    date: record.properties.Date.created_time.split('T')[0]
  }
}

export async function getPageContent(record, notion) {
  const response = await notion.blocks.children.list({
    block_id: record.id
  })
  const blocks = response.results

  const textBlocks = [
    "heading_1",
    "heading_2",
    "heading_3",
    "paragraph",
    "quote",
    "bulleted_list_item",
    "numbered_list_item"
  ]

  return blocks
  .map(block => {
    if (textBlocks.includes(block.type)) {
      return {
        type: block.type,
        id: block.id,
        content: parseText(block[block.type].text)
      }
    }
    else if (block.type == 'image') {
      return {
        type: "image",
        id: block.id,
        content: {
          url: block.image.external.url,
          caption: parseText(block.image.caption)
        }
      }
    }
    else if (block.type == "code") {
      return {
        type: "code",
        id: block.id,
        content: {
          text: block.code.text[0].plain_text,
          language: block.code.language
        }
      }
    }
    else if (block.type == 'embed') {
      return {
        type: "embed",
        content: {__html: getEmbed(block.embed.url)},
        id: block.id
      }
    }
  })
  .filter(block => block !== undefined)
}

export function groupLists(blocks) {
  const listItems = blocks.map((block, index) => {
    if (block.type == "numbered_list_item") {return index}
    else {return "no"}})

  var listIndex = listItems.filter(item => item != "no")

  const lists = listItems.join("-").split("no").filter(string => string != '')
  .map(list => {return list.split('-').filter(item => item != '')
  .map(item => parseInt(item))
  .map(item => {
      const blockItem = blocks[item]
      blockItem.blockIndex = item
      return blockItem
    }
    )
  }).filter(item => item.length > 0)

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



function parseText(paragraph) {
  return paragraph.map(block => {
    return {
        text: block.plain_text,
        bold: block.annotations.bold,
        ilatic: block.annotations.italic,
        strikethrough: block.annotations.strikethrough,
        underline: block.annotations.underline,
        color: block.annotations.color,
        code: block.annotations.code,
        link: block.href,
      }
  })
}

export async function getRecords(database_id, notion) {
  const response = await notion.databases.query({
    database_id: database_id
  })
  return response.results
}



// export async function getPageContent(record, notion) {
//   const response = await notion.blocks.children.list({
//     block_id: record.id
//   })
//   const blocks = response.results
//
//   const content = blocks
//   .map(block => {
//     if (block.type == 'paragraph' && block.paragraph.text[0] !== undefined) {
//       return {
//         type: "paragraph",
//         content: block.paragraph.text[0].plain_text,
//         id: block.id
//       }
//     }
//     else if (block.type == "heading_1") {
//       return {
//         type: "h1",
//         content: block.heading_1.text[0].plain_text,
//         id: block.id
//       }
//     }
//     else if (block.type == "heading_2") {
//       return {
//         type: "h2",
//         content: block.heading_2.text[0].plain_text,
//         id: block.id
//       }
//     }
//     else if (block.type == 'heading_3') {
//       return {
//         type: "h3",
//         content: block.heading_3.text[0].plain_text,
//         id: block.id
//       }
//     }
//     else if (block.type == 'image') {
//       return {
//         type: "image",
//         content: {
//           url: block.image.external.url,
//           caption: block.image.caption[0].plain_text
//         },
//         id: block.id
//       }
//     }
//     else if (block.type == 'embed') {
//       return {
//         type: "embed",
//         content: {
//           __html: getEmbed(block.embed.url)
//         },
//         id: block.id
//       }
//     }
//   })
//   .filter(block => block !== undefined)
//
//   return content
// }
