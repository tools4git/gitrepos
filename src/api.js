import axios from 'axios'
// import { Notification } from 'element-ui'
import appConfig from './config'

axios.defaults.baseURL = 'https://api.github.com'

axios.interceptors.request.use(config => {
  if (config.url.includes('http')) return config

  config.url += config.url.includes('?') ? '&' : '?'
  config.url += `access_token=${window._gitrepos.accessToken}`
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(({ data }) => {
  return data
}, err => {
  // let message = err.message
  // const { response = {} } = err
  // const { config, data, status, statusText } = response

  // if (!err.__CANCEL__ && !/(\/repos\/).+(\/readme)/.test(config.url)) {
  //   if (data) message = data.message
  //   Notification.error({ message, title: `${status} ${statusText}`, showClose: false })
  // }

  return Promise.reject(err)
})

const { filename, description, starredReposPerPage } = appConfig

// 感谢 imsun (https://github.com/imsun) 提供获取 access token 服务
// export const getGitreposAccessToken = params => axios.post('https://gh-oauth.imsun.net', params)
export const getGitreposAccessToken = data => axios.post('https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token', data)

// https://developer.github.com/v3/users/#get-the-authenticated-user
export const getUserInfo = () => axios.get(`/user`)

// https://developer.github.com/v3/gists/#create-a-gist
export const createGitreposGist = content => {
  // Gitrepos v2 修改 public 属性为 false（API 默认）
  return axios.post('/gists', {
    description,
    // public: true,
    files: {
      [filename]: {
        content: JSON.stringify(content),
      },
    },
  })
}

// https://developer.github.com/v3/gists/#get-a-single-gist
export const getGitreposGist = id => axios.get(`/gists/${id}`)

// https://developer.github.com/v3/gists/#list-a-users-gists
export const getUserGists = () => axios.get(`/users/${window._gitrepos.user.login}/gists`)

// https://developer.github.com/v3/activity/starring/#list-repositories-being-starred
export const getStarredRepos = page => {
  const params = { page, per_page: starredReposPerPage }
  return axios.get(`/users/${window._gitrepos.user.login}/starred`, { params })
}

export const getAllRepos = page => {
  const params = { page, per_page: starredReposPerPage }
  return axios.get(`/users/${window._gitrepos.user.login}/repos`, { params })
}

// https://developer.github.com/v3/repos/contents/#get-the-readme
export const getRepoReadme = (login, name, source) => axios.get(`/repos/${login}/${name}/readme`, { cancelToken: source.token })

// https://developer.github.com/v3/markdown/#render-a-markdown-document-in-raw-mode
export const getRenderedReadme = (data, source) => {
  return axios({
    data,
    url: `/markdown/raw`,
    method: 'post',
    headers: {
      'Content-Type': 'text/plain',
    },
    cancelToken: source.token,
  })
}

// https://developer.github.com/v3/gists/
export const saveGitreposGist = (content) => {
  // return axios.patch(`/gists/${window._gitrepos.gistId + 'a'}`, {
  return axios.patch(`/gists/${window._gitrepos.gistId}`, {
    files: {
      [filename]: {
        content: JSON.stringify(content),
      },
    },
  })
}
