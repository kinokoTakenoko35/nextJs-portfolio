//全ページ共通のテンプレート
import Head from "next/head";
import Link from "next/link";
//Import CSS Modules
import styles from "../components/layout.module.css";
import utilStyles from "../styles/utils.module.css";

const name = "kinoko's site";
export const siteTitle = "Portflio.";

//contents
export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      {/* Head メタタグ配置 */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>

      {/* ヘッダー */}
      <header className={styles.header}>
        {home ? (
          <>
            <h1 className="site-title">
              <Link href="/">
                <a href="/">{siteTitle}</a>
              </Link>
            </h1>
          </>
        ) : (
          <>
            <Link href="/"></Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>

      {/* メインセクション */}
      <main>
        {children}
        <img
          src="/images/Red-among-us.png"
          className={`${styles.headerHomeImage} ${utilStyles.borderCircle} `}
          alt="{name}"
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </main>
      {/* footerセクション */}
      <footer>&copy; {siteTitle}</footer>
      {/* ??? */}
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      {/* CSSを以下に記述することもできる。今は各要素に中てている */}
      {/*<style jsx>{`
        （ここに CSS を記述します）
      `}</style>
      <style jsx global>{`
        （ここに CSS を記述します）
      `}</style>*/}
    </div>
  );
}
