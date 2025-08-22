interface PageHeadingPropes {
  title: string;
}

export function PageHeading({ title }: PageHeadingPropes) {
  return (
    <h2 className="scroll-m-20 pb-6 text-xl font-semibold tracking-tight first:mt-0">
      {title}
    </h2>
  );
}
