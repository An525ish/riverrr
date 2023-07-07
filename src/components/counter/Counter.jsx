import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import { decrement, increment, reset, startFromValue } from '../../slices/counter'
import { useState } from 'react'

const Counter = () => {
  const counter = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  const [startValue, setstartValue] = useState('')
  const [counterName, setCounterName] = useState('')

  const [counterCards, setCounterCards] = useState([1]);

  const handleAdd = () => {
    const newCard = {
      id: counterCards.length + 1, 
      counterName: "",
      counter: 0,
      startValue: 0
    };

    setCounterCards([...counterCards, newCard]);
  };

  const handleRemove = (id) => {
    const updatedCards = counterCards.filter((card) => card.id !== id);
    setCounterCards(updatedCards);
  };

  return (
    <>
      {counterCards.map((card) => (
          <div className="counter" key={card.id}>
            <button className='add' onClick={handleAdd}> Add </button>
            <button className='cross' onClick={()=> handleRemove(card.id)}>X</button>
            <div className="display">
              <div className='label'>{counterName}</div>
              <input type="text" name="display" value={counter} disabled />
            </div>
            <div className='operators'>
              <button onClick={() => dispatch(decrement())}>Dec by -1</button>
              <button onClick={() => dispatch(increment())}>Inc by +1</button>
            </div>
            <div className='features'>
              <button onClick={() => dispatch(reset())}>Reset</button>
              <div>
                <input type="text" value={startValue} onChange={(e) => setstartValue(e.target.value)} />
                <button onClick={() => { dispatch(startFromValue(+startValue)) }}>Start Value</button>
              </div>
              <div className=''>
                <input type="text" onChange={(e) => setCounterName(e.target.value)} />
                <button>Counter Name</button>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
  export default Counter