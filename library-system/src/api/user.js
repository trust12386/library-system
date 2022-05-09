import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'post',
    url: '/login',
    params: data
  })
}

export const readerRegister = (data) => {
  return request({
    method: 'get',
    url: '/register-reader',
    params: data
  })
}

export const adminRegister = (data) => {
  return request({
    method: 'get',
    url: '/register-admin',
    params: data
  })
}

export const getReaderProfile = () => {
  return request({
    method: 'get',
    url: '/reader-profile'
  })
}

export const getAdminProfile = () => {
  return request({
    method: 'get',
    url: '/admin-profile'
  })
}

export const loadImage = (data) => {
  return request({
    method: 'post',
    url: '/load-image',
    data
  })
}

export const getReaderProfileAdmin = (data) => {
  return request({
    method: 'get',
    url: '/getReaderProfileAdmin',
    params: data
  })
}

export const sendMessageAdmin = (data) => {
  return request({
    method: 'post',
    url: '/sendMessageAdmin',
    params: data
  })
}

export const enterMessageBoxReader = (data) => {
  return request({
    method: 'post',
    url: '/enterMessageBoxReader',
    params: data
  })
}

export const getMessageReader = (data) => {
  return request({
    method: 'get',
    url: '/getMessageReader',
    params: data
  })
}

export const clearAllMessageReader = (data) => {
  return request({
    method: 'post',
    url: '/clearAllMessageReader',
    params: data
  })
}

export const deleteMessageReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteMessageReader',
    params: data
  })
}
