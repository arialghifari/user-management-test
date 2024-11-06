import * as Popover from '@radix-ui/react-popover'

export default function Dropdown({
  popoverTrigger,
  children,
}: {
  popoverTrigger: JSX.Element
  children: JSX.Element
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{popoverTrigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start">
          <div className="bg-white rounded-md p-2 shadow flex flex-col items-start gap-1">
            {children}
          </div>
          <Popover.Close />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
