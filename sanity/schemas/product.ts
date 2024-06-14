import { defineType, defineField } from "sanity";

export const productType = defineType({
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),

    defineField({
      title: "Product Images",
      name: "images",
      type: "array",
      of: [
        {
          title: "image",
          name: "image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      title: "Brand",
      name: "brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),

    defineField({
      title: "Category",
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),

    defineField({
      title: "Product details",
      name: "details",
      type: "array",
      of: [
        {
          title: "Detail",
          name: "detail",
          type: "object",
          fields: [
            {
              title: "Detail Name",
              name: "productDetailName",
              type: "string",
            },
            {
              title: "Value",
              name: "productDetailValue",
              type: "string",
            },
          ],
        },
      ],
    }),

    defineField({
      title: "Product description",
      name: "desc",
      type: "string",
    }),

    defineField({
      title: "Product Price",
      name: "price",
      type: "number",
    }),

    defineField({
      title: "isActive",
      name: "isActive",
      type: "boolean",
    }),

    defineField({
      title: "isRecommend",
      name: "isRecommend",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      title: "slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
  ],
});
