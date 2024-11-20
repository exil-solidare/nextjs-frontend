import { z } from "zod";

const userSchema = z.object({
  object: z.literal("user"),
  id: z.string(),
});

const emojiIconSchema = z.object({
  type: z.literal("emoji"),
  emoji: z.string(),
});

const multiSelectOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

const titleTextSchema = z.object({
  type: z.string(),
  text: z
    .object({
      content: z.string(),
      link: z.null(),
    })
    .optional(),
  mention: z
    .object({
      type: z.string(),
      page: z.object({
        id: z.string(),
      }),
    })
    .optional(),
  annotations: z.object({
    bold: z.boolean(),
    italic: z.boolean(),
    strikethrough: z.boolean(),
    underline: z.boolean(),
    code: z.boolean(),
    color: z.string(),
  }),
  plain_text: z.string(),
  href: z.string().nullable(),
});

const pagePropertiesSchema = z.object({
  Tags: z.object({
    id: z.string(),
    type: z.literal("multi_select"),
    multi_select: z.array(multiSelectOptionSchema),
  }),
  Status: z.object({
    id: z.string(),
    type: z.literal("status"),
    status: z.object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
    }),
  }),
  URL: z.object({
    id: z.string(),
    type: z.literal("url"),
    url: z.string(),
  }),
  "Publish date": z.object({
    id: z.string(),
    type: z.literal("date"),
    date: z
      .object({
        start: z.string().nullable(),
        end: z.null(),
        time_zone: z.null(),
      })
      .nullable(),
  }),
  Page: z.object({
    id: z.literal("title"),
    type: z.literal("title"),
    title: z.array(titleTextSchema),
  }),
  Owner: z.object({
    id: z.string(),
    type: z.literal("people"),
    people: z.array(userSchema),
  }),
});

export const pageSchema = z.object({
  object: z.literal("page"),
  id: z.string(),
  created_time: z.string(),
  last_edited_time: z.string(),
  created_by: userSchema,
  last_edited_by: userSchema,
  cover: z.null(),
  icon: emojiIconSchema.nullable(),
  archived: z.boolean(),
  properties: pagePropertiesSchema,
  url: z.string(),
  public_url: z.string().nullable(),
});

export const pagesSchema = z.array(pageSchema);

export type NotionPage = z.infer<typeof pageSchema>;
export type NotionPages = z.infer<typeof pagesSchema>;
