'use client'
import { useState } from 'react'

type Props = {
  onConfirm: (digits: string) => void
  disabled?: boolean
}

const DIGITS_LENGTH = 4 as const

export default function NumberSelector({ onConfirm, disabled = false }: Props) {
  const [selected, setSelected] = useState<number[]>([])

  const add = (d: number) => {
    if (disabled) return
    if (selected.includes(d)) return
    if (selected.length >= DIGITS_LENGTH) return
    setSelected((prev) => [...prev, d])
  }
  const remove = (d: number) => {
    if (disabled) return
    setSelected((prev) => prev.filter((x) => x !== d))
  }
  const clear = () => {
    if (disabled) return
    setSelected([])
  }
  const confirm = () => {
    if (disabled) return
    if (selected.length === DIGITS_LENGTH) onConfirm(selected.join(''))
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-2">
        {Array.from({ length: DIGITS_LENGTH }).map((_, i) => (
          <div key={i} className="w-10 h-10 grid place-items-center rounded border">
            {selected[i] ?? ''}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 10 }, (_, i) => i).map((d) => {
          const isDisabled = disabled || selected.includes(d) || selected.length >= DIGITS_LENGTH
          return (
            <button
              key={d}
              onClick={() => add(d)}
              disabled={isDisabled}
              className={`px-3 py-2 rounded border ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700'}`}
            >
              {d}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">選択:</span>
        {selected.map((d) => (
          <button
            key={d}
            onClick={() => remove(d)}
            disabled={disabled}
            className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
            title="クリックで削除"
          >
            {d}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={clear} disabled={disabled} className="px-3 py-2 rounded border disabled:opacity-40">
          クリア
        </button>
        <button
          onClick={confirm}
          disabled={disabled || selected.length !== DIGITS_LENGTH}
          className="px-3 py-2 rounded border bg-emerald-600 disabled:opacity-40"
        >
          決定
        </button>
      </div>
    </div>
  )
}