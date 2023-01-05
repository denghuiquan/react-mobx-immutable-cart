import { RootStoreProvider } from './store/rootStore'
import AppleBasket from './components/AppleBasket'
function App () {
  return (
    <RootStoreProvider>
      <AppleBasket></AppleBasket>
    </RootStoreProvider>
  )
}

export default App
