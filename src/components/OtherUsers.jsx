import OtherSingleUser from "./OtherSingleUser";

export default function OtherUsers() {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
      <OtherSingleUser />
      <OtherSingleUser />
      <OtherSingleUser />
      <OtherSingleUser />
    </div>
  );
}
