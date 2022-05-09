const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const READER = 'djahsfjkahfkafhks'
const ADIMN = 'dhaksjhfuwifhfhsd'
const { Reader, Admin, Book, Magazine, Common } = require('./modles')
const multiparty = require('multiparty')


const router = express.Router()

const auth1 = async(req,res,next) => {
  // 从请求头中获取token
  const raw = String(req.headers.authorization).split(' ').pop()
  if (raw === 'undefined') {
    return res.status(422).send({
      message: 'token不存在'
    })
  }
  try{
    // 解析token
    req.id = jwt.verify(raw, READER).id
  } catch(err) {
    return res.status(422).send({
      message: '该账号未得到授权'
    })
  }
  // 根据解析出的id查找用户信息
  req.reader = await Reader.findById(req.id)
  if (req.reader) {
    next()
  } else {
    return res.status(422).send({
      message: '该账号不存在'
    })
  }
}

const auth2 = async(req,res,next) => {
  const raw = String(req.headers.authorization).split(' ').pop()
  if (raw === 'undefined') {
    return res.status(422).send({
      message: 'token不存在'
    })
  }
  try{
    req.id = jwt.verify(raw, ADIMN).id
  } catch(err) {
    return res.status(422).send({
      message: '该账号未得到授权'
    })
  }
  req.admin = await Admin.findById(req.id)
  if (req.admin) {
    next()
  } else {
    return res.status(422).send({
      message: '该账号不存在'
    })
  }
}

router.post('/login', async (req,res) => {
  if (req.query.choice == "1"){
    const reader = await Reader.findOne({
      account: req.query.account
    })
    if (!reader) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }

    const isPasswordValid = bcrypt.compareSync(
      req.query.password,
      reader.password
    )
    if (!isPasswordValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }

    const token = jwt.sign({
      id: String(reader._id)
    },READER)
  
    res.send({
      data:{
        token,
        identity: 'reader'
      }
    })
  } else {
    const admin = await Admin.findOne({
      account: req.query.account
    })
    if (!admin) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }

    const isPasswordValid = bcrypt.compareSync(
      req.query.password,
      admin.password
    )

    if (!isPasswordValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }

    const token = jwt.sign({
      id: String(admin._id)
    },ADIMN)
  
    res.send({
      data:{
        token,
        identity: 'admin'
      }
    })
  }
})

router.get('/register-reader', async (req,res) => {
  const reader = await Reader.create({
    account: req.query.account,
    password: req.query.pass,
    imgsrc:'https://img0.baidu.com/it/u=438858754,2449239769&fm=26&fmt=auto',
    name: '用户名称',
    messageBox: [],
    newMessage: 0
  })
  res.send()
})

router.get('/register-admin', async (req,res) => {
  const admin = await Admin.create({
    account: req.query.account,
    password: req.query.pass,
    imgsrc:'https://img0.baidu.com/it/u=438858754,2449239769&fm=26&fmt=auto',
    name: '用户名称'
  })
  res.send()
})

router.get('/reader-profile', auth1, async (req,res) => {
  const info = {
    imgsrc: req.reader.imgsrc,
    name: req.reader.name,
    message: req.reader.newMessage
  }
  res.send({
    data:info
  })
})

router.get('/admin-profile', auth2, async (req,res) => {
  const info = {
    imgsrc: req.admin.imgsrc,
    name: req.admin.name
  }
  res.send({
    data:info
  })
})

router.get('/getReaderProfileAdmin', auth2, async (req,res) => {
  const select = req.query.select
  const input = req.query.input
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  let reader, total
  if (select === '1') {
    reader = await Reader.find({account:input}).skip((page-1)*perpage).limit(perpage)
    total = await Reader.find({account:input}).count()
  } else if (select === '2') {
    reader = await Reader.find({name:input}).skip((page-1)*perpage).limit(perpage)
    total = await Reader.find({name:input}).count()
  } else if (select === '' && input === '') {
    reader = await Reader.find().skip((page-1)*perpage).limit(perpage)
    total = await Reader.find().count()
  }
  res.send({
    data: {
      reader,
      total
    }
  })
})

