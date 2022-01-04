export function getEmbed(url) {
  let html = ''
  if (url.includes('airtable')) {
    html = airtableEmbed(url)
  }
  else if (url.includes('gist.github')) {
    html = gistEmbed(url)
  }
  else if (url.includes('canva.com')) {
    html = canvaEmbed(url)
  }
  return html
}

function airtableEmbed(url) {
  const index = url.lastIndexOf('/')
  url = url.slice(0, index) + '/embed' + url.slice(index, url.length)
  return `<iframe
            class="airtable-embed"
            src="${url}?backgroundColor=blue&viewControls=on"
            frameborder="0"
            onmousewheel=""
            width="100%"
            height="533"
            style="
              background: transparent;
              border: 1px solid #ccc;">
          </iframe>`
}

function gistEmbed(url) {
  return `<script src="${url}.js"></script>`
}

function canvaEmbed(url) {
  const id = url.split('/')[4]
  return `<div style="
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 56.2500%;
            padding-bottom: 48px;
            box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16);
            margin-top: 1.6em;
            margin-bottom: 0.9em;
            overflow: hidden;
            border-radius: 8px;
            will-change: transform;">
            <iframe loading="lazy"
              style="position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              border: none;
              padding: 0;
              margin: 0;"
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;${id}&#x2F;view?embed"
              allowfullscreen="allowfullscreen"
              allow="fullscreen">
          </iframe></div>`
}
