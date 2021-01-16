//fetching data from the file system.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
//マークダウンのコンテンツをレンダーするために、remark ライブラリ
import remark from "remark";
import html from "remark-html";
//Fetch
import fetch from 'node-fetch';

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // d を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, "");

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents);

    // データを id と合わせる
    return {
      id,
      ...matterResult.data,
    };
  });
  // 投稿を日付でソートする
  return allPostsData.sort((a : any, b : any) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

//非同期処理なので関数にasyncを付与
export async function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  //const repoUrl = "https://api.github.com/repos/kinokoTakenoko35/nextJs-portfoli/contents/posts"
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  //投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents);

  //マークダウンを HTML 文字列に変換するために remark を使う
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  //データを id と組み合わせる
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
