export default function Sparkline({ values }) {
  if (!values || values.length < 2) return <div className="text-xs text-gray-400">No data</div>;

  const width = 100;
  const height = 30;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((val, idx) => {
    const x = (idx / (values.length - 1)) * width;
    const y = height - ((val - min) / (max - min)) * height;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} className="mt-1">
      <polyline
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
        points={points.join(" ")}
      />
    </svg>
  );
}
