import convertDate from "../../../util/convertDate";
import styles from "./News.module.css";

const getData = async () => {
  const res = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&keywords=crypto&limit=5&sources=cnn&sort=published_desc`,
    { next: { revalidate: 30 } }
  );
  return res.json();
};

const News = async () => {
  const { data } = await getData();
  return (
    <section className={`${styles.container}`}>
      {data.map((article: any) => (
        <article
          key={article.title}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <picture>
            <img
              src={article.image}
              alt=""
              className="h-[50%] w-full object-cover"
            />
          </picture>
          <div className="px-12 flex items-center h-[50%]">
            <div>
              <header>
                <div className="flex justify-between">
                  <span className="font-bold">{article.source}</span>
                  <span className="font-medium">
                    {convertDate(article.published_at)}
                  </span>
                </div>
                <h1 className="text-center font-bold text-[1.4rem] mt-6 mb-2">
                  {article.title}
                </h1>
              </header>
              <p className="text-center px-6">{article.description}</p>
              <footer className="font-semibold mt-6">
                Author: {article.author ? article.author : "Unkown"}
              </footer>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default News;
