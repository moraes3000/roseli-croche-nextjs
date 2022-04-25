import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';
import CartProduto from '../../../components/cardProduto';

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://api-sa-east-1.graphcms.com/v2/cl1xj94cz06a201xu311yf706/master'
  );

  const { produtos } = await graphcms.request(
    `
      { 
       produtos(orderBy: id_DESC,  where: {categorias_some: {_search: "pano-de-prato"}}) {
          slug
          nome
          thumbnail {     
            url(transformation: {image: {resize: {height: 450, width: 450}}})
          }
          categorias{
            nome
            slug
          }
          
        }
      }
    `
  );

  return {
    props: {
      produtos,
    },
  };
}
interface ProdutosList {
  produtos?: produtosProps[];
}
interface produtosProps {
  slug: string;
  nome: string;
  thumbnail: ThumbnailProps;
  categorias?: CategoryProps[];
}

interface ThumbnailProps {
  url: string;
}

interface CategoryProps {
  nome: string
  slug: string
}

export default function PanoDePrato({ produtos }: ProdutosList) {

  return (
    <>
      <CartProduto produtos={produtos} />
    </>
  );
}
