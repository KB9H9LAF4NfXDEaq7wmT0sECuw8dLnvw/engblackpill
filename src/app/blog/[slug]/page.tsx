import fs from "fs";
import { marked } from "marked";
import path from "path";
import matter from "gray-matter";
import { redirect } from "next/navigation";

const getFrontMatter = () => {
  const directoryPath = path.join(process.cwd(), "posts");

  const slugs = fs
    .readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fn) => {
      const fullPath = directoryPath + "/" + fn;
      const content = fs.readFileSync(fullPath, "utf-8");
      const data = matter(content);
      return data;
    });
  return slugs;
};

export async function generateStaticParams() {
  const slugs = getFrontMatter();
  const params = slugs.map(({ data: { slug } }) => {
    return { slug };
  });

  return params;
}

type BlogPageParams = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({
  params: { slug: slugParam },
}: BlogPageParams) {
  const blogFiles = getFrontMatter();
  const blog = blogFiles.find(({ data: { slug } }) => slug === slugParam);
  if (!blog) {
    redirect("/");
  }

  const {
    data: { title, date, filePath },
  } = blog;
  const { content } = blog;
  const parsedContent = marked.parse(content);

  return (
    <div>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <h2>{date}</h2>
      </div>
      <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
    </div>
  );
}
