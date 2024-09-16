interface UserStatusProps {
  status:
  {
    status: boolean;
    traffic: boolean;
    expiration: boolean;
    uptime: boolean;
  }
}

export function UserStatus({ status: { status, traffic, expiration, uptime } }: UserStatusProps) {
  let colorClass: string = 'bg-red-500';

  if (status)
    colorClass = 'bg-green-600'

  return (
    <div className={`w-4 h-4 ${colorClass} rounded`}></div>
  )
}
