import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const INITIAL_BALANCE = 1000

const useBalanceStore = create(
    persist(
        (set, get) => ({
            balance: INITIAL_BALANCE,
            deductBalance: (amount) => {
                set((state) => ({
                    balance: Math.max(0, state.balance - amount)
                }))
            },
            getBalance: () => get().balance,
            resetBalance: () => set({ balance: INITIAL_BALANCE })
        }),
        {
            name: 'balance-storage'
        }
    )
)

export default useBalanceStore 