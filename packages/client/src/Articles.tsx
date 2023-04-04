
import {articles, item} from './Articles.module.scss'
import {gql, useLazyQuery, useQuery} from "@apollo/client";


const GET_ARTICLES = gql`
    query Articles {
        articles {
            id
            text
        }
    }
`;

interface Article {
  id: string
  text: string
}


function Articles() {
  const {loading, error, data} = useQuery<{ articles: Article[] }>(GET_ARTICLES);

  return (
    <div className={articles}>
      <h1>Articles</h1>
      {data?.articles.map(article => (
        <div className={item} key={article.id}>{article.text}</div>
      ))}
    </div>
  )
}

export default Articles
