interface BackdropProps{
    children: React.ReactNode
}
export default function Backdrop({children}:BackdropProps) {
  return (
    <div className="w-full h-screen z-50 flex justify-center items-center overflow-scroll pb-28 pt-28 fixed left-0 top-0 bg-[#3333337d]">
        {children}
    </div>
  )
}
