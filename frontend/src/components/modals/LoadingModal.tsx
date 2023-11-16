export const LoadingModal = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin 2s rounded-full h-64 w-64 border-b-8 border-green-600" />
    </div>
  )
}
