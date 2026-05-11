import OtherSingleUser from "./OtherSingleUser"; 

export default function OtherUsers({ users }) {
  if (!users || users.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
      {users.map((user) => (
        <OtherSingleUser key={user._id} user={user} />
      ))}
    </div>
  );
}
