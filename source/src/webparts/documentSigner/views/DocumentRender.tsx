import * as React from "react";
import styles from "../assets/css/DocumentRender.module.scss";
import { IDocumentRenderProps, IPageContent } from "../model/DocumentRender.model";

const DocumentRender: React.FC<IDocumentRenderProps> = ({pages}) => {
    const pageHeight = 11 * 96; // 11 inches in pixels (96px per inch)
    //const pageWidth = 8.5 * 96; // 8.5 inches in pixels (96px per inch)
    const parser = new DOMParser();
    const pageContainerRef = React.useRef<HTMLDivElement | null>(null);
    //const [htmlPage, setHtmlPage] = React.useState<string>('');

    const newPage = (): HTMLDivElement => {

        const docPage = document.createElement("div");
        docPage.classList.add(styles.page);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        docPage.appendChild(contentDiv);

        pageContainerRef.current?.appendChild(docPage);

        return docPage;
    };

    const setupPage = (pageContent: Document): void => {
        let currentPage: HTMLDivElement = newPage();

        const fitContentInPage = (currentElem: Element, rootElem: Element | Node | undefined): void => {
            if(rootElem) {
                debugger;
                currentElem = rootElem.appendChild(currentElem);
            }

            currentPage.querySelector('.content')?.appendChild(currentElem);

            if(currentPage.scrollHeight > pageHeight) {
                currentPage.querySelector('.content')?.removeChild(currentElem);
                
                if(currentElem.children.length > 0) {
                    const parent = currentElem.cloneNode(false);
                    const childernElem = Array.prototype.slice.call(currentElem.children);

                    for(let i=0; i < childernElem.length; i++){
                        const currElem = childernElem[i];
                        fitContentInPage(currElem, parent);
                    }
                }else {
                    currentPage = newPage();
                    currentPage.querySelector('.content')?.appendChild(currentElem);
                }
            }
        };

        const childernElem = Array.prototype.slice.call(pageContent.body.children);
        for(let i=0; i < childernElem.length; i++){
            try{
                const currElem = childernElem[i];
                fitContentInPage(currElem, undefined);
            }catch{
                //Do nothing
            }
        }
    };

    React.useEffect(() => {
        pages.map((p: IPageContent) => {
            const docContent = parser.parseFromString(p.Content, 'text/html');
            setupPage(docContent)
        });
    });

    return (
        <div className={styles.docContainer}>
            <div className={styles.pagesContainer} ref={pageContainerRef}>
                
            </div>
        </div>
    );
};


export default DocumentRender;