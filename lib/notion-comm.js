// This .js contains functions used to communicate with Notion API



export async function getPageIds(database_id, notion) {
  const records = await notion.databases.query({database_id: database_id})
  const pageIds = records.results.map(record => {
    return {id: record.id}
  })
  return pageIds
}

export async function getRecords(database_id, notion) {
  const response = await notion.databases.query({
    database_id: database_id
  })
  return response.results
}

export async function getRecord(database_id, id, notion) {
  const records = await notion.databases.query({
    database_id: database_id
  })
  return records.results.filter(record => record.id === id)[0]
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
