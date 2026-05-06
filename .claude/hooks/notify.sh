#!/bin/bash
powershell.exe -NonInteractive -Command "
Add-Type -AssemblyName System.Windows.Forms
\$n = New-Object System.Windows.Forms.NotifyIcon
\$n.Icon = [System.Drawing.SystemIcons]::Information
\$n.BalloonTipTitle = 'Claude Code'
\$n.BalloonTipText = 'Claude Code needs your attention'
\$n.Visible = \$true
\$n.ShowBalloonTip(5000)
Start-Sleep 6
\$n.Dispose()
"
