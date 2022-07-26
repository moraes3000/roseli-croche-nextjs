import { GraphQLClient } from "graphql-request";
import { Carousel } from "react-responsive-carousel";

import ImageGallery from 'react-image-gallery';

const graphcms = new GraphQLClient(
  "https://api-sa-east-1.graphcms.com/v2/cl1xj94cz06a201xu311yf706/master"
);

export async function getStaticProps({ params }) {
  const { produto } = await graphcms.request(
    `
    query detailProduct($slug: String!) {
      produto( where: {
        slug: $slug
          }) {
            id
            slug
            nome
             descricao{
              html
            }
            categorias{
              nome
            }
              banner{      
                url(transformation: {image: {resize: {height: 350, width: 350}}})
            }
          }
        }

  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      produto,
    },
  };
}

export async function getStaticPaths() {
  const { produtos } = await graphcms.request(`
    {
      produtos {
        slug               
      }
    }
  `);

  return {
    paths: produtos.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default function Detalhe({ produto }) {
  const img =
    produto.banner.map((foto) => (
      {
        original: foto.url,
        thumbnail: foto.url,
        originalHeight: 350,
      }
    ))

  return (

    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className='col-span-2 h-52 imagembanner'>
            < ImageGallery items={img} thumbnailPosition={'right'} slideInterval={2000} />

          </div>
          <div className='col-span-3'>
            <h1 className='m-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>{produto.nome}</h1>

            <div className='m-4 space-y-6'>

              {produto.descricao ?
                <div className='text-base text-gray-900' dangerouslySetInnerHTML={{ __html: produto.descricao.html }}></div>
                : ''}

              {produto.categorias.map((item) => (
                <button key={item.nome} className="m-1 py-1 px-2  rounded-lg shadow-md bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  {item.nome}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
