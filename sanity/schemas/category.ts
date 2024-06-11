import { defineType, defineField } from "sanity";

export const categoryType = defineType({
  title: "Category",
  name: "category",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),

    defineField({
      title: "Description",
      name: "desc",
      type: "string",
    }),
  ],
});
