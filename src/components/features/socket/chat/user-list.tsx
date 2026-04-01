'use client';

type User = {
  id: string;
  nickname: string;
};

type UserListProps = {
  users: User[];
  currentUserId: string | null;
};

export function UserList({ users, currentUserId }: UserListProps) {
  return (
    <div className="w-40 shrink-0 rounded-lg border p-3">
      <h3 className="mb-2 text-sm font-semibold text-foreground">
        Online ({users.length})
      </h3>
      <ul className="space-y-1">
        {users.map((user) => (
          <li key={user.id} className="flex items-center gap-1.5 text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            <span className={user.id === currentUserId ? 'font-semibold' : ''}>
              {user.nickname}
              {user.id === currentUserId && (
                <span className="ml-1 text-xs text-muted-foreground">(you)</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
