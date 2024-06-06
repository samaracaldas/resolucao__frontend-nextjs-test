import { useState, useEffect } from 'react';


type CounterProps = {
  initialCount: number; 
  // Adicão das props que serão utilizadas nos useEffects para chamar as funções de callback nos momentos corretos.
  onCounterMount: () => void; 
  onCounterUnmount: () => void;
  onCounterUpdate: (count: number) => void; 
};

// Declaração do componente Counter como uma função componente do React
const Counter: React.FC<CounterProps> = ({
  initialCount,
  onCounterMount,
  onCounterUnmount,
  onCounterUpdate,
}) => {
  const [count, setCount] = useState(initialCount);
  // Incremento do contador
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1); 
  };

  // Efeito executado quando o componente é montado ou atualizado
  useEffect(() => {
    onCounterMount(); // Chama a função de montagem do contador
    return () => {
      onCounterUnmount(); // Chama a função de desmontagem do contador quando o componente é desmontado
    };
  }, [onCounterMount, onCounterUnmount]); 

  // Efeito executado quando o estado do contador é alterado
  useEffect(() => {
    onCounterUpdate(count); // Chama a função de atualização do contador com o valor atualizado
    if (count === 10) {
      onCounterUnmount(); // Se o contador atingir 10, chama a função de desmontagem do contador
    }
  }, [count, onCounterUpdate, onCounterUnmount]); 


  // Se o contador atingir 10, o componente não é renderizado
  if (count === 10) return null;

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={handleIncrement}>Incrementar +</button>
    </div>
  );
};

export { Counter }; 