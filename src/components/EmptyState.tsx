export default function EmptyState({
  text,
  animate = false,
}: {
  text: string
  animate?: boolean
}) {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        animate ? 'animate-pulse' : ''
      }`}
    >
      <img src="/empty.svg" alt="empty" />
      <p className="mt-2">{text}</p>
    </div>
  )
}
