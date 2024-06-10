import { defineType, defineField } from "sanity";

export const brandType = defineType({
  title: "Brand",
  name: "brand",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),

    defineField({
      title: "Cover",
      name: "image",
      type: "image",
    }),

    defineField({
      title: "Description",
      name: "desc",
      type: "string",
    }),
  ],
});
