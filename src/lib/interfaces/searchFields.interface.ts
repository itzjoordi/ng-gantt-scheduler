export interface SearchFields {
  manager?: string[];
  role?: string;
  center?: string[];
  constructionZone?: string[];
  executionType?: string;
  executionCode?: string;
  startDate?: string;
  endDate?: string;
  massActuations?: string[];
  closingDate?: string;
  orderBy?: 'START_DATE' | 'END_DATE' | 'GEO';
}
