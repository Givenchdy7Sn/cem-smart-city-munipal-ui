import { DocumentTypeEnum } from '../core/enums/document-type.enum';

export interface Document {
  id: number;
  title: string;
  documentType: DocumentTypeEnum;
  documentCloudUrl: string;
  documentCloudId: string;
  createdDate: Date;
}
