interface SectionRuleProps {
  label: string
  count?: string
}

export default function SectionRule({ label, count }: SectionRuleProps) {
  return (
    <div
      style={{
        borderTop: 'var(--border-thick)',
        paddingTop: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
      }}
    >
      <span
        style={{
          background: 'var(--orange)',
          color: 'var(--white)',
          border: '2px solid var(--black)',
          borderRadius: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          padding: '4px 12px',
          lineHeight: 1,
        }}
      >
        {label}
      </span>
      {count && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'rgba(10,10,10,0.4)',
          }}
        >
          {count}
        </span>
      )}
    </div>
  )
}
