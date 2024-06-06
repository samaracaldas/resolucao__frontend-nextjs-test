/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */


import { GetStaticProps } from 'next'; // Importanção do GetStaticProps do Next.js para gerar propriedades estáticas
import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';

/**
 O estado das cidades (list) era gerenciado utilizando useState, e a função getList era chamada dentro de um useEffect para buscar
 os dados das cidades quando o componente montava. Isso é adequado para páginas dinâmicas, mas para tornar a página estática, é preciso
 remover o estado local e a lógica de efeito. */



// Define a estrutura das propriedades esperadas pelo componente. 
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

/** A função getList, que anteriormente buscava os dados das cidades, foi movida para dentro de getStaticProps. Isso garante que os dados sejam
 buscados apenas no momento da construção da página, não durante a renderização. A propriedade list é passada para o componente Lista como uma 
 propriedade estática.*/

export const getStaticProps: GetStaticProps = async () => {
  async function getList(): Promise<ICity[]> {
    try {
      const response = await fetch('http://localhost:8080/api/cities/10');  // Chamada à API para obter a lista de cidades
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