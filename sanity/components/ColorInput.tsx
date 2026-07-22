'use client'

import type {ChangeEvent} from 'react'
import {set, unset, type StringInputProps} from 'sanity'

const FALLBACK_COLOR = '#c8ff00'

function normaliseColor(value?: string) {
  return /^#[0-9a-f]{6}$/i.test(value || '') ? value! : FALLBACK_COLOR
}

export function ColorInput(props: StringInputProps) {
  const {onChange, value = ''} = props
  const stringValue = typeof value === 'string' ? value : ''

  return (
    <div style={{display:'grid',gap:10}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <input
          type="color"
          aria-label="Choose project colour"
          value={normaliseColor(stringValue)}
          onChange={(event:ChangeEvent<HTMLInputElement>) => onChange(set(event.currentTarget.value.toUpperCase()))}
          style={{width: 56, height: 42, padding: 2, border: '1px solid #d8d8d8', borderRadius: 6, cursor: 'pointer'}}
        />
        <input
          value={stringValue}
          placeholder="#C8FF00"
          aria-label="Project colour hexadecimal value"
          onChange={(event:ChangeEvent<HTMLInputElement>) => {
            const nextValue = event.currentTarget.value.trim()
            onChange(nextValue ? set(nextValue.toUpperCase()) : unset())
          }}
          style={{flex:1,minWidth:0,height:42,padding:'0 12px',font:'inherit',color:'inherit',background:'transparent',border:'1px solid #c7c7c7',borderRadius:4}}
        />
      </div>
      <small style={{color:'#777'}}>Choose a colour or enter a six-digit hexadecimal value, for example #C8FF00.</small>
    </div>
  )
}
