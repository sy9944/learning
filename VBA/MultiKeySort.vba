Sub MultiKeySort_WithHelper()
    Dim ws As Worksheet
    Dim headerRow As Long
    Dim dateCol As Long, statusCol As Long, amountCol As Long
    Dim statusOrder As Variant
    Dim lastRow As Long, lastCol As Long
    Dim rng As Range
    Dim helperCol As Long
    Dim dict As Object
    Dim i As Long
    Dim st As String


    On Error GoTo ErrHandler

    Application.ScreenUpdating = False
    Application.EnableEvents = False

    ' --- 設定（ここを実際のシート/列に合わせて変更） ---
    Set ws = ThisWorkbook.Worksheets("Sheet1") ' ← シート名を変更
    headerRow = 12
    dateCol = ws.Range("A13").Column        ' 日付列（例：A）
    statusCol = ws.Range("I13").Column      ' ステータス列（例：C）
    amountCol = ws.Range("H13").Column      ' 金額列（例：D）
    statusOrder = Array("新規", "進行中", "受注", "失注") ' ← 希望の並び順に変更
    ' -------------------------------------------------------

    ' 最終行
    lastRow = headerRow + 1
    Do While ws.Cells(lastRow, dateCol).Value <> ""
        lastRow = lastRow + 1
    Loop
    lastRow = lastRow - 1 ' 空になった直前の行が最終行

    If lastRow <= headerRow Then
        MsgBox "並び替えるデータがありません。", vbExclamation
        GoTo Cleanup
    End If

    ' ヘルパー列を追加（最終列の右へ）
    lastCol = ws.Cells(headerRow, ws.Columns.Count).End(xlToLeft).Column
    helperCol = lastCol + 1

    Set dict = CreateObject("Scripting.Dictionary")
    For i = LBound(statusOrder) To UBound(statusOrder)
        dict(statusOrder(i)) = i + 1 ' 1,2,3...
    Next i

    ws.Cells(headerRow, helperCol).Value = "StatusOrderHelper"

    For i = headerRow + 1 To lastRow
        st = Trim(CStr(ws.Cells(i, statusCol).Value))
        If dict.Exists(st) Then
            ws.Cells(i, helperCol).Value = dict(st)
        ElseIf st = "" Then
            ws.Cells(i, helperCol).Value = 9999 ' 空は最後に
        Else
            ws.Cells(i, helperCol).Value = 9998 ' 未登録のステータスは末尾付近
        End If
    Next i

    ' 並び替え範囲（ヘルダー含む、ヘルパー列も含める）
    Set rng = ws.Range(ws.Cells(headerRow, 1), ws.Cells(lastRow, helperCol))

    With ws.Sort
        .SortFields.Clear
        ' 第1キー：日付 昇順
        .SortFields.Add Key:=ws.Range(ws.Cells(headerRow + 1, dateCol), ws.Cells(lastRow, dateCol)), _
            SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:=xlSortNormal
        ' 第2キー：ヘルパー列（ステータス順） 昇順
        .SortFields.Add Key:=ws.Range(ws.Cells(headerRow + 1, helperCol), ws.Cells(lastRow, helperCol)), _
            SortOn:=xlSortOnValues, Order:=xlAscending, DataOption:=xlSortNormal
        ' 第3キー：金額 降順
        .SortFields.Add Key:=ws.Range(ws.Cells(headerRow + 1, amountCol), ws.Cells(lastRow, amountCol)), _
            SortOn:=xlSortOnValues, Order:=xlDescending, DataOption:=xlSortNormal

        .SetRange rng
        .Header = xlYes
        .MatchCase = False
        .Apply
    End With

    ' ヘルパー列は削除（不要ならここをコメントアウト）
    ws.Columns(helperCol).Delete

Cleanup:
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    Exit Sub

ErrHandler:
    MsgBox "エラー: " & Err.Number & " - " & Err.Description, vbCritical
    Resume Cleanup
End Sub