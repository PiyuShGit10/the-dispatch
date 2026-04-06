interface ImagePlaceholderProps {
  height?: number
  label?: string
}

export default function ImagePlaceholder({ height = 200, label }: ImagePlaceholderProps) {
  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        background: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(10,10,10,0.04) 8px,
            rgba(10,10,10,0.04) 16px
          )
        `,
        borderBottom: 'var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(10,10,10,0.2)',
        }}
      >
        {label || '[ editorial image ]'}
      </span>
    </div>
  )
}
