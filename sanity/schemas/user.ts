import { defineType, defineField, Rule } from "sanity";

export const userType = defineType({
  title: "User",
  name: "user",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      readOnly: true,
    }),

    defineField({
      title: "line ID",
      name: "lineId",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),

    defineField({
      title: "ID-CARD",
      name: "idCard",
      type: "string",
    }),

    defineField({
      title: "Address",
      name: "address",
      type: "string",
    }),

    defineField({
      title: "Tel",
      name: "tel",
      type: "string",
    }),

    defineField({
      title: "isSale",
      name: "isSale",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      title: "VIP",
      name: "isVip",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
