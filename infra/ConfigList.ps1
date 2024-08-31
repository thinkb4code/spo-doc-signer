Connect-PnPOnline "https://ws8x0.sharepoint.com/sites/DocSigner" -Interactive

$configList = Get-PnPList "DocSigner Configuration"

if(!$configList){
    New-PnPList -Title "DocSigner Configuration" -Template CustomGrid -Url "Lists/DocSignerConfig" -Hidden
    Add-PnPField -List "DocSigner Configuration" -DisplayName "Value" -InternalName "Value" -Type "Text" -AddToDefaultView
}