import { QueryBuilder } from 'objection'

/**
 * @param {QueryBuilder} query
 * @param {Object} expand
 */
export const expandQuery = async ({ query, expand = {} }) => {
  const relations = Object.keys(expand)
    .reduce((acc, relation) => ({ ...acc, [relation]: true }), {})

  query.eager(relations)

  for (const relation in expand) {
    const fields = wrapArray(expand[relation])
    query.modifyEager(relation, (builder) => {
      builder.select(fields)
    })
  }

  let results = await query
  results = wrapArray(results)

  const reduceResult = (result) => {
    for (const relation in expand) {
      const fields = expand[relation]

      if (typeof fields === 'string') {
        const prop = fields
        const relationData = result[relation]

        if (Array.isArray(relationData)) {
          result[relation] = relationData.map((item) => item[prop])
        } else {
          result[relation] = relationData[prop]
        }
      }
    }

    return result
  }

  return results.map(reduceResult)
}

export const expandQueryOne = async (query, expand = {}) => {
  const results = await expandQuery({ query, expand })
  return results[0]
}

const wrapArray = (value) => Array.isArray(value) ? value : [value]
