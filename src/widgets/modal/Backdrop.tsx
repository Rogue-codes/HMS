interface BackdropProps{
    children: React.ReactNode
}
export default function Backdrop({children}:BackdropProps) {
  return (
    <div className="w-full h-screen flex justify-center items-center fixed left-0 top-0 bg-[#3333337d]">
        {children}
    </div>
  )
}
