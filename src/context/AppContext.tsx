import React, { FC, createContext, useContext, useState } from "react"
import { Actor, HttpAgent } from "@dfinity/agent"

import { AuthClient } from "@dfinity/auth-client"
import { idlFactory } from "../declarations/modernminds_backend"

const host = "https://icp0.io"
// const host = "http://localhost:4943";
const canisterId = "ctiya-peaaa-aaaaa-qaaja-cai"

interface LayoutProps {
  children: React.ReactNode
}

const days = BigInt(1)
const hours = BigInt(24)
const nanoseconds = BigInt(3600000000000)

type Context = {
  identity: any
  backendActor: any
  isAuthenticated: boolean
  isExploreOpen: boolean
  loginView: boolean
  registerView: boolean
  isLogedIn: boolean
  resetPasswordRequest: boolean
  setIdentity: (_value: any) => void
  setIsAuthenticated: (_value: boolean) => void
  setLoginView: (_value: boolean) => void
  setRegisterView: (_value: boolean) => void
  setIsLogedIn: (_value: boolean) => void
  setResetPasswordRequest: (_value: boolean) => void
  login: () => void
  logout: () => void
  checkAuth: () => void
}

const initialContext: Context = {
  identity: null,
  backendActor: null,
  isAuthenticated: false,
  isExploreOpen: false,

  loginView: false,
  registerView: false,
  isLogedIn: false,
  resetPasswordRequest: false,

  setIdentity: (any): void => {},
  setIsAuthenticated: (any): void => {},
  setLoginView: (any): void => {},
  setRegisterView: (any): void => {},
  setIsLogedIn: (any): void => {},
  setResetPasswordRequest: (any): void => {},
  login: (): void => {},
  logout: (): void => {},
  checkAuth: (): void => {}
}
const MagContext = createContext<Context>(initialContext)

export const appContext = () => {
  return useContext(MagContext)
}

const AppContext: FC<LayoutProps> = ({ children }) => {
  const [identity, setIdentity] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isExploreOpen, setIsExploreOpen] = useState(false)
  const [loginView, setLoginView] = useState(false)
  const [registerView, setRegisterView] = useState(false)
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [resetPasswordRequest, setResetPasswordRequest] = useState(false)

  const login = async () => {
    const authClient = await AuthClient.create({
      idleOptions: (typeof indexedDB !== 'undefined') ? {
        idleTimeout: 1000 * 60 * 30,
        disableDefaultIdleCallback: true
      } : null
    })
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      // identityProvider: `http://localhost:4943?canisterId=${canisterId}`,
      onSuccess: () => {
        checkAuth()
      },
      maxTimeToLive: days * hours * nanoseconds
    })
  }

  const checkAuth = async () => {
    const authClient = await AuthClient.create()
    if (await authClient.isAuthenticated()) {
      setIsAuthenticated(true)
      const identity = authClient.getIdentity()
      setIdentity(identity)
      setIsLogedIn(true)
    }
  }

  const logout = async () => {
    const authClient = await AuthClient.create()
    await authClient.logout()
    setIsAuthenticated(false)
    setIdentity(null)
    setIsAuthenticated(false)
    setIsLogedIn(false)
  }

  let agent = new HttpAgent({
    host: host,
    identity: identity
  })

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId
  })

  return (
    <MagContext.Provider
      value={{
        identity,
        backendActor,
        isAuthenticated,
        isExploreOpen,
        loginView,
        registerView,
        isLogedIn,
        resetPasswordRequest,
        setIdentity,
        setIsAuthenticated,
        setLoginView,
        setRegisterView,
        setIsLogedIn,
        setResetPasswordRequest,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </MagContext.Provider>
  )
}

export default AppContext
