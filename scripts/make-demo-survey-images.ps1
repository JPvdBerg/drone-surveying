# Generates two on-brand placeholder images for the Before/After slider:
#   public/demo-site-photo.jpg  - an "aerial site" view
#   public/demo-site-topo.jpg   - a "topographic / elevation" view
# Replace these with a real photo + orthomosaic pair when available.
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$W = 1280; $H = 720
$rng = New-Object System.Random 42

function Save-Jpg($bmp, $path, $quality) {
  $enc = [System.Drawing.Imaging.Encoder]::Quality
  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($enc, [long]$quality)
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $bmp.Save($path, $codec, $ep)
}

function New-Graphics($bmp) {
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  return $g
}

# ---------- BEFORE: aerial site ----------
$photo = New-Object System.Drawing.Bitmap $W, $H
$g = New-Graphics $photo
$rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect, [System.Drawing.Color]::FromArgb(255, 104, 110, 78),
  [System.Drawing.Color]::FromArgb(255, 142, 128, 96), 35.0)
$g.FillRectangle($bg, $rect)

# Field patches
$fieldCols = @(
  @(86, 99, 64), @(120, 116, 78), @(96, 108, 66), @(140, 126, 92), @(70, 84, 54)
)
for ($i = 0; $i -lt 22; $i++) {
  $c = $fieldCols[$rng.Next($fieldCols.Count)]
  $b = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(150, $c[0], $c[1], $c[2]))
  $x = $rng.Next(-80, $W); $y = $rng.Next(-60, $H)
  $fw = $rng.Next(120, 340); $fh = $rng.Next(90, 240)
  $g.FillRectangle($b, $x, $y, $fw, $fh)
}

# River
$river = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(180, 80, 110, 130)), 26
$river.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$g.DrawCurve($river, ([System.Drawing.Point[]]@(
  (New-Object System.Drawing.Point 0, 180),
  (New-Object System.Drawing.Point 320, 250),
  (New-Object System.Drawing.Point 600, 200),
  (New-Object System.Drawing.Point 900, 320),
  (New-Object System.Drawing.Point 1280, 300))))

# Road
$road = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(220, 150, 148, 140)), 12
$g.DrawCurve($road, ([System.Drawing.Point[]]@(
  (New-Object System.Drawing.Point 120, 720),
  (New-Object System.Drawing.Point 240, 480),
  (New-Object System.Drawing.Point 520, 420),
  (New-Object System.Drawing.Point 760, 220),
  (New-Object System.Drawing.Point 1080, 80))))

# Buildings
for ($i = 0; $i -lt 7; $i++) {
  $x = $rng.Next(700, 1180); $y = $rng.Next(420, 640)
  $bw = $rng.Next(40, 90); $bh = $rng.Next(40, 80)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(60, 0, 0, 0))), $x + 4, $y + 4, $bw, $bh)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 198, 196, 188))), $x, $y, $bw, $bh)
}
Save-Jpg $photo (Join-Path $root 'public\demo-site-photo.jpg') 82
$g.Dispose(); $photo.Dispose()

# ---------- AFTER: topographic / elevation ----------
$topo = New-Object System.Drawing.Bitmap $W, $H
$g = New-Graphics $topo
$g.Clear([System.Drawing.Color]::FromArgb(255, 236, 227, 205))

# Hypsometric ramp: low (green) -> tan -> high (near white)
$stops = @(@(150, 170, 120), @(196, 196, 150), @(216, 204, 162), @(232, 224, 200), @(244, 240, 228))
function Ramp([double]$t) {
  if ($t -lt 0) { $t = 0 } elseif ($t -gt 1) { $t = 1 }
  $f = $t * ($stops.Count - 1)
  $i = [int][math]::Floor($f); if ($i -ge $stops.Count - 1) { $i = $stops.Count - 2 }
  $frac = $f - $i
  $a = $stops[$i]; $b = $stops[$i + 1]
  return [System.Drawing.Color]::FromArgb(255,
    [int]($a[0] + ($b[0] - $a[0]) * $frac),
    [int]($a[1] + ($b[1] - $a[1]) * $frac),
    [int]($a[2] + ($b[2] - $a[2]) * $frac))
}

$contour = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(200, 150, 100, 60)), 1.4
$peaks = @(@(440, 300, 380, 1.15, 0.82), @(910, 440, 320, 0.95, 1.1))
$bands = 11
foreach ($p in $peaks) {
  for ($i = $bands; $i -ge 1; $i--) {
    $r = $p[2] * $i / $bands
    $rx = $r * $p[3]; $ry = $r * $p[4]
    $elev = ($bands - $i) / ($bands - 1)
    $g.FillEllipse((New-Object System.Drawing.SolidBrush (Ramp $elev)), $p[0] - $rx, $p[1] - $ry, $rx * 2, $ry * 2)
    $g.DrawEllipse($contour, $p[0] - $rx, $p[1] - $ry, $rx * 2, $ry * 2)
  }
}

# Coordinate grid
$grid = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(45, 120, 90, 60)), 1
for ($x = 0; $x -lt $W; $x += 90) { $g.DrawLine($grid, $x, 0, $x, $H) }
for ($y = 0; $y -lt $H; $y += 90) { $g.DrawLine($grid, 0, $y, $W, $y) }

# North arrow
$ink = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 90, 70, 50))
$pen2 = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 90, 70, 50)), 2
$g.DrawLine($pen2, 1210, 40, 1210, 92)
$g.FillPolygon($ink, ([System.Drawing.Point[]]@(
  (New-Object System.Drawing.Point 1210, 30),
  (New-Object System.Drawing.Point 1202, 48),
  (New-Object System.Drawing.Point 1218, 48))))
$nFont = New-Object System.Drawing.Font('Segoe UI', 16, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('N', $nFont, $ink, 1202, 96)
Save-Jpg $topo (Join-Path $root 'public\demo-site-topo.jpg') 82
$g.Dispose(); $topo.Dispose()

"Wrote demo-site-photo.jpg and demo-site-topo.jpg"
