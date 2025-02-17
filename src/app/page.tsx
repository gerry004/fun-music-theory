import MusicStaff from "@/components/MusicStaff";
import PianoKeyboard from "@/components/PianoKeyboard";
export default function Home() {
  return (
  <div className="flex flex-col items-center justify-center h-screen">
    <MusicStaff />
    <PianoKeyboard />
  </div>
  )
}
