//PageをImport
import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import blogStyle from "../styles/blog.module.css";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  return (
    //inside div
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Name]</p>
        <p>
          This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>
        </p>
      </section>
      <section className={`${utilStyles.headingLg} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, data, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <div className={blogStyle.blogTitle}>{title}</div>
              <br />
              {id}
              <br />
              {data}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  // ファイルシステムや API、DB などから外部データを取得する
  const allPostsData = getSortedPostsData();
  // `props` キーに対応する値が `Home` コンポーネントに渡される
  return {
    props: {
      allPostsData,
    },
  };
}
