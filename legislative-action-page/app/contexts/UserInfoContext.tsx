'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type UserInfo = {
  name: string
  email: string
  address: string
  city: string
  state: string
  zip: string
}

type UserInfoContextType = {
  userInfo: UserInfo
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>
  isFormComplete: boolean
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined)

export const UserInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: 'TN',
    zip: '',
  })

  const [isFormComplete, setIsFormComplete] = useState(false)

  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo')
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo))
    }
  }, [])

  useEffect(() => {
    const isComplete = Object.values(userInfo).every(value => value.trim() !== '')
    setIsFormComplete(isComplete)
    if (isComplete) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }, [userInfo])

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, isFormComplete }}>
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfo = () => {
  const context = useContext(UserInfoContext)
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a UserInfoProvider')
  }
  return context
}

