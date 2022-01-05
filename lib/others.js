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
