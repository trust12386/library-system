import request from '@/utils/request'

export const publishBook = (data) => {
  return request({
    method: 'post',
    url: '/publish-book',
    params: data
  })
}

export const screenBook = (data) => {
  return request({
    method: 'post',
    url: '/getBookList',
    params: data
  })
}

export const screenBookReader = (data) => {
  return request({
    method: 'post',
    url: '/getBookList-reader',
    params: data
  })
}

export const addBookHistoryReader = (data) => {
  return request({
    method: 'post',
    url: '/addBookHistory-reader',
    params: data
  })
}

export const deleteBookHistoryReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteBookHistory-reader',
    params: data
  })
}

export const deleteAllBookHistoryReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteAllBookHistory-reader',
    params: data
  })
}

export const getBookHistoryReader = (data) => {
  return request({
    method: 'get',
    url: '/getBookHistory-reader',
    params: data
  })
}

export const getBookDetailHistoryReader = (data) => {
  return request({
    method: 'get',
    url: '/getBookDetailHistory-reader',
    params: data
  })
}

export const addBookCollectionReader = (data) => {
  return request({
    method: 'post',
    url: '/addBookCollection-reader',
    params: data
  })
}

export const removeBookCollectionReader = (data) => {
  return request({
    method: 'post',
    url: '/removeBookCollection-reader',
    params: data
  })
}

export const getBookCollectionReader = (data) => {
  return request({
    method: 'get',
    url: '/getBookCollection-reader',
    params: data
  })
}

export const addBookBorrow = (data) => {
  return request({
    method: 'post',
    url: '/addBookBorrow',
    params: data
  })
}

// 获取用户bookBorrow集合中所有状态的图书
export const getBookApprovalListReader = (data) => {
  return request({
    method: 'get',
    url: '/getBookApprovalListReader',
    params: data
  })
}

// 撤回所有待审核的图书申请
export const deleteAllWaitBookApprovalReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteAllWaitBookApprovalReader',
    params: data
  })
}

// 撤回该待审核的图书申请
export const deleteWaitBookApprovalReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteWaitBookApprovalReader',
    params: data
  })
}

// 删除用户所有审核未通过的图书
export const deleteAllFailBookApprovalReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteAllFailBookApprovalReader',
    params: data
  })
}

// 从用户的审核未通过的图书列表中删除该书
export const deleteFailBookApprovalReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteFailBookApprovalReader',
    params: data
  })
}

// 获取Common集合中待审核的图书
export const getBookApprovalList = (data) => {
  return request({
    method: 'get',
    url: '/getBookApprovalList',
    params: data
  })
}

// 获取管理员审核过的图书列表
export const getBookApprovalListAdmin = (data) => {
  return request({
    method: 'get',
    url: '/getBookApprovalListAdmin',
    params: data
  })
}

export const getReaderPassBookListAdmin = (data) => {
  return request({
    method: 'get',
    url: '/getReaderPassBookListAdmin',
    params: data
  })
}

export const bookAlreadyApproval = (data) => {
  return request({
    method: 'post',
    url: '/bookAlreadyApproval',
    params: data
  })
}

export const addBookApprovalAdmin = (data) => {
  return request({
    method: 'post',
    url: '/addBookApprovalAdmin',
    params: data
  })
}

export const deleteAllPassBookApprovalAdmin = (data) => {
  return request({
    method: 'post',
    url: '/deleteAllPassBookApprovalAdmin',
    params: data
  })
}

export const deleteBookApprovalAdmin = (data) => {
  return request({
    method: 'post',
    url: '/deleteBookApprovalAdmin',
    params: data
  })
}

export const deleteAllFailBookApprovalAdmin = (data) => {
  return request({
    method: 'post',
    url: '/deleteAllFailBookApprovalAdmin',
    params: data
  })
}

export const returnBookAdmin = (data) => {
  return request({
    method: 'post',
    url: '/returnBookAdmin',
    params: data
  })
}

export const deleteReturnBookReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteReturnBookReader',
    params: data
  })
}

export const deleteAllReturnBookReader = (data) => {
  return request({
    method: 'post',
    url: '/deleteAllReturnBookReader',
    params: data
  })
}
