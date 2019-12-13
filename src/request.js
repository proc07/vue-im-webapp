import nodeApiAxios from './assets/js/axios'

export const nodeApiList = {}

const requireFiles = require.context('./api', false, /\.js$/)
requireFiles.keys().forEach(fileName => {
  const moduleFile = requireFiles(fileName)
  const moduleName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')

  nodeApiList[moduleName] = addRequestToList(nodeApiAxios, moduleFile.default)
})

function addRequestToList (axios, reqList) {
  const res = {}
  reqList && reqList.forEach(item => {
    const { name, url, method } = item
    res[name] = (params = {}) => {
      return axios({
        method: method || 'post',
        url,
        headers: params.headers || {},
        data: params, // post
        params // get
      })
    }
  })
  return res
}
