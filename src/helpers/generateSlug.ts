import slugify from 'slugify';

export const generateSlug = async (title: string, hash?: string) => {
  const pre_slug = `${title} ${hash}`;
  return await slugify(pre_slug, { lower: true });
};
