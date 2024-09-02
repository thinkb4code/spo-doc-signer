Connect-PnPOnline "https://ws8x0.sharepoint.com/sites/DocSigner" -Interactive

# Provision hidden configuration list
$configList = Get-PnPList "DocSigner Configuration"

if(!$configList){
    New-PnPList -Title "DocSigner Configuration" -Template GenericList -Url "Lists/DocSignerConfig" -Hidden
    Add-PnPField -List "DocSigner Configuration" -DisplayName "Value" -InternalName "Value" -Type Text -AddToDefaultView
}

# Main list use to store document content
$docContentList = Get-PnPList "DocSigner"

if(!$docContentList){
    New-PnPList -Title "DocSigner" -Template GenericList -Url "Lists/DocSigner"
    Add-PnPField -List "DocSigner" -DisplayName "Content" -InternalName "Content" -Type Note -AddToDefaultView
    Add-PnPField -List "DocSigner" -DisplayName "Sort Order" -InternalName "SortOrder" -Type Number -AddToDefaultView
    Add-PnPField -List "DocSigner" -DisplayName "Request Signature" -InternalName "RequestSignature" -Type Boolean -AddToDefaultView
    Add-PnPField -List "DocSigner" -DisplayName "Start on New Page" -InternalName "NewPage" -Type Boolean -AddToDefaultView

    # Set custom List and Column Properties
    Set-PnPList -Identity "DocSigner" -EnableFolderCreation 1
    
    $docContentList = Get-PnPList "DocSigner"
    $contentField = $docContentList.Fields.GetByInternalNameOrTitle("Content")
    $context = $contentField.Context
    $context.Load($contentField)
    $context.ExecuteQuery()
    $contentField.SchemaXml = $contentField.SchemaXml.Replace('RichText="TRUE"', 'RichText="TRUE" RichTextMode="FullHtml"')
    $contentField.UpdateAndPushChanges($true)
    $context.ExecuteQuery()
}