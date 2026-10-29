<#
.SYNOPSIS
    Starts the whole CarLot stack in Docker, optionally leaving out one service to debug from Visual Studio.

.EXAMPLE
    ./scripts/dev.ps1
    Runs everything in containers.

.EXAMPLE
    ./scripts/dev.ps1 -Debug listings
    Runs everything except Listings; then press F5 on CarLot.Listings.API ("http" profile) in Visual Studio.
#>
param(
    [ValidateSet('catalog', 'listings', 'gateway', 'ui')]
    [string]$Debug
)

$composeArgs = @('compose', '-f', "$PSScriptRoot/../docker-compose.yml", 'up', '-d', '--build', '--remove-orphans')
if ($Debug) {
    $composeArgs += @('--scale', "$Debug=0")
}

docker @composeArgs
