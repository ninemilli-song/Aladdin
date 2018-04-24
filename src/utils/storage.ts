export const setStorage = (name, content) => {
    // tslint:disable-next-line:curly
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}
  
export const getStorage = name => {
    // tslint:disable-next-line:curly
    if (!name) return
    // return JSON.parse(window.localStorage.getItem(name))
    return window.localStorage.getItem(name)
}
  
export const removeStorage = name => {
    // tslint:disable-next-line:curly
    if (!name) return
    return window.localStorage.removeItem(name)
}
