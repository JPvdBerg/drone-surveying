# Generates PWA + apple-touch icons (drone glyph on the accent square), matching
# the favicon. Outputs: public/pwa-192.png, pwa-512.png, pwa-512-maskable.png,
# apple-touch-icon.png. Run: powershell -File scripts/make-pwa-icons.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$accent = [System.Drawing.Color]::FromArgb(255, 255, 106, 26)
$ink = [System.Drawing.Color]::FromArgb(255, 10, 15, 20)

# Draw the drone glyph (favicon geometry) centred in a box of size $s.
# $inset is the padding fraction (0 = full bleed, 0.18 = maskable safe zone).
function New-Icon([int]$s, [bool]$rounded, [double]$inset, [string]$path) {
  $bmp = New-Object System.Drawing.Bitmap $s, $s
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  $bg = New-Object System.Drawing.SolidBrush $accent
  if ($rounded) {
    $r = [int]($s * 0.22)
    $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gp.AddArc(0, 0, $r, $r, 180, 90)
    $gp.AddArc($s - $r, 0, $r, $r, 270, 90)
    $gp.AddArc($s - $r, $s - $r, $r, $r, 0, 90)
    $gp.AddArc(0, $s - $r, $r, $r, 90, 90)
    $gp.CloseFigure()
    $g.FillPath($bg, $gp)
  } else {
    $g.FillRectangle($bg, 0, 0, $s, $s)
  }

  # Icon coordinate space is 0..24; map into the inset box.
  $pad = $s * $inset
  $box = $s - 2 * $pad
  $scale = $box / 24.0
  function PX($ix) { $pad + $ix * $scale }
  function PY($iy) { $pad + $iy * $scale }

  $pen = New-Object System.Drawing.Pen($ink, [single]($scale * 1.6))
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $rr = [single]($scale * 2)
  foreach ($c in @(@(5, 6), @(19, 6), @(5, 18), @(19, 18))) {
    $g.DrawEllipse($pen, [single]((PX $c[0]) - $rr), [single]((PY $c[1]) - $rr), [single]($rr * 2), [single]($rr * 2))
  }
  $g.DrawLine($pen, [single](PX 7), [single](PY 7), [single](PX 10), [single](PY 10))
  $g.DrawLine($pen, [single](PX 17), [single](PY 7), [single](PX 14), [single](PY 10))
  $g.DrawLine($pen, [single](PX 7), [single](PY 17), [single](PX 10), [single](PY 14))
  $g.DrawLine($pen, [single](PX 17), [single](PY 17), [single](PX 14), [single](PY 14))
  $g.DrawRectangle($pen, [single](PX 9.5), [single](PY 9.5), [single]($scale * 5), [single]($scale * 5))

  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

$pub = Join-Path $root 'public'
New-Icon 192 $true 0.16 (Join-Path $pub 'pwa-192.png')
New-Icon 512 $true 0.16 (Join-Path $pub 'pwa-512.png')
New-Icon 512 $false 0.22 (Join-Path $pub 'pwa-512-maskable.png')
New-Icon 180 $true 0.16 (Join-Path $pub 'apple-touch-icon.png')
"Wrote pwa-192, pwa-512, pwa-512-maskable, apple-touch-icon"
