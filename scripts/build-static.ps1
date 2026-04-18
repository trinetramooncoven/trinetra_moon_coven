Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$indexPath = Join-Path $repoRoot 'index.html'
$outputPath = Join-Path $repoRoot 'index.static.html'

$partialNames = @(
  'nav',
  'hero',
  'marquee',
  'about',
  'services',
  'process',
  'testimonials',
  'contact',
  'footer'
)

$indexHtml = Get-Content -Path $indexPath -Raw
$partialsHtml = foreach ($name in $partialNames) {
  $partialPath = Join-Path $repoRoot "partials/$name.html"
  if (-not (Test-Path $partialPath)) {
    throw "Missing partial file: $partialPath"
  }
  Get-Content -Path $partialPath -Raw
}

$mergedSections = ($partialsHtml -join "`r`n")
$mountNode = '<main id="partials-root" aria-live="polite"></main>'

if ($indexHtml -notlike "*$mountNode*") {
  throw 'Build source index.html does not contain the partial mount node.'
}

$staticHtml = $indexHtml.Replace($mountNode, $mergedSections)
$staticHtml = [System.Text.RegularExpressions.Regex]::Replace(
  $staticHtml,
  '(?m)^\s*<script\s+src="js/partials\.js"></script>\s*\r?\n?',
  ''
)

Set-Content -Path $outputPath -Value $staticHtml -NoNewline
Write-Host "Created static build: $outputPath"