router.get('/getReaderPassBookListAdmin', auth2, async (req,res) => {
  const account = req.query.account
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  const reader =  await Reader.findOne({account:account})
  const book = reader.bookBorrow
  let bookPass = []
  let passbooks = 0
  for (const item in book) {
    if (book[item].isBorrow === '2') {
      bookPass.push(book[item])
      passbooks += 1
    }
  }
  const total = Math.ceil(passbooks/perpage)
  const books = bookPass.slice((page-1)*perpage,page*perpage)
  return res.send({
    data: {
      books,
      total
    }
  })
})

router.post('/load-image', async (req,res) => {
  // 创建一个对象实例，并设置默认路径
  const form = new multiparty.Form({ uploadDir: '../src/public/images' })
  // 将图片保存至默认路径下的文件夹中
  form.parse(req, function(err, fields, files) {
    if(err){
      return  
    }else{
      return res.send({
        data:{
          // 返回图片在本地服务器中的路径
          path:'@'+files.image[0].path.replace(/\\/g,'/').slice(6)
        }
      })
    } 
  })
})

router.post('/publish-book', async (req,res) => {
  try{
    const books = await Book.create({
      name: req.query.name,
      author: req.query.author,
      isbn: req.query.isbn,
      cover: JSON.parse(req.query.cover),
      classify: req.query.type,
      status: Array.from(req.query.status),
      pubdate: req.query.date,
      introdution: req.query.introdution
    })
     return res.send({
       data: 'success'
     })
  } catch (err) {
    return res.send({
      data: 'error'
    })
  }
})

router.post('/getBookList', async (req,res) => {
  const type = req.query.type || ['0','1','2','3','4','5']
  const status = req.query.status || ['0','1','2']
  const page = Number(req.query.page) || 1
  const perpage = Number(req.query.perpage) || 10
  const books = await Book.find({"classify":{$elemMatch:{$in:type}},"status":{$elemMatch:{$in:status}}}).skip((page-1)*perpage).limit(perpage)
  const total = await Book.find({"classify":{$elemMatch:{$in:type}},"status":{$elemMatch:{$in:status}}}).count()
  return res.send({
    data:{
      total:total,
      books
    }
  })
})

router.post('/getBookList-reader', auth1, async (req,res) => {
  const type = req.query.type || ['0','1','2','3','4','5']
  const status = req.query.status || ['0','1','2']
  const page = Number(req.query.page) || 1
  const perpage = Number(req.query.perpage) || 10
  // 查找所有符合条件的数据，skip(跳过数据个数)，limit(显示数据个数)
  const books = await Book.find({"classify":{$elemMatch:{$in:type}},"status":{$elemMatch:{$in:status}}}).skip((page-1)*perpage).limit(perpage)
  // 查找到符合条件的数据的总数
  const total = await Book.find({"classify":{$elemMatch:{$in:type}},"status":{$elemMatch:{$in:status}}}).count()
  for (const item in req.reader.bookCollection) {
    req.reader.bookCollection[item].cover = JSON.parse(req.reader.bookCollection[item].cover)
  }
  // 获取读者图书收藏列表
  const collection = req.reader.bookCollection
  for (const item in req.reader.bookBorrow) {
    req.reader.bookBorrow[item].cover = JSON.parse(req.reader.bookBorrow[item].cover)
  }
  // 获取读者图书借阅列表
  const borrow = req.reader.bookBorrow
  return res.send({
    data:{
      total:total,
      collection,
      borrow,
      books
    }
  })
})

router.post('/publish-magazine', async (req,res) => {
  try{
    const magazines = await Magazine.create({
      name: req.query.name,
      author: req.query.author,
      number: req.query.number,
      cover: JSON.parse(req.query.cover),
      type: req.query.type,
      period: Array.from(req.query.period),
      status: Array.from(req.query.status),
      pubdate: req.query.date,
      introdution: req.query.introdution
    })
     return res.send({
       data: 'success'
     })
  } catch (err) {
    return res.send({
      data: 'error'
    })
  }
})

