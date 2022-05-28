const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost:27017/system', {
  useNewUrlParser: true
})

const ReaderSchema = new mongoose.Schema({
  account: { type: String, unique: true },
  password: {
    type: String,
    set (val) {
      return bcrypt.hashSync(val,10)
    }
  },
  imgsrc: { type: String },
  name: { type: String },
  messageBox: { type: Array },
  newMessage: { type: Number },
  bookHistory: { type: Array },
  magazineHistory: { type: Array},
  bookCollection: { type: Array },
  magazineCollection: { type: Array },
  bookBorrow: { type: Array },
  magazineBorrow: { type: Array }
})

const AdminSchema = new mongoose.Schema({
  account: { type: String, unique: true },
  password: {
    type: String,
    set (val) {
      return bcrypt.hashSync(val,10)
    }
  },
  imgsrc: { type: String },
  name: { type: String },
  bookApproval: { type: Array },
  magazineApproval: { type: Array }
})

const BookSchema = new mongoose.Schema({
  name: { type: String },
  author: { type: String },
  isbn: { type: String, unique: true },
  cover: { type: Object },
  classify: { type: Array },
  status: { type: Array },
  pubdate: { type: String },
  introdution: { type: String }
})

const MagazineSchema = new mongoose.Schema({
  name: { type: String },
  author: { type: String },
  number: { type: String },
  cover: { type: Object },
  period: { type: Array },
  type: { type: Array },
  status: { type: Array },
  pubdate: { type: String },
  introdution: { type: String }
})

const CommonSchema = new mongoose.Schema({
  bookBorrow: { type: Array },
  magazineBorrow: { type: Array }
})

const Magazine = mongoose.model('Magazine', MagazineSchema)
const Reader = mongoose.model('Reader', ReaderSchema)
const Admin = mongoose.model('Admin', AdminSchema)
const Book = mongoose.model('Book', BookSchema)
const Common = mongoose.model('Common', CommonSchema)

module.exports = { Reader, Admin, Book, Magazine, Common }