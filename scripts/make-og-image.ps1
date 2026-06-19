# Generates public/og-image.jpg (1200x630, the Facebook/WhatsApp recommended
# ratio) from the hero photo, with a branded gradient + wordmark overlay.
# Run from the project root: powershell -File scripts/make-og-image.ps1
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root 'public\hero-drone.jpg'
$outPath = Join-Path $root 'public\og-image.jpg'

$W = 1200; $H = 630
$ink = [System.Drawing.Color]::FromArgb(255, 10, 15, 20)
$accent = [System.Drawing.Color]::FromArgb(255, 255, 106, 26)
$steel = [System.Drawing.Color]::FromArgb(255, 190, 202, 214)

$src = [System.Drawing.Image]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap $W, $H
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Cover-fit the square photo to the 1200x630 frame (scale to width, center crop).
$scale = $W / $src.Width
$drawH = [int]($src.Height * $scale)
$g.DrawImage($src, 0, [int](($H - $drawH) / 2), $W, $drawH)

# Left-weighted scrim for text legibility.
$rect = New-Object System.Drawing.Rectangle 0, 0, $W, $H
$lgH = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect, [System.Drawing.Color]::FromArgb(238, 10, 15, 20),
  [System.Drawing.Color]::FromArgb(48, 10, 15, 20), 0.0)
$g.FillRectangle($lgH, $rect)
$lgV = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect, [System.Drawing.Color]::FromArgb(0, 10, 15, 20),
  [System.Drawing.Color]::FromArgb(165, 10, 15, 20), 90.0)
$g.FillRectangle($lgV, $rect)

# --- Logo mark: orange rounded square + drone glyph (matches the favicon). ---
$ox = 70; $oy = 66; $size = 64; $r = 14
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddArc($ox, $oy, $r, $r, 180, 90)
$path.AddArc($ox + $size - $r, $oy, $r, $r, 270, 90)
$path.AddArc($ox + $size - $r, $oy + $size - $r, $r, $r, 0, 90)
$path.AddArc($ox, $oy + $size - $r, $r, $r, 90, 90)
$path.CloseFigure()
$g.FillPath((New-Object System.Drawing.SolidBrush $accent), $path)

$pen = New-Object System.Drawing.Pen($ink, 3.6)
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
# icon coord -> canvas:  X = ox + 8 + 2*ix ,  Y = oy + 8 + 2*iy
function Px($ix) { $ox + 8 + 2 * $ix }
function Py($iy) { $oy + 8 + 2 * $iy }
foreach ($c in @(@(5, 6), @(19, 6), @(5, 18), @(19, 18))) {
  $g.DrawEllipse($pen, (Px $c[0]) - 4, (Py $c[1]) - 4, 8, 8)
}
$g.DrawLine($pen, (Px 7), (Py 7), (Px 10), (Py 10))
$g.DrawLine($pen, (Px 17), (Py 7), (Px 14), (Py 10))
$g.DrawLine($pen, (Px 7), (Py 17), (Px 10), (Py 14))
$g.DrawLine($pen, (Px 17), (Py 17), (Px 14), (Py 14))
$g.DrawRectangle($pen, (Px 9.5), (Py 9.5), 10, 10)

# --- Wordmark next to logo ---
$wordFont = New-Object System.Drawing.Font('Segoe UI', 30, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString('Apex Aerial Survey', $wordFont, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)), 150, 82)

# --- Headline (two lines) ---
$titleFont = New-Object System.Drawing.Font('Segoe UI', 60, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$g.DrawString('Precision drone', $titleFont, $white, 66, 348)
$g.DrawString('surveying & mapping', $titleFont, $white, 66, 416)

# --- Sub-label ---
$subFont = New-Object System.Drawing.Font('Segoe UI', 25, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$dot = [char]0x00B7  # middot, built from code point to avoid file-encoding mangling
$g.DrawString("Topographic  $dot  Construction  $dot  Volumetric  $dot  Inspection",
  $subFont, (New-Object System.Drawing.SolidBrush $steel), 70, 506)

# Save as JPEG at quality 84 (keeps file well under WhatsApp's preview limit).
$enc = [System.Drawing.Imaging.Encoder]::Quality
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($enc, [long]84)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$bmp.Save($outPath, $codec, $ep)

$g.Dispose(); $bmp.Dispose(); $src.Dispose()
"Wrote $outPath ({0} KB)" -f [int]((Get-Item $outPath).Length / 1KB)
