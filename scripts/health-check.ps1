# Quick health check across PostgreSQL (:5432), API (:5058), and Next.js (:3000)
$RepoRoot = Split-Path -Parent $PSScriptRoot

function Check-Endpoint([string]$Label, [string]$Url) {
    try {
        $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
        Write-Host "[OK] $Label -> HTTP $($resp.StatusCode)" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "[DOWN] $Label -> $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

$pg = New-Object System.Net.Sockets.TcpClient
$pgOk = $false
try {
    $pgOk = $pg.BeginConnect("127.0.0.1", 5432, $null, $null).AsyncWaitHandle.WaitOne(500) -and $pg.Connected
} finally { $pg.Dispose() }

if ($pgOk) { Write-Host "[OK] PostgreSQL 127.0.0.1:5432 reachable" -ForegroundColor Green }
else { Write-Host "[DOWN] PostgreSQL 127.0.0.1:5432 unreachable" -ForegroundColor Red }

$apiOk = Check-Endpoint "Backend /api/health" "http://127.0.0.1:5058/api/health"
$feOk = Check-Endpoint "Frontend /" "http://localhost:3000"
$proxyOk = Check-Endpoint "Frontend API Proxy /api/health" "http://localhost:3000/api/health"

if ($pgOk -and $apiOk -and $feOk -and $proxyOk) { exit 0 } else { exit 1 }
