import { defineType, defineField } from "sanity";

export const orderType = defineType({
  title: "Order",
  name: "order",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      readOnly: true,
    }),

    defineField({
      title: "OrderId",
      name: "orderId",
      type: "string",
      readOnly: true,
    }),

    defineField({
      title: "Purchase Items",
      name: "items",
      type: "array",
      //   readOnly: true,
      of: [
        {
          type: "object",
          name: "item",
          fields: [
            defineField({
              title: "product",
              type: "reference",
              name: "product",
              to: [{ type: "product" }],
            }),
            defineField({ title: "amount", type: "number", name: "amount" }),
          ],
        },
      ],
    }),

    defineField({
      title: "Subtotal",
      name: "subtotal",
      type: "number",
      readOnly: true,
    }),

    defineField({
      title: "Purchase Date",
      name: "purchaseDate",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      title: "Sale Id",
      name: "lineId",
      type: "string",
      readOnly: true,
    }),

    defineField({
      title: "Has slip",
      name: "hasSlip",
      type: "boolean",
    }),

    defineField({
      title: "slip Image",
      name: "slipImage",
      type: "image",
    }),
  ],
});
