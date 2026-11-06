async function Page({ params }: RouteParams) {
  const { questionId } = await params;
  return <div> question {questionId}</div>;
}

export default Page;
