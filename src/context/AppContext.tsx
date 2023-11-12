import React, { FC, createContext, useContext, useState } from "react"
import { Actor, HttpAgent, Identity } from "@dfinity/agent"

import { AuthClient } from "@dfinity/auth-client"
import { canisterId, idlFactory } from "../declarations/modernminds_backend"
import { getAuthClient, nfidLogin } from "./utils/auth"
import { canisterId as identityCanister } from "../declarations/internet_identity"

// const host = "https://icp0.io"
// const canisterId = "ctiya-peaaa-aaaaa-qaaja-cai"

const host = "http://localhost:4943"

interface LayoutProps {
  children: React.ReactNode
}

const days = BigInt(1)
const hours = BigInt(24)
const nanoseconds = BigInt(3600000000000)

type Context = {
  session: Session | null
  backendActor: any
  isAuthenticated: boolean
  isExploreOpen: boolean
  loginView: boolean
  registerView: boolean
  isLogedIn: boolean
  resetPasswordRequest: boolean
  storageInitiated: boolean,
  setStorageInitiated: (_value: boolean) => void,
  setIsAuthenticated: (_value: boolean) => void
  setLoginView: (_value: boolean) => void
  setRegisterView: (_value: boolean) => void
  setIsLogedIn: (_value: boolean) => void
  setExploreOpen: (_value: boolean) => void
  setResetPasswordRequest: (_value: boolean) => void
  login: () => void
  logout: () => void
  checkAuth: () => void
}

interface Session {
  identity: Identity | null
  address: string | null
}

const initialContext: Context = {
  session: null,
  backendActor: null,
  isAuthenticated: false,
  isExploreOpen: false,
  loginView: false,
  registerView: false,
  isLogedIn: false,
  resetPasswordRequest: false,
  storageInitiated: false,
  setStorageInitiated: (any): void => {},
  setExploreOpen: (any): void => {},
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

export const AuthContext = () => {
  return useContext(MagContext)
}

const AppContext: FC<LayoutProps> = ({ children }) => {
  const [storageInitiated, setStorageInitiated] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isExploreOpen, setExploreOpen] = useState(false)
  const [loginView, setLoginView] = useState(false)
  const [registerView, setRegisterView] = useState(false)
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [resetPasswordRequest, setResetPasswordRequest] = useState(false)
  const [session, setSession] = React.useState<Session | null>(null)

  const login = async () => {
    const authClient = await AuthClient.create({
      idleOptions: {
        idleTimeout: 1000 * 60 * 30,
        disableDefaultIdleCallback: true
      }
    })
    await authClient.login({
      // identityProvider: "https://identity.ic0.app/#authorize",
      identityProvider: `http://localhost:4943?canisterId=${identityCanister}`,
      onSuccess: () => {
        checkAuth()
      },
      maxTimeToLive: days * hours * nanoseconds
    })
  }

  const assignSession = (authClient: AuthClient) => {
    const identity = authClient.getIdentity()
    const address = identity.getPrincipal().toString()

    setSession({
      identity,
      address
    })
  }

  // const login = async () => {
  //   const authClient = await getAuthClient();
  //   const isAuthenticated = await authClient.isAuthenticated();
  //   if (isAuthenticated) return assignSession(authClient);

  //   await nfidLogin(authClient!);

  //   return checkAuth();
  // };

  const checkAuth = async () => {
    try {
      const authClient = await AuthClient.create()
      if (await authClient.isAuthenticated()) {
        setIsAuthenticated(true)
        assignSession(await getAuthClient())
      }
    } catch (error) {
      console.log("Error on check auth ", error)
    }
  }

  const logout = async () => {
    const authClient = await AuthClient.create()
    await authClient.logout()
    setIsAuthenticated(false)
    setIsAuthenticated(false)
    setIsLogedIn(false)
  }

  let agent = new HttpAgent({
    host: host,
    identity: session?.identity ? session.identity : undefined
  })

  agent.fetchRootKey()

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId
  })

  return (
    <MagContext.Provider
      value={{
        session,
        backendActor,
        isAuthenticated,
        isExploreOpen,
        setExploreOpen,
        loginView,
        registerView,
        isLogedIn,
        storageInitiated,
        setStorageInitiated,
        resetPasswordRequest,
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
