# Testing Framework

This repository can be tested using built-in PowerShell only.

## Automated smoke test

Run from repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\test.ps1
```

This validates:
- static build output is generated
- static build does not depend on runtime partial loader
- static build contains merged section markup
- success modal exists in final output

## Manual runtime test (modular index)

Start local server:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\serve.ps1 -Port 5500
```

Open:
- http://localhost:5500/index.html

Verify:
- all sections render from partials
- mobile nav toggle works
- animations initialize
- submit path eventually returns with ?submitted=1 and shows themed success modal

## Manual compatibility test (single static page)

Generate static page:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-static.ps1
```

Open:
- http://localhost:5500/index.static.html

Verify:
- page renders without fetching partial files
- contact modal markup is present and JS behavior still works
