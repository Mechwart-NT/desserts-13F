import { useCartStore } from '../../data/CartStore'
import type { Dessert } from '../../types'
import DessertCard from '../DessertCard/DessertCard'
import styles from './DessertList.module.css'

interface DessertListProps {
  desserts: Dessert[]
}

const DessertList = ({ desserts }: DessertListProps) => {
  const {items, decrementItem,incrementItem,addItem, removeItem} = useCartStore()

  const getQuantity = (name: string) =>
    items.find((item) => item.name === name)?.quantity ?? 0

  const decrementOrRemove = (name: string) =>{
    if(getQuantity(name) === 1){
      removeItem(name)
    }else{
      decrementItem(name)
    }
  }

  return (
    <ul className={styles.list}>
      {desserts.map((dessert) => (
        <li key={dessert.name}>
          <DessertCard
            dessert={dessert}
            quantity={getQuantity(dessert.name)}
            onAdd={() => addItem(dessert)}
            onIncrement={() => incrementItem(dessert.name)}
            onDecrement={() => decrementOrRemove(dessert.name)}
          />
        </li>
      ))}
    </ul>
  )
}

export default DessertList
