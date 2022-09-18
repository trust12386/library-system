import { parseHTML } from "./parse";

function genProps(attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    if (attr.name === 'style') {
      let obj = attr.value.split(';').filter(item => item !== '').reduce((pre, cur) => {
        let [key, value] = cur.split(':')
        pre[key] = value.trim()
        return pre
      }, {})
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}

function genChildren(children) {
  return children.map(child => gen(child)).join(',')
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
function gen(node) {
  if(node.type === 1){
    return codegen(node)
  } else {
    let text = node.text
    if(!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    } else {
      let tokens = []
      let match,lastIndex = 0
      defaultTagRE.lastIndex = 0
      while (match = defaultTagRE.exec(text)) {
        let index = match.index
        if(index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex,index)))
        }
        tokens.push(`_s(${match[1].trim()})`)
        lastIndex = index + match[0].length
      }
      if(lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      return `_v(${tokens.join('+')})`
    }
  }
}

function codegen(ast) {
  let children = genChildren(ast.children)
  let code = `_c('${ast.tag}',${ast.attrs.length > 0 ? genProps(ast.attrs) : 'null'}${ast.children.length ? `,${children}` : ''})`
  return code
}

export function compileToFunction(template) {
  let ast = parseHTML(template)
  let code = codegen(ast)

  // 模板引擎的实现原理就是 with + new Function
  code = `with(this){return ${code}}`
  let render = new Function(code)
  return render
}