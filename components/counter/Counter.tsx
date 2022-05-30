import styles from '@/styles/counter/Counter.module.css'
import { useState } from 'react'; 
import { useAppDispatch, useAppSelector} from '@/hooks'
import { increment, decrement, 
     incrementAsync, selectCount } from '@/modules/counter/counterSlice'

export function Counter() {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');
  
    const incrementValue = Number(incrementAmount) || 0;
  
    return (
      <div>
        <div className={styles.row}>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />

          <button
            className={styles.asyncButton}
            onClick={() => dispatch(incrementAsync(incrementValue))}
          >
            Add Async
          </button>
        </div>
      </div>
    );
  }