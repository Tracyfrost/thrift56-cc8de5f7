import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE = "https://thrift56.com";
const DEFAULT_IMAGE = `${SITE}/thrift56-logo-clean.png`;

const Seo = ({ title, description, path, image, type = "website", jsonLd }: SeoProps) => {
  const url = `${SITE}${path}`;
  const img = image || DEFAULT_IMAGE;
  const ld = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {ld.map((entry, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(entry)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
