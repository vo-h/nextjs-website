import {request} from "@octokit/request";


export function parseSkills(records){
  const skills = records.map(record => {
    return {
      category: [record.properties.Tags.multi_select[0].name],
      skill: record.properties.Name.title[0].plain_text,
      stars: record.properties["Rating (max 5)"].number
    }
  })
  return skills
}

export async function parseProjects(records, key) {
  const projects = await Promise.all(records.map(async record => await assembleProject(record, key)))

  const groupedProjects = [];
  while(projects.length) groupedProjects.push(projects.splice(0,2));

  return groupedProjects
  }


async function assembleProject(record, key) {
  const repo_name = await record.properties.github_link.url.split('/').at(-1)
  const imgURL = await getGitHubImage(repo_name, key)
  const project = await {
          img: imgURL,
          title: record.properties.Name.title[0].plain_text,
          text:record.properties.Description.rich_text[0].plain_text,
          link:record.properties.dep_link.url,
          github:record.properties.github_link.url,
      }
  return project
}

async function getGitHubImage(repo_name, key) {
  const graphQLquery = `
    query {
      repository(name: "${repo_name}", owner: "vo-h") {
        openGraphImageUrl
      }
    }
  `

  const graphQLoptions = {
    headers: {
      authorization: ` bearer ${key}`
    },
    query: graphQLquery
  }

  const graphQL = await request("POST https://api.github.com/graphql", graphQLoptions)
  return graphQL.data.data.repository.openGraphImageUrl
}
