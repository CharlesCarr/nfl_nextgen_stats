export default function ChartStat({ stat }: any) {
  return (
    <div className="flex items-center justify-center">
      {stat.icon}
      <p>{`${stat.label}: ${stat.data}`}</p>
    </div>
  );
}
