Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
Push-Location $repoRoot

try {
  & (Join-Path $repoRoot 'scripts/build-static.ps1')

  $failures = New-Object System.Collections.Generic.List[string]

  $indexStaticPath = Join-Path $repoRoot 'index.static.html'
  if (-not (Test-Path $indexStaticPath)) {
    $failures.Add('index.static.html was not generated.')
  } else {
    $indexStatic = Get-Content -Path $indexStaticPath -Raw

    if ($indexStatic -match '<main\s+id="partials-root"') {
      $failures.Add('Static build still contains the partial mount node.')
    }

    if ($indexStatic -match '<script\s+src="js/partials\.js"></script>') {
      $failures.Add('Static build still references js/partials.js.')
    }

    if ($indexStatic -notmatch '<nav\s+id="nav"') {
      $failures.Add('Static build is missing nav markup from partials.')
    }

    if ($indexStatic -notmatch 'form-success-modal') {
      $failures.Add('Static build is missing contact success modal markup.')
    }
  }

  if ($failures.Count -gt 0) {
    Write-Host 'TEST FAILED' -ForegroundColor Red
    foreach ($failure in $failures) {
      Write-Host " - $failure"
    }
    exit 1
  }

  Write-Host 'TEST PASSED' -ForegroundColor Green
  Write-Host ' - static build generated'
  Write-Host ' - static build no longer depends on js/partials.js'
  Write-Host ' - static build includes merged partial content'
  Write-Host ' - success modal markup available in output'
}
finally {
  Pop-Location
}
