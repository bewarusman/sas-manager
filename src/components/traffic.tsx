interface TrafficProps {
  daily_traffic_details: {
    traffic: number
  } | null
}

export function Traffic({ daily_traffic_details }: TrafficProps) {
  if (daily_traffic_details == null)
    return <span>0.00 MB</span>

  const traffic = daily_traffic_details?.traffic / 1024 / 1024;
  return (
    <span>{Math.ceil(traffic * 100) / 100} MB</span>
  )
}
