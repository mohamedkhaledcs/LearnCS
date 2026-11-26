# LearnCS - Development Environment Launcher (Windows PowerShell)
# Starts PostgreSQL check, ASP.NET Core API (:5058), and Next.js Frontend (:3000) cleanly without duplicating processes.

param(
    [switch]$NoWait,
    [int]$BackendPort = 5058,
    [int]$FrontendPort = 3000
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$BackendDir = Join-Path $RepoRoot "backend\src\LearnCS.API"
$FrontendDir = Join-Path $RepoRoot "frontend"
$LogsDir = Join-Path $RepoRoot "logs"
New-Item -ItemType Directory -Force -Path $LogsDir | Out-Null

function Test-TcpPort([int]$Port) {
    $tcp = $null
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $async = $tcp.BeginConnect("127.0.0.1", $Port, $null, $null)
        $connected = $async.AsyncWaitHandle.WaitOne(500)
        if ($connected -and $tcp.Connected) {
            return $true
        }
        return $false
    } catch {
        return $false
    } finally {
        if ($tcp) { $tcp.Dispose() }
    }
}

function Wait-HttpHealthy([string]$Url, [int]$TimeoutSeconds = 45) {
    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        try {
            $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3
            if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 400) {
                return $true
            }
        } catch {
            Start-Sleep -Milliseconds 750
        }
    }
    return $false
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   LearnCS Full-Stack Development Server  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. PostgreSQL check
if (Test-TcpPort 5432) {
    Write-Host "[OK] PostgreSQL is listening on 127.0.0.1:5432" -ForegroundColor Green
} else {
    Write-Host "[WARN] PostgreSQL is NOT reachable on 127.0.0.1:5432. Start postgresql-x64-18 service before API calls." -ForegroundColor Yellow
}

# 2. Ensure frontend .env.local exists
$EnvLocal = Join-Path $FrontendDir ".env.local"
$EnvExample = Join-Path $FrontendDir ".env.example"
if (-not (Test-Path $EnvLocal) -and (Test-Path $EnvExample)) {
    Copy-Item $EnvExample $EnvLocal
    Write-Host "[INFO] Created frontend/.env.local from .env.example" -ForegroundColor Cyan
}

# 3. Ensure backend appsettings.Development.json exists
$AppSettingsDev = Join-Path $BackendDir "appsettings.Development.json"
$AppSettingsExample = Join-Path $BackendDir "appsettings.Development.Example.json"
if (-not (Test-Path $AppSettingsDev) -and (Test-Path $AppSettingsExample)) {
    Write-Host "[WARN] Missing backend/src/LearnCS.API/appsettings.Development.json. Copy appsettings.Development.Example.json and configure local DB/JWT secrets." -ForegroundColor Yellow
}

# 4. Backend (:5058)
if (Test-TcpPort $BackendPort) {
    Write-Host "[OK] Backend API is already running on http://127.0.0.1:$BackendPort" -ForegroundColor Green
} else {
    Write-Host "[START] Launching ASP.NET Core API on http://127.0.0.1:$BackendPort ..." -ForegroundColor Yellow
    $backendOut = Join-Path $LogsDir "backend-dev.out.log"
    $backendErr = Join-Path $LogsDir "backend-dev.err.log"
    $env:ASPNETCORE_ENVIRONMENT = "Development"
    $backendProc = Start-Process -FilePath "dotnet" `
        -ArgumentList "run --project `"$BackendDir`" --urls `"http://127.0.0.1:$BackendPort`"" `
        -WorkingDirectory $RepoRoot `
        -RedirectStandardOutput $backendOut `
        -RedirectStandardError $backendErr `
        -WindowStyle Hidden `
        -PassThru
    Set-Content -Path (Join-Path $LogsDir "backend.pid") -Value $backendProc.Id

    if (-not $NoWait) {
        Write-Host "[WAIT] Waiting for backend /api/health..." -ForegroundColor DarkCyan
        if (Wait-HttpHealthy "http://127.0.0.1:$BackendPort/api/health" 60) {
            Write-Host "[OK] Backend API healthy (PID $($backendProc.Id))" -ForegroundColor Green
        } else {
            Write-Host "[ERR] Backend failed health check within 60s. Check logs/backend-dev.err.log" -ForegroundColor Red
            exit 1
        }
    }
}

# 5. Frontend (:3000)
if (Test-TcpPort $FrontendPort) {
    Write-Host "[OK] Frontend Next.js is already running on http://localhost:$FrontendPort" -ForegroundColor Green
} else {
    Write-Host "[START] Launching Next.js Frontend on http://localhost:$FrontendPort ..." -ForegroundColor Yellow
    $frontendOut = Join-Path $LogsDir "frontend-dev.out.log"
    $frontendErr = Join-Path $LogsDir "frontend-dev.err.log"
    $frontendProc = Start-Process -FilePath "cmd.exe" `
        -ArgumentList "/c npm run dev" `
        -WorkingDirectory $FrontendDir `
        -RedirectStandardOutput $frontendOut `
        -RedirectStandardError $frontendErr `
        -WindowStyle Hidden `
        -PassThru
    Set-Content -Path (Join-Path $LogsDir "frontend.pid") -Value $frontendProc.Id

    if (-not $NoWait) {
        Write-Host "[WAIT] Waiting for frontend http://localhost:$FrontendPort ..." -ForegroundColor DarkCyan
        if (Wait-HttpHealthy "http://localhost:$FrontendPort" 60) {
            Write-Host "[OK] Frontend ready (PID $($frontendProc.Id))" -ForegroundColor Green
        } else {
            Write-Host "[ERR] Frontend did not respond within 60s. Check logs/frontend-dev.err.log" -ForegroundColor Red
            exit 1
        }
    }
}

Write-Host ""
Write-Host "LearnCS URLs:" -ForegroundColor Cyan
Write-Host "  Frontend:     http://localhost:$FrontendPort" -ForegroundColor White
Write-Host "  Backend API:  http://127.0.0.1:$BackendPort" -ForegroundColor White
Write-Host "  Health Check: http://127.0.0.1:$BackendPort/api/health" -ForegroundColor White
Write-Host "  Stop script:  powershell -File scripts/stop-dev.ps1" -ForegroundColor DarkGray
