import styles from "./News.module.css";
import NewsArticle from "./NewsArticle";

interface INewsArticleProps {
  title: string;
  source: string;
  description: string;
  author: string | null;
  url: string;
  published_at: string;
}

// const getData = async () => {
//   const res = await fetch(
//     `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&keywords=crypto&limit=5&sort=published_desc`,
//     { next: { revalidate: 10 * (60 * 1000) } }
//   );
//   return res.json();
// };

const dummyData: INewsArticleProps[] = [
  {
    author: "Frank Eleanya",
    title: "Crypto payment firm takes Christmas to Lagos suburb",
    description:
      "Alya Cares the corporate social responsibility arm of ALYA-ALYATTES, a crypto payment company, hosted children in the Onigbongbo community in Ikeja, Lagos State to a festive/Christmas jamboree for the debut of the Impact 500 program. The Impact 500 program is an initiative of Alya Care created to provide free healthcare to women, children, and the [&#8230;]read more Crypto payment firm takes Christmas to Lagos suburb",
    url: "https://businessday.ng/technology/article/crypto-payment-firm-takes-christmas-to-lagos-suburb/",
    source: "Businessday | News You Can Trust",
    published_at: "2023-01-03T09:56:48+00:00",
  },
  {
    author: "Vivian Michael",
    title:
      "Public warned to thoroughly investigate crypto-projects to protect against fraud",
    description:
      "By Robert A. Emmanuel robert.emmanuel@antiguaobserver.com Individuals are being encouraged to do thorough research to protect themselves against fraudulent cryptocurrency exchanges. The advice comes from Chief Executive Officer of the Eastern Caribbean Securities Regulatory Commission (ECSRC), Alousia Faisal. Following the collapse of FTX Trading Ltd (simply known as “FTX”) and subsequent investigations against former CEO Sam [&#8230;]",
    url: "https://antiguaobserver.com/public-warned-to-thoroughly-investigate-crypto-projects-to-protect-against-fraud/",
    source: "antiguaobserver",
    published_at: "2023-01-03T08:00:00+00:00",
  },
  {
    author: "Bitcoin News Editor",
    title:
      "Bitcoin At $40K By Summer? ShapeShift CEO Thinks It’s Possible Even As Tim Draper Sticks To Bigger Estimate",
    description:
      "Erik Voorhees, the founder and CEO of the popular cryptocurrency exchange ShapeShift, expressed optimism about a potential resurgence of Bitcoin’s (CRYPTO: BTC) price during a Bankless interview on &#8230; Read Full StoryThe post Bitcoin At $40K By Summer? ShapeShift CEO Thinks It&#8217;s Possible Even As Tim Draper Sticks To Bigger Estimate appeared first on ForexTV.",
    url: "https://forextv.com/bitcoin-news/bitcoin-at-40k-by-summer-shapeshift-ceo-thinks-its-possible-even-as-tim-draper-sticks-to-bigger-estimate/",
    source: "forextv",
    published_at: "2023-01-03T07:44:03+00:00",
  },
  {
    author: "Bitcoin News Editor",
    title:
      "Bitcoin Price Prediction for Today, January 2: BTC Price Remains Flat Above $16K",
    description:
      "Bitcoin&#8217;s price movement has been flat as BTC price remains flat above $16K. The crypto asset has been limited between $16,300 and $16,800. Read Full StoryThe post Bitcoin Price Prediction for Today, January 2: BTC Price Remains Flat Above $16K appeared first on ForexTV.",
    url: "https://forextv.com/bitcoin-news/bitcoin-price-prediction-for-today-january-2-btc-price-remains-flat-above-16k/",
    source: "forextv",
    published_at: "2023-01-03T06:29:03+00:00",
  },
  {
    author: null,
    title:
      "Cameron Winklevoss accuses crypto exec of 'disingenuous' behavior as Gemini funds remain frozen",
    description:
      "Cameron Winklevoss accused fellow digital asset executive Barry Silbert of 'bad faith stall tactics' relating to the nearly one billion dollars of assets Silbert's company owes Gemini customers.",
    url: "https://www.dailymail.co.uk/news/article-11593381/Cameron-Winklevoss-accuses-crypto-exec-disingenuous-behavior-Gemini-funds-remain-frozen.html?ns_mchannel=rss&ns_campaign=1490&ito=1490",
    source: "Mail",
    published_at: "2023-01-03T06:11:28+00:00",
  },
];

const News = async () => {
  // const { data } = await getData();

  return (
    <div className="h-[30.5rem] sm:h-[55.5rem] lg1:h-[40.5rem] overflow-hidden">
      <section
        className={`${styles.container} px-4 xs:px-8 sm:px-10 pb-10 pt-[2px] snap-x snap-mandatory`}
      >
        {dummyData.map((article: INewsArticleProps) => (
          <NewsArticle
            key={article.title}
            url={article.url}
            title={article.title}
            source={article.source}
            published_at={article.published_at}
            description={article.description}
            author={article.author}
          />
        ))}
      </section>
    </div>
  );
};

export default News;
