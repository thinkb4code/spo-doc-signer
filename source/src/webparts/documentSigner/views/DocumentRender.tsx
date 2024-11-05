import * as React from "react";
import styles from "../assets/css/DocumentRender.module.scss";
import { IDocumentRenderProps, IPageContent } from "../model/DocumentRender.model";
import * as _ from '@microsoft/sp-lodash-subset';

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

    // Helper function to create a promise that resolves when an image loads
    // @ts-ignore
    const imageLoadPromise = (img: HTMLImageElement) => new Promise((resolve, reject) => {
        if (img.complete) {
            resolve(true);
        } else {
            img.onload = resolve;
            img.onerror = reject;
        }
    });

    const setupPage = async (pageContent: Document): Promise<void> => {
        let currentPage: HTMLDivElement = newPage();

        const fitContentInPage = async (currentElem: Element): Promise<void> => {
            currentPage.querySelector('.content')?.appendChild(currentElem);
            
            if(currentPage.outerHTML.indexOf('<img') > 0){
                const images = currentPage.querySelectorAll('img');
                const imgsLoaded = Array.from(images).map(imageLoadPromise);
                await Promise.all(imgsLoaded);
            }else {
                await Promise.resolve();
            }

            if(currentPage.scrollHeight > pageHeight) {
                currentPage.querySelector('.content')?.removeChild(currentElem);
                if(currentElem.children.length > 0) {
                    //const parent = currentElem.cloneNode(false);
                    const childernElem = Array.prototype.slice.call(currentElem.children);

                    for(let i=0; i < childernElem.length; i++){
                        debugger;
                        let parent = currentElem.cloneNode(false) as Element;
                        const currElem = childernElem[i];
                        parent.appendChild(currElem);
                        await fitContentInPage(currElem);
                    }
                }else {
                    currentPage = newPage();
                    currentPage.querySelector('.content')?.appendChild(currentElem);
                }
            }
        };
        
        //const parent = pageContent.documentElement.cloneNode(false);
        const childernElem = Array.prototype.slice.call(pageContent.body.children);
        for(let i=0; i < childernElem.length; i++){
            try{
                const currElem = childernElem[i];
                await fitContentInPage(currElem);
            }catch{
                //Do nothing 
            }
        }

        return Promise.resolve();
    };

    React.useEffect(() => {
        pages.map((p: IPageContent) => {
            const docContent = parser.parseFromString(p.Content, 'text/html');
            setupPage(docContent);
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