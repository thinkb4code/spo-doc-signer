import * as React from 'react';
//import styles from './DocumentSigner.module.scss';
import type { IDocumentSignerProps } from './IDocumentSignerProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import GetUserSignature from '../views/GetUserSignature';

export default class DocumentSigner extends React.Component<IDocumentSignerProps, {}> {
  public render(): React.ReactElement<IDocumentSignerProps> {
    return (
      <GetUserSignature />
    );
  }
}
