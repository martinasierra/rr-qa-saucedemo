
export default class Page {

    get title() { return $('.title')}
   
    open (path) {
        return browser.url(`https://www.saucedemo.com/${path}`)
    }
}
