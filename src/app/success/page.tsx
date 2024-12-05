export default async function SuccessPercentage({
  searchParams,
}: {
  searchParams: { rate: string };
}) {
  const result = searchParams;

  return <div>{result.rate}</div>;
}
