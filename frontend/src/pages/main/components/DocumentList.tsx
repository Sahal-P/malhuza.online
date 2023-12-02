// import { FC, useState } from 'react'

// interface DocumentListProps {
//   parentDocumentId?: string;
//   level?: number;
//   data?: object[];

// }

// const DocumentList: FC<DocumentListProps> = ({parentDocumentId, level=0, }) => {
//     const [expanded, setExpanded] = useState<Record<string, boolean>>({})
//     const onExpand = (documentId: string) => {
//         setExpanded(prevExpanded => ({
//             ...prevExpanded,
//             [documentId]: !prevExpanded[documentId]
//         }))
//     }
//     const onRedirect = (documentId: string) => {
//         // router.push(`/documents/${documentId}`);
//     }
//   return <div>DocumentList</div>
// }

// export default DocumentList
import { FC } from 'react'

interface DocumentListProps {
  
}

const DocumentList: FC<DocumentListProps> = () => {
  return <div>DocumentList</div>
}

export default DocumentList