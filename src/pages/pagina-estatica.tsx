/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { GetStaticProps } from 'next';
import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';

interface ListaProps {
  list: Array<ICity>;
}

const Lista: React.FC<ListaProps> = ({ list }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de cidades</h2>
        <div data-list-container>
          {list.map((city) => (
            <div data-list-item key={city.id}>
              {city.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Obtendo propriedades estáticas
export const getStaticProps: GetStaticProps = async () => {
  async function getList(): Promise<ICity[]> {
    try {
      const response = await fetch('http://localhost:8080/api/cities/10'); 
      const data = await response.json();

      if (!response.ok) throw new Error('Erro ao obter os dados');

      return data;
    } catch (error) {
      console.error(error);
      return [
        {
          id: new Date().getTime().toString(),
          name: 'Erro ao obter os dados',
        },
      ];
    }
  }

  const list = await getList();

  return {
    props: {
      list,
    },
    revalidate: 60, // Revalidar a página a cada 1 minuto
  };
};

export default Lista;