router.post('/getMagazineList', async (req,res) => {
  const type = req.query.type || ['0','1','2','3','4','5','6','7']
  const period = req.query.period || ['0','1','2','3','4','5','6','7']
  const status = req.query.status || ['0','1','2']
  const page = Number(req.query.page) || 1
  const perpage = Number(req.query.perpage) || 10
  const magazines = await Magazine.find({
    "type": {$elemMatch:{$in:type}},
    "status": {$elemMatch:{$in:status}},
    "period": {$elemMatch:{$in:period}}
  }).skip((page-1)*perpage).limit(perpage)
  const total = await Magazine.find({
    "type": {$elemMatch:{$in:type}},
    "status": {$elemMatch:{$in:status}},
    "period": {$elemMatch:{$in:period}}
  }).count()
  return res.send({
    data:{
      total:total,
      magazines
    }
  })
})

router.post('/getMagazineList-reader', auth1, async (req,res) => {
  const type = req.query.type || ['0','1','2','3','4','5','6','7']
  const period = req.query.period || ['0','1','2','3','4','5','6','7']
  const status = req.query.status || ['0','1','2']
  const page = Number(req.query.page) || 1
  const perpage = Number(req.query.perpage) || 10
  const magazines = await Magazine.find({
    "type": {$elemMatch:{$in:type}},
    "status": {$elemMatch:{$in:status}},
    "period": {$elemMatch:{$in:period}}
  }).skip((page-1)*perpage).limit(perpage)
  const total = await Magazine.find({
    "type": {$elemMatch:{$in:type}},
    "status": {$elemMatch:{$in:status}},
    "period": {$elemMatch:{$in:period}}
  }).count()
  for (const item in req.reader.magazineCollection) {
    req.reader.magazineCollection[item].cover = JSON.parse(req.reader.magazineCollection[item].cover)
  }
  const collection = req.reader.magazineCollection
  return res.send({
    data:{
      total:total,
      magazines,
      collection
    }
  })
})

// 向用户书本历史列表中添加该书
router.post('/addBookHistory-reader', auth1, async (req,res) => {
  const book = req.query
  const a = await Reader.find({_id:req.id},{bookHistory:{$elemMatch:{isbn:book.isbn}}})
  if (JSON.stringify(a[0].bookHistory) === '[]') {
    await Reader.updateOne({_id:req.id},{$push:{bookHistory:{$each:[book],$position:0}}})
  } else {
    await Reader.updateOne({_id:req.id},{$pull:{bookHistory:{isbn:book.isbn}}})
    await Reader.updateOne({_id:req.id},{$push:{bookHistory:{$each:[book],$position:0}}})
  }
})

// 从用户书本历史列表中删除该书
router.post('/deleteBookHistory-reader', auth1, async (req,res) => {
  const book = req.query
  await Reader.updateOne({_id:req.id},{$pull:{bookHistory:{isbn:book.isbn}}})
  return res.send({
    data:{
      message: 'success'
    }
  })
})

