import {
  makeObservable,
  observable,
  computed,
  action,
  runInAction,
  flow
} from 'mobx'
export default class AppleStore {
  constructor (initApples?) {
    this.apples = []
    this.isPicking = false
    if (Array.isArray(initApples) && initApples.length > 0) {
      initApples.array.forEach(apple => {
        this.apples.push(apple)
      })
    }
    makeObservable(this, {
      apples: observable,
      newAppleId: computed,
      isPicking: observable,
      statisticalStatus: computed,
      pickApple: flow.bound,
      eatApple: action.bound
    })
  }

  get newAppleId () {
    return this.apples.reduce((newId, apple) => {
      return newId > apple.id ? newId : apple.id
    }, 0)
  }

  /**
   * 统计当前已吃和当前篮子中的苹果数量和重量状态
   */
  get statisticalStatus () {
    let status = {
      appleInBasket: {
        quantity: 0,
        weight: 0
      },
      appleEaten: {
        quantity: 0,
        weight: 0
      }
    }

    this.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleInBasket'
      status[selector].quantity++
      status[selector].weight += apple.weight
    })

    return status
  }

  /**
   * 摘苹果，往篮子中添加一个苹果
   */
  * pickApple () {
    if (this.isPicking) return
    this.isPicking = true
    // 模拟向远端请求苹果数据
    yield fetch('https://hacker-news.firebaseio.com/v0/jobstories.json').then(
      res => {
        let weight = Math.floor(200 + Math.random() * 50)
        // 使用runInAction消除异步处理中修改store 状态的警告
        runInAction(() => {
          this.isPicking = false
          this.apples.push({
            id: this.newAppleId + 1,
            weight: weight,
            isEaten: false
          })
        }, [])
      }
    )
  }
  // 这里可以优化将被吃动作抽离到apple对象实例本省
  eatApple (appleId) {
    this.apples.forEach(apple => {
      if (apple.id === appleId) {
        apple.isEaten = true
      }
    })
  }
}
