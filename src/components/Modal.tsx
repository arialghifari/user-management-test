import * as Dialog from '@radix-ui/react-dialog'

export default function Modal({
  title,
  dialogTrigger,
  children,
  open = false,
  setOpen,
}: {
  title: string
  dialogTrigger: JSX.Element
  children: JSX.Element
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{dialogTrigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-0 md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-full md:w-[500px]">
          <div className="relative bg-white p-6 md:rounded shadow h-screen md:h-fit overflow-auto">
            <Dialog.Title className="text-xl font-semibold">
              {title}
            </Dialog.Title>

            <div className="mt-4">{children}</div>

            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 rounded">
                <img src="/close.svg" alt="close" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
