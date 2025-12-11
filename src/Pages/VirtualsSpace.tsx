import VirtualExperience from "../components/VirtualSpace/VirtualSpace";

export default function VirtualSpacePage() {
  return (
    <div className="virtualspace-scope relative h-screen overflow-hidden bg-background">
      <VirtualExperience />
    </div>
  );
}