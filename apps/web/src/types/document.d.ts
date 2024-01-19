import { z, ZodError } from 'zod';

interface BaseDocument {
  id: string;
  title: string;
  is_archived: boolean;
  is_published: boolean;
}

interface Document extends BaseDocument {
  user_id: string;
  parent_document_id?: string | null;
  content?: string | null;
  cover_image?: string | null;
  cover_image_blurhash?: string | null;
  icon?: string | null;
  created_at: string;
}

interface SidebarDocument extends BaseDocument {
  user_id: string;
  parent_document_id?: string | null;
  icon?: string;
  created_at: string;
}

interface ArchiveDocument extends BaseDocument {
  icon?: string;
}

export const DocumentValidator = z.object({
  title: z.string().max(355).optional(),
  user_id: z.string(),
  parent_document_id: z.string().nullable(),
  content: z.string().nullable(),
  cover_image: z.string().nullable(),
  icon: z.string().nullable(),
  is_archived: z.boolean(),
  is_published: z.boolean(),
});

export const validateDocument = (data): Document => {
  try {
    return DocumentValidator.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Validation failed: ${error.errors}`);
    }
    throw error;
  }
};

export type Document = z.infer<typeof DocumentValidator>
// Example usage:
// {
//   title: 'Sample Document',
//   user_id: 'user_id_here',
//   parent_document_id: 'parent_document_id_here',
//   content: 'This is the content.',
//   coverImage: 'cover_image_url',
//   icon: 'icon_url',
//   isArchived: false,
//   isPublished: true,
// };