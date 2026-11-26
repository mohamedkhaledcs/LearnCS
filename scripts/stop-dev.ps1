# Stops background LearnCS dev servers tracked by scripts/dev.ps1
$RepoRoot = Split-Path -Parent $PSScriptRoot
$LogsDir = Join-Path $RepoRoot "logs"

foreach ($name in @("backend", "frontend")) {
    $pidFile = Join-Path $LogsDir "$name.pid"
    if (Test-Path $pidFile) {
        $procId = Get-Content $pidFile -ErrorAction SilentlyContinue
        if ($procId -match '^\d+$') {
            try {
                Stop-Process -Id ([int]$procId) -Force -ErrorAction SilentlyContinue
                Write-Host "[STOP] Stopped $name (PID $procId)" -ForegroundColor Yellow
            } catch {}
        }
        Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    }
}
