import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

export async function getStaticProps() {
  const graphcms = new GraphQLClient(
    'https://api-sa-east-1.graphcms.com/v2/cl1xj94cz06a201xu311yf706/master'
  );

  const { produtos } = await graphcms.request(
    `
    {
      produtos(orderBy: id_DESC) {
        slug
        nome
        thumbnail {
          url(transformation: {image: {resize: {height: 450, width: 450}}})
        }
        categorias {
          nome
          slug
        }
        banner {
          url
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

// interface ProdutosList {
//   produtos?: produtosProps[];
// }
// interface produtosProps {
//   slug: string;
//   nome: string;
//   thumbnail?: ThumbnailProps;
//   categorias?: CategoryProps[];
//   banner?:any
// }

// interface ThumbnailProps {
//   url: string;
// }

// interface CategoryProps {
//   nome: string
//   slug: string
// }
// interface BannerProps {
//   url: string

// }

export default function DetalhePosts({ produtos }) {
  return (
    <>
      <div className="bg-white" >
        <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {produtos ?
              produtos.map((item) => (
                <div key={item.slug} className="group bg-gray-200	p-3 shadow-2xl drop-shadow-md">
                  <Link href={`produtos/${item.slug}`}>
                    <a>
                      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 ">
                               {item.thumbnail? (
                            <img src={ item.thumbnail?.url}  className="w-full h-36 object-center object-cover group-hover:opacity-75"/>
                          
                          ) : (
                            item.banner?.slice(0,1).map((banner) =><img src={ banner.url} key={banner.url} className="w-full h-36 object-center object-cover group-hover:opacity-75"/>)
                          )}
                          </div>
                      <h3 className="text-2xl font-extrabold tracking-tight mt-4 text-sm text-gray-700">
                        {item.nome}
                      </h3>
                    </a>
                  </Link>
                  {/* <p className="mt-1 text-lg font-medium text-gray-900">
                    {item.categorias?.map((categorias) => (
                      <button key={categorias.nome} className="m-1 py-1 px-2  rounded-lg shadow-md bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        {categorias.nome}
                      </button>
                    ))}
                  </p> */}
                </div>
              )) : ''}
          </div>
        </div>
      </div>
    </>
  );
}


