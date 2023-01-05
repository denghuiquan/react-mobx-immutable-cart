import { createContext, useContext } from 'react'
import AppleStore from './appleStore'

class RootStore {
  constructor () {
    this.appleStore = new AppleStore()
  }
}

const rootStore = new RootStore()

const RootContext = createContext()

const RootStoreProvider = ({ children }) => {
  return (
    <RootContext.Provider value={rootStore}>{children}</RootContext.Provider>
  )
}

const useRootStore = () => {
  return useContext(RootContext)
}

export default rootStore
export { RootStoreProvider, useRootStore }
