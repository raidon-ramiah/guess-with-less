import request from 'superagent'
import * as models from '../../models/prompts'

const rootUrl = '/api/v1'

export function getAllPrompts(): Promise<models.Prompt[] | Error> {
  return request
    .get(rootUrl + '/prompts')
    .then((res) => {
      return res.body
    })
    .catch((error) => {
      console.error(error)
      return error
    })
}
