const isProduction = process.env.NODE_ENV === 'production'
const clientId = isProduction ? '55145159c1fd88392e12' : '55145159c1fd88392e12'
const clientSecret = isProduction ? '1b8c42ad830fc746e95a87231d55b719bde95e08' : '1b8c42ad830fc746e95a87231d55b719bde95e08'

export default {
  clientId,
  clientSecret,
  localStorageKeys: {
    gistId: 'gitrepos_gist_id',
    accessToken: 'gitrepos_access_token',
    code: 'gitrepos_code',
    user: 'gitrepos_user',
  },
  filename: 'gitrepos.json',
  description: `github stars manager for ${process.env.NODE_ENV}`,
  notify: {
    duration: 3000,
    showClose: false,
    position: 'bottom-right',
  },
  starredReposPerPage: 100, // Github 最大值
  i18nLocaleKey: 'gitrepos_i18n_local',
  defaultTags: {
    all: { id: 0, i18nKey: 'allRepos', isStarRepos: false, icon: 'fa-bars' },
    star: { id: 0, i18nKey: 'starRepos', isStarRepos: true, icon: 'fa-star' },
    untagged: { id: -1, i18nKey: 'untaggedRepos', icon: 'fa-star-o' },
  },
  tagCategorys: {
    custom: { id: 0, name: '自定义', i18nKey: 'custom' },
    language: { id: 1, name: '语言', i18nKey: 'language' },
  },
  repoSorts: {
    time: { id: 0, sortKey: '_sortTime', name: '时间', i18nKey: 'time', icon: 'fa-clock-o' },
    star: { id: 1, sortKey: 'stargazers_count', name: 'star', icon: 'fa-star' },
  },
}
