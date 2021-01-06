import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import { getHomeContent, HomeService } from "../lib";
import { listTags } from "../lib/tags";

type Props = {
  title: string;
  body: string;
  date: string;
  slug: string;
  tags?: string[];
  services: HomeService[];
};

export default function Index({ title, body, date, slug, tags, services }: Props) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div>
          <h1>
            { title }
          </h1>
          <ul>
            { services.map((service) => (
              <li key={ service.name } >
                <p>{ service.name }</p>
                <p>{ service.description} </p>
              </li>
            ))}
          </ul>
          <span className="handle">@nextjs-netlify-blog</span>
          <h2>A blog template with Next.js and Netlify.</h2>
          <SocialList />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const content = getHomeContent();
  const tags = listTags();
  return {
    props: {
      ...content,
      tags,
    },
  };
};
