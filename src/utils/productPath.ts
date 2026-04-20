import { ShowcaseItem } from "../constants/jewelleryData";

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const buildProductPath = (
  item: Pick<ShowcaseItem, "category" | "subcategory" | "id" | "name">,
) => {
  const category = encodeURIComponent(item.category);
  const subcategory = encodeURIComponent(item.subcategory);
  const id = encodeURIComponent(item.id);
  const nameSlug = slugify(item.name);

  return `/category/${category}/${subcategory}/products/${id}/${nameSlug}`;
};
