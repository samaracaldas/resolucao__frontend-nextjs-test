/**
 * Ciclo de Vida
 *
 * - No evento de montagem deste component, deve ser registrados os seguintes events listeners:
 *  	- onCounterMount
 * 		- onCounterUnmount
 * 		- onCounterUpdate
 * - Os eventos devem ser disparados no componente Counter, seguindo o ciclo de vida do mesmo
 * - Ao atualizar o contador, deverá ser passado o valor atualizado no evento onCounterUpdate, e quando o valor
 * 		chegar a 10, o Counter deve ser desmontado.
 *
 * (Opcional)
 * - Ao observar os eventos, você verá que eles são disparados mais de uma vez, isso acontece porque o componente
 * 		Counter é desmontado e montado novamente, e os eventos são registrados novamente, isto é um problema comum
 * 		no nextjs, você deve resolver este problema.
 */

import { GetServerSideProps } from 'next/types';

import styles from '@/styles/ciclo-de-vida.module.css'; 
import { Counter } from '@/components/Counter'; 
import { useState } from 'react'; 


type CicloDeVidaProps = {
  initialCount: number; 
};


export default function CicloDeVida({ initialCount }: CicloDeVidaProps) {
  const [showCounter, setShowCounter] = useState(false);

  const handleOcultCounterClick = () => {
    setShowCounter((prevState) => !prevState);
  };

  /** 
  - Os event listeners estavam sendo adicionados utilizando window.addEventListener,o que não é o padrão para lidar com eventos personalizados no React.
  - Os eventos foram transferidos para o componente Counter, como especificado nas instruções, portanto, o hook 'useEffect' não é mais necessário e foi
    substituido por callbacks que reagem ao eventos do clico de vida do componente Counter e executa as ações apropriadas em resposta a esses eventos. */
  const handleCounterMount = () => {
    console.log('onCounterMount');
  };

  // Função de callback chamada quando o contador é desmontado
  const handleCounterUnmount = () => {
    console.log('onCounterUnmount');
  };

  // Função de callback chamada quando o contador é atualizado
  const handleCounterUpdate = (count: number) => {
    console.log('onCounterUpdate', count);
  };

  return (
    <div className={styles.container}> 
      <div>
        <button type="button" onClick={handleOcultCounterClick}>
          {showCounter ? 'Ocultar contador' : 'Mostrar contador'}
        </button>

        {showCounter && (
          <>
            <h1>Exemplo de Ciclo de vida</h1>

            <div data-content>
              <Counter
                initialCount={initialCount}
                onCounterMount={handleCounterMount}
                onCounterUnmount={handleCounterUnmount}
                onCounterUpdate={handleCounterUpdate}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<CicloDeVidaProps> = async () => {
  return {
    props: {
      initialCount: 0, 
    },
  };
};
