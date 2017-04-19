import axios from '~plugins/axios'

export const state = {
  toots: []
}

export const mutations = {
  fetch (state, toots) {
    state.toots.push(...toots)
  }
}

export const actions = {
  async fetch ({commit, state}) {
    try {
      const {data} = await axios.get(`/api/toots/`, {})
      commit('fetch', data)
    } catch (e) {}
  }
}
