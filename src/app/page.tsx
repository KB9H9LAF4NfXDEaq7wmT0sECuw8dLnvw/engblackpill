import Image from "next/image";
import { getFrontMatter } from "./blog/[slug]/page";

export default function Home() {
  const frontMatter = getFrontMatter();
  return (
    <main>
      <ul>
        {frontMatter.map(({ data: { title, slug } }) => (
          <a key={slug} href={`/blog/${slug}`}>
            <li>{title}</li>
          </a>
        ))}
      </ul>
    </main>
  );
}
