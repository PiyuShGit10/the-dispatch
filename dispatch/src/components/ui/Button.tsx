interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'dark'
  type?: 'button' | 'submit'
  disabled?: boolean
  style?: React.CSSProperties
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  style: customStyle,
}: ButtonProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--orange)',
      color: 'var(--white)',
      border: '3px solid var(--black)',
    },
    secondary: {
      background: 'var(--white)',
      color: 'var(--black)',
      border: '3px solid var(--black)',
    },
    dark: {
      background: 'var(--black)',
      color: 'var(--orange)',
      border: '3px solid var(--black)',
    },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="neo-interactive"
      style={{
        ...styles[variant],
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '8px 18px',
        borderRadius: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 100ms ease, box-shadow 100ms ease',
        whiteSpace: 'nowrap',
        ...customStyle,
      }}
    >
      {children}
    </button>
  )
}
