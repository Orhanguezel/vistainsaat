type FaqItem = {
  q: string;
  a: string;
};

export function FaqSection({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="section-py border-t border-(--color-border)">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h2
          className="text-2xl font-bold text-(--color-text-primary) lg:text-3xl"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h2>
        <dl className="mt-8 divide-y divide-(--color-border)">
          {items.map((item) => (
            <div key={item.q} className="py-5">
              <dt className="text-base font-semibold text-(--color-text-primary)">
                {item.q}
              </dt>
              <dd className="mt-2 text-sm leading-7 text-(--color-text-secondary)">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
