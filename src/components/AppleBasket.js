import '../styles/appleBasket.scss'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../store/rootStore'
import { AppleItem } from './AppleItem'
export function AppleBasket () {
  const { appleStore } = useRootStore()
  let { statisticalStatus, isPicking, pickApple } = appleStore
  let {
    appleInBasket: { quantity: notEatenQuantity, weight: notEatenWeight },
    appleEaten: { quantity: EatenQuantity, weight: EatenWeight }
  } = statisticalStatus

  const getAppleItems = () => {
    const apples = appleStore.apples.filter(apple => !apple.isEaten)
    return apples.length ? (
      apples.map(apple => {
        return <AppleItem apple={apple} key={apple.id}></AppleItem>
      })
    ) : (
      <div className='empty-tip' key='empty'>
        苹果篮子空空如也
      </div>
    )
  }
  return (
    <div className='appleBusket'>
      <div className='title'>苹果篮子</div>

      <div className='stats'>
        <div className='section'>
          <div className='head'>当前</div>
          <div className='content'>
            {notEatenQuantity}个苹果，{notEatenWeight}克
          </div>
        </div>
        <div className='section'>
          <div className='head'>已吃掉</div>
          <div className='content'>
            {EatenQuantity}个苹果，{EatenWeight}克
          </div>
        </div>
      </div>

      <div className='appleList'>{getAppleItems()}</div>

      <div className='btn-div'>
        <button
          className={isPicking ? 'disabled' : ''}
          onClick={() => pickApple()}
        >
          {isPicking ? '正在采摘...' : '摘苹果'}
        </button>
      </div>
    </div>
  )
}

export default observer(AppleBasket)
