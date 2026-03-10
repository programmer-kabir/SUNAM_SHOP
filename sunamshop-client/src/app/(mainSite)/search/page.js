export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.query || "";

  console.log(query);

  return <div className="max-w-7xl mx-auto px-4 py-10"></div>;
}
