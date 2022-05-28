
import { defineStore } from 'pinia'
import { getApiList } from '../server'
import type { RootObject, Children, ChinaAdd, ChinaTotal, StatisGradeCityDetail } from './type'

export const useStore = defineStore('yiqin', {
  state: () => ({
    list: <RootObject>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <StatisGradeCityDetail[]>[],
  }),
  actions: {
    async getList() {
      const result = await getApiList()
      this.list = result.data.data
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal
      this.cityDetail = this.list.statisGradeCityDetail.slice(0, 8)
    }
  }
})