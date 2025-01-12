'use client'

import React, { createContext, useContext, useReducer } from 'react'

type Activity = {
  id: string
  name: string
  price: number
  quantity: number
  date: string
}

type State = {
  activities: Activity[]
}

type Action =
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'REMOVE_ACTIVITY'; payload: string }
  | { type: 'UPDATE_ACTIVITY'; payload: Activity }

const initialState: State = {
  activities: [],
}

const StoreContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | undefined>(undefined)

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, action.payload],
      }
    case 'REMOVE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== action.payload
        ),
      }
    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.map((activity) =>
          activity.id === action.payload.id ? action.payload : activity
        ),
      }
    default:
      return state
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export default StoreProvider

