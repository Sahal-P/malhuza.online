import { z, ZodError } from 'zod';

// Define the interface for the Document model
interface Document {
  id: string;
  title: string;
  user_id: string;
  parentDocument_id?: string | null;
  content?: string | null;
  coverImage?: string | null;
  coverImageBlurHash?: string | null;
  icon?: string | null;
  isArchived: boolean;
  isPublished: boolean;
  createdAt: string
}

interface SidebarDocument {
  id: string;
  title: string;
  user_id: string;
  parentDocument_id?: string | null;
  icon?: string;
  isArchived: boolean;
  isPublished: boolean;
  createdAt: string
}

interface ArchiveDocument {
  id: string;
  title: string;
  icon?: string;
  isArchived: boolean;
  isPublished: boolean;
}
// Define the Zod validator for the Document type
export const DocumentValidator = z.object({
  title: z.string().max(355).optional(),
  user_id: z.string(),
  parentDocument_id: z.string().nullable(),
  content: z.string().nullable(),
  coverImage: z.string().nullable(),
  icon: z.string().nullable(),
  isArchived: z.boolean(),
  isPublished: z.boolean(),
});

// Validate a document against the Zod type
export const validateDocument = (data: any): Document => {
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
//   parentDocument_id: 'parent_document_id_here',
//   content: 'This is the content.',
//   coverImage: 'cover_image_url',
//   icon: 'icon_url',
//   isArchived: false,
//   isPublished: true,
// };