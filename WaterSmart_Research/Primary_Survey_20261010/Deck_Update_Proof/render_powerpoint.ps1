param([switch]$BaselineOnly)
$ErrorActionPreference = 'Stop'
$taskWork = $PSScriptRoot
$taskRoot = 'C:\Users\User\OneDrive\Desktop\Over the wall'
$taskSubmission = Join-Path $taskRoot 'Round2_Submission'
$taskExistingProcesses = @(Get-Process -Name POWERPNT -ErrorAction SilentlyContinue)
$taskApplication = $null
$taskPresentation = $null
$taskRows = @()
$taskJobs = @(
    @{Name='main-baseline';Path=(Join-Path $taskWork 'main-id-repaired.pptx');Pdf=$null},
    @{Name='main-final';Path=(Join-Path $taskSubmission 'WaterSmart_Round2_Deck_Survey360.pptx');Pdf=(Join-Path $taskSubmission 'WaterSmart_Round2_Deck_Survey360.pdf')},
    @{Name='no-fieldwork-baseline';Path=(Join-Path $taskWork 'no-fieldwork-id-repaired.pptx');Pdf=$null},
    @{Name='no-fieldwork-final';Path=(Join-Path $taskSubmission 'WaterSmart_Round2_Deck_NoFieldwork_Survey360.pptx');Pdf=(Join-Path $taskSubmission 'WaterSmart_Round2_Deck_NoFieldwork_Survey360.pdf')}
)
try {
    $taskApplication = New-Object -ComObject PowerPoint.Application
    $taskOldAlerts = $taskApplication.DisplayAlerts
    $taskApplication.DisplayAlerts = 1
    foreach ($taskJob in $taskJobs) {
        if ($BaselineOnly -and $taskJob.Name -notlike '*baseline') { continue }
        $taskPreview = Join-Path $taskWork ('preview\' + $taskJob.Name)
        New-Item -ItemType Directory -Path $taskPreview -Force | Out-Null
        # Open read-only and without a presentation window; never Save the PPTX.
        $taskPresentation = $taskApplication.Presentations.Open($taskJob.Path,-1,0,0)
        if ($taskPresentation.Slides.Count -ne 18) { throw 'Unexpected slide count' }
        $taskPresentation.Export($taskPreview,'PNG',1600,900)
        # The first Office raster export can use a cold font cache. Re-export
        # source/final identically after all slides have had layout calculated.
        $taskPresentation.Export($taskPreview,'PNG',1600,900)
        if ($taskJob.Pdf) { $taskPresentation.SaveAs($taskJob.Pdf,32) }
        $taskTextBounds = @()
        foreach ($taskSlideNumber in @(5,18)) {
            $taskSlide = $taskPresentation.Slides.Item($taskSlideNumber)
            for ($taskShapeIndex=1; $taskShapeIndex -le $taskSlide.Shapes.Count; $taskShapeIndex++) {
                $taskShape = $taskSlide.Shapes.Item($taskShapeIndex)
                if ($taskShape.HasTextFrame -eq -1 -and $taskShape.TextFrame.HasText -eq -1) {
                    $taskTextBounds += [pscustomobject]@{
                        slide=$taskSlideNumber;shape=$taskShapeIndex;text=$taskShape.TextFrame.TextRange.Text;
                        left=$taskShape.Left;top=$taskShape.Top;width=$taskShape.Width;height=$taskShape.Height;
                        bound_height=$taskShape.TextFrame.TextRange.BoundHeight;
                        margin_top=$taskShape.TextFrame.MarginTop;margin_bottom=$taskShape.TextFrame.MarginBottom
                    }
                }
            }
        }
        $taskRows += [pscustomobject]@{name=$taskJob.Name;path=$taskJob.Path;slides=$taskPresentation.Slides.Count;preview=$taskPreview;pdf=$taskJob.Pdf;text_bounds=$taskTextBounds}
        $taskPresentation.Close()
        [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($taskPresentation) | Out-Null
        $taskPresentation = $null
        Write-Output ('Rendered: ' + $taskJob.Name)
    }
    $taskRows | ConvertTo-Json -Depth 7 | Set-Content -LiteralPath (Join-Path $taskWork 'native-render-report.json') -Encoding UTF8
}
finally {
    if ($taskPresentation) {
        $taskPresentation.Close()
        [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($taskPresentation) | Out-Null
    }
    if ($taskApplication) {
        $taskApplication.DisplayAlerts = $taskOldAlerts
        if ($taskExistingProcesses.Count -eq 0 -and $taskApplication.Presentations.Count -eq 0) { $taskApplication.Quit() }
        [System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($taskApplication) | Out-Null
    }
}
