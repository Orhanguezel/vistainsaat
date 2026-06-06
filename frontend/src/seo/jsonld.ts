type Thing = Record<string, unknown>;

export const ORGANIZATION_ID = 'https://www.vistainsaat.com/#organization';
export const LOCAL_BUSINESS_ID = 'https://www.vistainsaat.com/#localbusiness';

type PostalAddressInput =
  | string
  | {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };

type OpeningHoursInput =
  | string
  | {
      dayOfWeek: string[];
      opens: string;
      closes: string;
    }
  | Array<{
      dayOfWeek: string[];
      opens: string;
      closes: string;
    }>;

function normalizeAddress(address?: PostalAddressInput): unknown {
  if (!address) return undefined;
  if (typeof address === 'string') return address;

  return {
    '@type': 'PostalAddress',
    ...address,
  };
}

function normalizeOpeningHours(openingHours?: OpeningHoursInput): unknown {
  if (!openingHours) return undefined;
  if (typeof openingHours === 'string') return openingHours;

  const values = Array.isArray(openingHours) ? openingHours : [openingHours];
  return values.map((item) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: item.dayOfWeek,
    opens: item.opens,
    closes: item.closes,
  }));
}

export function graph(items: Thing[]): Thing {
  return { '@context': 'https://schema.org', '@graph': items };
}

export function org(input: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: string;
  sameAs?: string[];
}): Thing {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: input.name,
    url: input.url,
    ...(input.logo
      ? { logo: { '@type': 'ImageObject', url: input.logo, width: 512, height: 512 } }
      : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.email ? { email: input.email } : {}),
    ...(input.telephone ? { telephone: input.telephone } : {}),
    ...(input.address ? { address: input.address } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
  };
}

export function website(input: {
  name: string;
  url: string;
  description?: string;
}): Thing {
  return {
    '@type': 'WebSite',
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
  };
}

export function localBusiness(input: {
  name: string;
  url: string;
  type?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: PostalAddressInput;
  openingHours?: OpeningHoursInput;
  geo?: { latitude: string | number; longitude: string | number };
  priceRange?: string;
  areaServed?: string;
  image?: string;
  sameAs?: string[];
}): Thing {
  return {
    '@type': input.type || 'GeneralContractor',
    '@id': LOCAL_BUSINESS_ID,
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    ...(input.email ? { email: input.email } : {}),
    ...(input.telephone ? { telephone: input.telephone } : {}),
    ...(input.address ? { address: normalizeAddress(input.address) } : {}),
    ...(input.openingHours ? { openingHoursSpecification: normalizeOpeningHours(input.openingHours) } : {}),
    ...(input.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: input.geo.latitude,
            longitude: input.geo.longitude,
          },
        }
      : {}),
    ...(input.priceRange ? { priceRange: input.priceRange } : {}),
    ...(input.areaServed
      ? { areaServed: { '@type': 'AdministrativeArea', name: input.areaServed } }
      : {}),
    ...(input.image ? { image: input.image } : {}),
    ...(input.sameAs?.length ? { sameAs: input.sameAs } : {}),
  };
}

export function product(input: {
  name: string;
  description?: string;
  image?: string;
  url?: string;
  brand?: string;
}): Thing {
  return {
    '@type': 'Product',
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: input.image } : {}),
    ...(input.url ? { url: input.url } : {}),
    ...(input.brand
      ? { brand: { '@type': 'Brand', name: input.brand } }
      : {}),
  };
}

export function article(input: {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  publisher?: { '@id': string } | {
    name: string;
    logo?: string;
  };
  mainEntityOfPage?: string;
  articleSection?: string;
  inLanguage?: string;
}): Thing {
  return {
    '@type': 'Article',
    headline: input.headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: input.image } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.author
      ? { author: { '@type': 'Person', name: input.author } }
      : {}),
    ...(input.mainEntityOfPage
      ? { mainEntityOfPage: { '@type': 'WebPage', '@id': input.mainEntityOfPage } }
      : {}),
    ...(input.articleSection ? { articleSection: input.articleSection } : {}),
    ...(input.inLanguage ? { inLanguage: input.inLanguage } : {}),
    ...(input.publisher
      ? '@id' in input.publisher
        ? { publisher: input.publisher }
        : {
          publisher: {
            '@type': 'Organization',
            name: input.publisher.name,
            ...(input.publisher.logo ? { logo: input.publisher.logo } : {}),
          },
        }
      : {}),
  };
}

export function breadcrumb(
  items: { name: string; url: string }[],
): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function itemList(
  items: { name: string; url: string }[],
): Thing {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function imageObject(input: {
  contentUrl: string;
  name?: string;
  caption?: string;
  width?: number;
  height?: number;
  dateModified?: string;
}): Thing {
  return {
    '@type': 'ImageObject',
    contentUrl: input.contentUrl,
    ...(input.name ? { name: input.name } : {}),
    ...(input.caption ? { caption: input.caption } : {}),
    ...(input.width ? { width: input.width } : {}),
    ...(input.height ? { height: input.height } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function imageGallery(input: {
  name: string;
  description?: string;
  url: string;
  images: Thing[];
}): Thing {
  return {
    '@type': 'ImageGallery',
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    hasPart: input.images,
  };
}

export function collectionPage(input: {
  name: string;
  description?: string;
  url: string;
  mainEntity?: Thing;
}): Thing {
  return {
    '@type': 'CollectionPage',
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    ...(input.mainEntity ? { mainEntity: input.mainEntity } : {}),
  };
}

export function service(input: {
  name: string;
  description?: string;
  url: string;
  image?: string;
  provider?: string | { '@id': string };
  serviceType?: string;
  areaServed?: string;
}): Thing {
  return {
    '@type': 'Service',
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: input.image } : {}),
    ...(input.provider
      ? {
          provider:
            typeof input.provider === 'string'
              ? { '@type': 'Organization', name: input.provider }
              : input.provider,
        }
      : {}),
    ...(input.serviceType ? { serviceType: input.serviceType } : {}),
    ...(input.areaServed
      ? { areaServed: { '@type': 'AdministrativeArea', name: input.areaServed } }
      : {}),
  };
}

export function faq(items: { q: string; a: string }[]): Thing {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function creativeWork(input: {
  name: string;
  description?: string;
  url: string;
  image?: string;
  dateCreated?: string;
  locationCreated?: string;
}): Thing {
  return {
    '@type': 'CreativeWork',
    name: input.name,
    url: input.url,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: input.image } : {}),
    ...(input.dateCreated ? { dateCreated: input.dateCreated } : {}),
    ...(input.locationCreated ? { locationCreated: { '@type': 'Place', name: input.locationCreated } } : {}),
  };
}
