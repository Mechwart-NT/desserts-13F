import { useEffect, useState } from 'react'
import type { Dessert } from './types'
import Header from './components/Header/Header'
import DessertList from './components/DessertList/DessertList'
import Cart from './components/Cart/Cart'
import OrderConfirmationModal from './components/OrderConfirmationModal/OrderConfirmationModal'
import styles from './App.module.css'
import { loadDesserts } from './data/loadDesserts'

const App = () => {
  const [desserts, setDesserts] = useState<Dessert[]>([])
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    loadDesserts()
      .then((loadedDesserts) => {
        if (isMounted) {
          setDesserts(loadedDesserts)
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setLoadError(
            error instanceof Error ? error.message : 'Failed to load desserts',
          )
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true)
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.layout}>
        {loadError ? (
          <p role="alert">{loadError}</p>
        ) : (
          <DessertList desserts={desserts} />
        )}

        <div className={styles.cartColumn}>
          <Cart onConfirm={handleConfirmOrder} />
        </div>
      </main>

      {isOrderConfirmed && (
        <OrderConfirmationModal />
      )}
    </div>
  )
}

export default App