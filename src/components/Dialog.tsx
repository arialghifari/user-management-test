import * as AlertDialog from '@radix-ui/react-alert-dialog'

export default function Dialog({
  title,
  dialogTrigger,
  dialogAction,
}: {
  title: string
  dialogTrigger: JSX.Element
  dialogAction: JSX.Element
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{dialogTrigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-full md:w-[500px] px-4">
          <div className="relative bg-white p-6 rounded shadow h-fit overflow-auto">
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <div className="flex justify-end space-x-4 mt-3">
              <AlertDialog.Cancel asChild>
                <button className="">Cancel</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>{dialogAction}</AlertDialog.Action>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
