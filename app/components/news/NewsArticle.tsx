import convertDate from "../../../util/convertDate";
import styles from "./News.module.css";

interface INewsArticleProps {
  title: string;
  source: string;
  description: string;
  author: string | null;
  url: string;
  published_at: string;
}

const NewsArticle = ({
  url,
  title,
  source,
  published_at,
  description,
  author,
}: INewsArticleProps) => {
  return (
    <article
      className="
	  relative z-0 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
	  outline-[#dedede] hover:outline hover:outline-[2px] hover:outline-[#dedede]
	  hover:bg-[#f9f9f9] transition-all duration-150 ease-out"
    >
      <a target="_blank" rel="noreferrer" href={url}>
        <div className="px-12 flex items-center justify-center h-full">
          <main className="helper">
            <header>
              <div className="flex justify-between">
                <h2 className="font-bold">{source}</h2>
                <div></div>
                <span className="font-medium">{convertDate(published_at)}</span>
              </div>
              <h1 className="text-center font-bold text-[1.4rem] mt-6 mb-2">
                {title}
              </h1>
            </header>
            <p className={`text-center px-6 text-cutoff ${styles.textCutoff}`}>
              {description}
            </p>
            <footer className="font-semibold mt-6">
              Author: {author ? author : "Unkown"}
            </footer>
          </main>
        </div>
      </a>
    </article>
  );
};

export default NewsArticle;
