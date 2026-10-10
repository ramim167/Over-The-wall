# Scoped archive manifest refresh; does not rebuild models or reset research state.
$ErrorActionPreference = 'Stop'
$taskWorkspace = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$taskResearch = Join-Path $taskWorkspace 'WaterSmart_Research'
$taskManifestPath = Join-Path $taskResearch 'artifact_manifest.json'
$taskPreviousPath = Join-Path $PSScriptRoot 'artifact_manifest_before_primary.json'
if (-not (Test-Path -LiteralPath $taskPreviousPath)) { Copy-Item -LiteralPath $taskManifestPath -Destination $taskPreviousPath }
$taskOldManifest = Get-Content -LiteralPath $taskManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
function Get-TaskSharedHash {
    param([string]$TaskPath)
    $taskStream = [System.IO.File]::Open($TaskPath,[System.IO.FileMode]::Open,[System.IO.FileAccess]::Read,[System.IO.FileShare]::ReadWrite)
    $taskSha = [System.Security.Cryptography.SHA256]::Create()
    try { ([System.BitConverter]::ToString($taskSha.ComputeHash($taskStream))).Replace('-','').ToLowerInvariant() }
    finally { $taskSha.Dispose(); $taskStream.Dispose() }
}
$taskPaths = @($taskOldManifest.files | ForEach-Object { Join-Path $taskWorkspace $_.path })
$taskPaths += @(Get-ChildItem -LiteralPath $taskResearch -Recurse -File | Where-Object { $_.Name -notlike '~$*' -and $_.Extension -ne '.pyc' -and $_.FullName -notmatch '[\\/](node_modules|\.git|__pycache__)[\\/]' } | ForEach-Object { $_.FullName })
$taskPaths += @(Join-Path $taskWorkspace 'WaterSmart_responses.csv'; Join-Path $taskWorkspace 'WaterSmart_responses.xlsx'; Join-Path $taskWorkspace 'WaterSmart_Google_Form_Guide.md')
$taskPaths += @(
    Join-Path $taskWorkspace 'Round2_Submission/WaterSmart_Round2_Deck_Survey360.pptx'
    Join-Path $taskWorkspace 'Round2_Submission/WaterSmart_Round2_Deck_Survey360.pdf'
    Join-Path $taskWorkspace 'Round2_Submission/WaterSmart_Round2_Deck_NoFieldwork_Survey360.pptx'
    Join-Path $taskWorkspace 'Round2_Submission/WaterSmart_Round2_Deck_NoFieldwork_Survey360.pdf'
    Join-Path $taskWorkspace 'Round2_Submission/SURVEY_DECK_UPDATE.md'
    Join-Path $taskWorkspace 'Round2_Submission/deck/survey_deck_data.json'
)
$taskRows = @(foreach ($taskPath in ($taskPaths | Sort-Object -Unique)) {
    $taskResolved = [System.IO.Path]::GetFullPath($taskPath)
    if (-not $taskResolved.StartsWith($taskWorkspace + '\',[System.StringComparison]::OrdinalIgnoreCase)) { throw 'Manifest path outside intended workspace' }
    if ($taskResolved -eq $taskManifestPath -or -not (Test-Path -LiteralPath $taskResolved -PathType Leaf)) { continue }
    $taskItem = Get-Item -LiteralPath $taskResolved
    [PSCustomObject]@{path=$taskResolved.Substring($taskWorkspace.Length+1).Replace('\','/');bytes=$taskItem.Length;sha256=Get-TaskSharedHash $taskResolved}
})
$taskState = Get-Content -LiteralPath (Join-Path $taskResearch 'state.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$taskManifest = [ordered]@{created_utc=[DateTime]::UtcNow.ToString('o');status=$taskState.status;update='10-Oct-2026 primary survey analysis and survey360 deck update; previous227-file manifest preserved';files=$taskRows}
$taskManifest | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $taskManifestPath -Encoding UTF8
[PSCustomObject]@{manifest_files=$taskRows.Count;primary_consent_records=$taskState.counts.eligible_consent_yes_primary_survey_records;source_exports_modified=$false} | ConvertTo-Json
