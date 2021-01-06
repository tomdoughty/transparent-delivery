import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";

export type HomeContent = {
  readonly title: string;
  readonly body: string;
  readonly date: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly services: HomeService[];
};

export type HomeService = {
  readonly name: string;
  readonly description: string;
};

let postCache: HomeContent;

export function getHomeContent(): HomeContent {
  if (postCache) {
    return postCache;
  }

  // Read markdown file as string
  const fileContents = fs.readFileSync('src/pages/index.mdx', "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });

  const matterData = matterResult.data as {
    title: string;
    body: string;
    date: string;
    slug: string;
    tags?: string[];
    services: HomeService[];
  };

  // Sort posts by date
  postCache = matterData;
  return postCache;
}
