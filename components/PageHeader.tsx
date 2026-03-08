export function PageHeader({
  title,
  children,
}: {
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