// 清空用户书本历史列表
router.post('/deleteAllBookHistory-reader', auth1, async (req,res) => {
  const book = req.query
  await Reader.updateOne({_id:req.id},{$set:{bookHistory:[]}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 获取用户书本历史列表
router.get('/getBookHistory-reader', auth1, async (req,res) => {
  for (const item in req.reader.bookHistory) {
    req.reader.bookHistory[item].cover = JSON.parse(req.reader.bookHistory[item].cover)
  }
  const books = req.reader.bookHistory.slice(0,4)
  return res.send({
    data:{
      books
    }
  })
})

// 获取用户图书历史详细列表
router.get('/getBookDetailHistory-reader', auth1, async (req,res) => {
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  for (const item in req.reader.bookHistory) {
    req.reader.bookHistory[item].cover = JSON.parse(req.reader.bookHistory[item].cover)
  }
  const totalPage = Math.ceil(req.reader.bookHistory.length/perpage)
  const books = req.reader.bookHistory.slice((page-1)*perpage,page*perpage)
  return res.send({
    data:{
      books,
      totalPage
    }
  })
})

// 向杂志历史列表中添加该杂志
router.post('/addMagazineHistory-reader', auth1, async (req,res) => {
  const magazine = req.query
  const a = await Reader.find({_id:req.id},{magazineHistory:{$elemMatch:{number:magazine.number}}})
  if (JSON.stringify(a[0].magazineHistory) === '[]') {
    await Reader.updateOne({_id:req.id},{$push:{magazineHistory:{$each:[magazine],$position:0}}})
  } else {
    await Reader.updateOne({_id:req.id},{$pull:{magazineHistory:{number:magazine.number}}})
    await Reader.updateOne({_id:req.id},{$push:{magazineHistory:{$each:[magazine],$position:0}}})
  }
})

// 从用户杂志历史列表中删除该杂志
router.post('/deleteMagazineHistory-reader', auth1, async (req,res) => {
  const magazine = req.query
  await Reader.updateOne({_id:req.id},{$pull:{magazineHistory:{number:magazine.number}}})
  return res.send({
    data:{
      message: 'success'
    }
  })
})

// 清空用户杂志历史列表
router.post('/deleteAllMagazineHistory-reader', auth1, async (req,res) => {
  const magazine = req.query
  await Reader.updateOne({_id:req.id},{$set:{magazineHistory:[]}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 获取用户杂志历史列表
router.get('/getMagazineHistory-reader', auth1, async (req,res) => {
  for (const item in req.reader.magazineHistory) {
    req.reader.magazineHistory[item].cover = JSON.parse(req.reader.magazineHistory[item].cover)
  }
  const magazines = req.reader.magazineHistory.slice(0,4)
  return res.send({
    data:{
      magazines
    }
  })
})

// 获取用户杂志历史详细列表
router.get('/getMagazineDetailHistory-reader', auth1, async (req,res) => {
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  for (const item in req.reader.magazineHistory) {
    req.reader.magazineHistory[item].cover = JSON.parse(req.reader.magazineHistory[item].cover)
  }
  const totalPage = Math.ceil(req.reader.magazineHistory.length/perpage)
  const magazines = req.reader.magazineHistory.slice((page-1)*perpage,page*perpage)
  return res.send({
    data:{
      magazines,
      totalPage
    }
  })
})

// 向收藏中添加该书
router.post('/addBookCollection-reader', auth1, async (req,res) => {
  const book = req.query
  try {
    const a = await Reader.find({_id:req.id},{bookCollection:{$elemMatch:{isbn:book.isbn}}})
    if (JSON.stringify(a[0].bookCollection) === '[]') {
      await Reader.updateOne({_id:req.id},{$push:{bookCollection:{$each:[book],$position:0}}})
    } else {
      await Reader.updateOne({_id:req.id},{$pull:{bookCollection:{isbn:book.isbn}}})
      await Reader.updateOne({_id:req.id},{$push:{bookCollection:{$each:[book],$position:0}}})
    }
  } catch (err) {
    return res.status.send({
      message:'fail'
    })
  }
  return res.send({
    message:'success'
  })
})

// 从收藏中移除该书
router.post('/removeBookCollection-reader', auth1, async (req,res) => {
  const book = req.query
  try {
    await Reader.updateOne({_id:req.id},{$pull:{bookCollection:{isbn:book.isbn}}})
  } catch (err) {
    return res.status(422).send({
      message:'fail'
    })
  }
  return res.send({
    message:'success'
  })
})

// 获取用户书本收藏列表
router.get('/getBookCollection-reader', auth1, async (req,res) => {
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  for (const item in req.reader.bookCollection) {
    req.reader.bookCollection[item].cover = JSON.parse(req.reader.bookCollection[item].cover)
  }
  const total = req.reader.bookCollection.length
  const books = req.reader.bookCollection.slice((page-1)*perpage,page*perpage)
  return res.send({
    data:{
      books,
      total
    }
  })
})

// 向收藏中添加该杂志
router.post('/addMagazineCollection-reader', auth1, async (req,res) => {
  const magazine = req.query
  try {
    const a = await Reader.find({_id:req.id},{magazineCollection:{$elemMatch:{number:magazine.number}}})
    if (JSON.stringify(a[0].magazineCollection) === '[]') {
      await Reader.updateOne({_id:req.id},{$push:{magazineCollection:{$each:[magazine],$position:0}}})
    } else {
      await Reader.updateOne({_id:req.id},{$pull:{magazineCollection:{number:magazine.number}}})
      await Reader.updateOne({_id:req.id},{$push:{magazineCollection:{$each:[magazine],$position:0}}})
    }
  } catch (err) {
    return res.status.send({
      message:'fail'
    })
  }
  return res.send({
    message:'success'
  })
})

// 从收藏中移除该杂志
router.post('/removeMagazineCollection-reader', auth1, async (req,res) => {
  const magazine = req.query
  try {
    await Reader.updateOne({_id:req.id},{$pull:{magazineCollection:{number:magazine.number}}})
  } catch (err) {
    return res.status(422).send({
      message:'fail'
    })
  }
  return res.send({
    message:'success'
  })
})

// 获取用户杂志收藏列表
router.get('/getMagazineCollection-reader', auth1, async (req,res) => {
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  for (const item in req.reader.magazineCollection) {
    req.reader.magazineCollection[item].cover = JSON.parse(req.reader.magazineCollection[item].cover)
  }
  const total = req.reader.magazineCollection.length
  const magazines = req.reader.magazineCollection.slice((page-1)*perpage,page*perpage)
  return res.send({
    data:{
      magazines,
      total
    }
  })
})

router.post('/addBookBorrow', auth1, async (req,res) => {
  const id = '61a76c16cd92d610d6e77f37'
  req.query.account = req.reader.account
  req.query.readerName = req.reader.name
  req.query.message = ''
  const book = req.query
  await Reader.updateOne({_id:req.id},{$push:{bookBorrow:{$each:[book],$position:0}}})
  await Common.updateOne({_id:id},{$push:{bookBorrow:{$each:[book]}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 获取用户所有审核状态的图书列表
router.get('/getBookApprovalListReader', auth1, async (req,res) => {
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  const reader =  await Reader.find({_id:req.id})
  const book = reader[0].bookBorrow
  let bookWait = []
  let bookPass = []
  let bookFail = []
  let bookReturn = []
  let waitbooks = 0
  let passbooks = 0
  let failbooks = 0
  let returnbooks = 0
  for (const item in book) {
    book[item].cover = JSON.parse(book[item].cover)
    if (book[item].isBorrow === '1') {
      bookWait.push(book[item])
      waitbooks += 1
    }else if (book[item].isBorrow === '2') {
      bookPass.push(book[item])
      passbooks += 1
    } else if (book[item].isBorrow === '3') {
      bookFail.push(book[item])
      failbooks += 1
    } else if (book[item].isBorrow === '4') {
      bookReturn.push(book[item])
      returnbooks += 1
    } 
  }
  const waitPage = Math.ceil(waitbooks/perpage)
  const passPage = Math.ceil(passbooks/perpage)
  const failPage = Math.ceil(failbooks/perpage)
  const returnPage = Math.ceil(returnbooks/perpage)
  const waitBooks = bookWait.slice((page-1)*perpage,page*perpage)
  const passBooks = bookPass.slice((page-1)*perpage,page*perpage)
  const failBooks = bookFail.slice((page-1)*perpage,page*perpage)
  const returnBooks = bookReturn.slice((page-1)*perpage,page*perpage)
  return res.send({
    data: {
      waitBooks,
      passBooks,
      failBooks,
      returnBooks,
      waitPage,
      passPage,
      failPage,
      returnPage
    }
  })
})

// 撤回所有待审核的图书申请
router.post('/deleteAllWaitBookApprovalReader', auth1, async (req,res) => {
  const id = '61a76c16cd92d610d6e77f37'
  const account = req.query.account
  await Reader.updateOne({_id:req.id},{$pull:{bookBorrow:{isBorrow:'1'}}})
  await Common.updateOne({_id:id},{$pull:{bookBorrow:{isBorrow:'1', account:account}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 撤回该待审核的图书申请
router.post('/deleteWaitBookApprovalReader', auth1, async (req,res) => {
  const id = '61a76c16cd92d610d6e77f37'
  const time = req.query.time
  const account = req.query.account
  const isbn = req.query.isbn
  await Reader.updateOne({_id:req.id},{$pull:{bookBorrow:{isbn:isbn, account:account, time:time}}})
  await Common.updateOne({_id:id},{$pull:{bookBorrow:{isbn:isbn, account:account, time:time}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 删除用户所有审核未通过的图书
router.post('/deleteAllFailBookApprovalReader', auth1, async (req,res) => {
  await Reader.updateOne({_id:req.id},{$pull:{bookBorrow:{isBorrow:'3'}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 从用户的审核未通过的图书列表中删除该书
router.post('/deleteFailBookApprovalReader', auth1, async (req,res) => {
  const time = req.query.time
  const account = req.query.account
  const isbn = req.query.isbn
  const isBorrow = '3'
  await Reader.updateOne({_id:req.id},{$pull:{bookBorrow:{isbn:isbn, account:account, time:time, isBorrow:isBorrow}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 删除用户所有已归还的图书
router.post('/deleteAllReturnBookReader', auth1, async (req,res) => {
  await Reader.updateOne({_id:req.id},{$pull:{bookBorrow:{isBorrow:'4'}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 从用户的已归还的图书列表中删除该书
router.post('/deleteReturnBookReader', auth1, async (req,res) => {
  const time = req.query.time
  const account = req.query.account
  const isbn = req.query.isbn
  const isBorrow = '4'
  await Reader.updateOne({_id:req.id},{$pull:{bookBorrow:{isbn:isbn, account:account, time:time, isBorrow:isBorrow}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 获取管理员审核过的图书列表
router.get('/getBookApprovalListAdmin', auth2, async (req,res) => {
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  const admin =  await Admin.find({_id:req.id})
  const book = admin[0].bookApproval
  let bookPass = []
  let bookFail = []
  let passbooks = 0
  let failbooks = 0
  for (const item in book) {
    book[item].cover = JSON.parse(book[item].cover)
    if (book[item].result === '0') {
      bookPass.push(book[item])
      passbooks += 1
    } else if (book[item].result === '1') {
      bookFail.push(book[item])
      failbooks += 1
    }
  }
  const passPage = Math.ceil(passbooks/perpage)
  const failPage = Math.ceil(failbooks/perpage)
  const passBooks = bookPass.slice((page-1)*perpage,page*perpage)
  const failBooks = bookFail.slice((page-1)*perpage,page*perpage)
  return res.send({
    data: {
      passBooks,
      failBooks,
      passPage,
      failPage
    }
  })
})

router.get('/getBookApprovalList', auth2, async (req,res) => {
  const id = '61a76c16cd92d610d6e77f37'
  const page = Number(req.query.page)
  const perpage = Number(req.query.perpage)
  const a =  await Common.find({_id:id})
  const book = a[0].bookBorrow
  for (const item in book) {
    book[item].cover = JSON.parse(book[item].cover)
  }
  const totalPage = Math.ceil(book.length/perpage)
  const books = book.slice((page-1)*perpage,page*perpage)
  return res.send({
    data: {
      books,
      totalPage
    }
  })
})

// 将审核完毕的图书添加到管理员审核过的列表中
router.post('/addBookApprovalAdmin', auth2, async (req,res) => {
  const book = req.query
  await Admin.updateOne({_id:req.id},{$push:{bookApproval:{$each:[book],$position:0}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 从管理员审核过的列表中删除所有已通过的图书
router.post('/deleteAllPassBookApprovalAdmin', auth2, async (req,res) => {
  await Admin.updateOne({_id:req.id},{$pull:{bookApproval:{result:'0'}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})


// 从管理员审核过的列表中删除所有未通过的图书
router.post('/deleteAllFailBookApprovalAdmin', auth2, async (req,res) => {
  await Admin.updateOne({_id:req.id},{$pull:{bookApproval:{result:'1'}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 从管理员审核过的列表中删除该已通过的图书
router.post('/deleteBookApprovalAdmin', auth2, async (req,res) => {
  const time = req.query.time
  const account = req.query.account
  const isbn = req.query.isbn
  await Admin.updateOne({_id:req.id},{$pull:{bookApproval:{isbn:isbn, account:account, time:time}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

router.post('/bookAlreadyApproval', auth2, async (req,res) => {
  const id = '61a76c16cd92d610d6e77f37'
  let isBorrow
  if (req.query.result === '0') {
    isBorrow = '2'
  } else if (req.query.result === '1') {
    isBorrow = '3'
  }
  const message = req.query.message
  const account = req.query.account
  const isbn = req.query.isbn
  const reader = await Reader.find({account:account})
  let item
  for (item in reader[0].bookBorrow) {
    if ( reader[0].bookBorrow[item].isbn === isbn && reader[0].bookBorrow[item].isBorrow === '1') {
      break
    }
  }
  const first = `bookBorrow.${item}.isBorrow`
  const second = `bookBorrow.${item}.message`
  await Reader.updateOne({account:account},{
    $set:{[first]:isBorrow, [second]:message}
  })
  await Common.updateOne({_id:id},{$pull:{bookBorrow:{isbn:isbn, account:account}}})
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 归还图书
router.post('/returnBookAdmin', auth2, async (req,res) => {
  const message = `${req.query.returnTime}/${req.admin.name}/${req.admin.account}`
  const account = req.query.account
  const isbn = req.query.isbn
  const reader = await Reader.find({account:account})
  let item
  for (item in reader[0].bookBorrow) {
    if ( reader[0].bookBorrow[item].isbn === isbn && reader[0].bookBorrow[item].isBorrow === '2') {
      break
    }
  }
  const first = `bookBorrow.${item}.isBorrow`
  const second = `bookBorrow.${item}.message`
  await Reader.updateOne({account:account},{
    $set:{[first]:'4', [second]:message}
  })
  return res.send({
    data: {
      message: 'success'
    }
  })
})

// 管理员发送消息提醒
router.post('/sendMessageAdmin', auth2, async (req,res) => {
  const message = req.query.message
  const account = req.query.account
  const time = req.query.time
  const adminName = req.admin.name
  const adminAccount = req.admin.account
  const imgsrc = req.admin.imgsrc
  const form = {
    message: message,
    adminName: adminName,
    adminAccount: adminAccount,
    adminImg: imgsrc,
    time: time
  }
  await Reader.updateOne({account:account},{$push:{messageBox:{$each:[form],$position:0}}})
  await Reader.updateOne({account:account},{$inc:{newMessage:1}})
  return res.send({
    message: 'success'
  })
})

// 用户点击我的消息后消去右上角的红点数字
router.post('/enterMessageBoxReader', auth1, async (req,res) => {
  await Reader.updateOne({_id:req.id},{$set:{newMessage:0}})
  return res.send({
    message: 'success'
  })
})

// 获取用户消息列表
router.get('/getMessageReader', auth1, async (req,res) => {
  const page = req.query.page
  const perpage = req.query.perpage
  let count = 0
  for (const item in req.reader.messageBox) {
    count++
  }
  const totalPage = Math.ceil(count/perpage)
  const messageBox = req.reader.messageBox.slice((page-1)*perpage,page*perpage)
  return res.send({
    data: {
      messageBox,
      totalPage
    }
  })
})

// 清空用户消息列表
router.post('/clearAllMessageReader', auth1, async (req,res) => {
  await Reader.updateOne({_id:req.id},{$set:{messageBox:[]}})
  return res.send({
    message: 'success'
  })
})

// 删除该条消息
router.post('/deleteMessageReader', auth1, async (req,res) => {
  const adminAccount = req.query.adminAccount
  const time = req.query.time
  await Reader.updateOne({_id:req.id},{$pull:{messageBox:{adminAccount:adminAccount, time:time}}})
  return res.send({
    message: 'success'
  })
})

module.exports = router
