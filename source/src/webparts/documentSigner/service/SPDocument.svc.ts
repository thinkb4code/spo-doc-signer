import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class SPDocumentService {
    private spfxCtx: SPFI;

    constructor(wpCtx: WebPartContext) {
        this.spfxCtx = spfi().using(SPFx(wpCtx)).using(PnPLogging(LogLevel.Warning));
    }

    public async GetFolderItems(folderPath: string): Promise<void> {
        const docItems = await this.spfxCtx.web.lists.getByTitle('DocSigner').items
            .select('Title', 'Content')
            .filter(`FileDirRef eq '${folderPath}'`)
            .orderBy('SortOrder', true)();

        console.log(docItems);
        debugger;
        return Promise.resolve();
    }
}