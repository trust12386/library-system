import request from '@/utils/request'

export const publishMagazine = (data) => {
  return request({
    method: 'post',
    url: '/publish-magazine',
    params: data
  })
}

export const screenMagazine = (data) => {
  return request({
    method: 'post',
    url: '/getMagazineList',
    params: data
  })
}

export const screenMagazineReader = (data) => {
  return request({
    method: 'post',
    url: '/getMagazineList-reader',
    params: data
  })
}

export const addMagazineHistoryReader = (data) => {
  return request({
    method: 'post',
    url: '/addMagazineHistory-reader',
    params: data
  })
}

export const deleteMagazineHistoryReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteMagazineHistory-reader',
    params: data
  })
}

export const deleteAllMagazineHistoryReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteAllMagazineHistory-reader',
    params: data
  })
}

export const getMagazineHistoryReader = (data) => {
  return request({
    method: 'get',
    url: '/getMagazineHistory-reader',
    params: data
  })
}

export const getMagazineDetailHistoryReader = (data) => {
  return request({
    method: 'get',
    url: '/getMagazineDetailHistory-reader',
    params: data
  })
}

export const addMagazineCollectionReader = (data) => {
  return request({
    method: 'post',
    url: '/addMagazineCollection-reader',
    params: data
  })
}

export const removeMagazineCollectionReader = (data) => {
  return request({
    method: 'post',
    url: '/removeMagazineCollection-reader',
    params: data
  })
}

export const getMagazineCollectionReader = (data) => {
  return request({
    method: 'get',
    url: '/getMagazineCollection-reader',
    params: data
  })
}
