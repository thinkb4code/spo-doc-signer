import { IPageContent } from "../model/DocumentRender.model";

export interface IDocumentSignerProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  docContent: IPageContent[];
}
