
type Props = {
  side: 'left' | 'right',
  width: string,
}

export default function Breast({ side, width }: Props) {
  return (
    <svg width={width} viewBox="0 0 479 493" style={{transform: side === 'left' ? 'scale(-1,1)' : 'scale(1,1)'}}>
      <g transform={`matrix(0.5,0,0,0.5,0,0)`}>
        <g transform="matrix(1.77358,0,0,1.77358,-340.785,-390.792)">
          <path d="M414,235C414,235 341.552,352.478 345,490C350.278,700.526 470.717,764.832 471,765C471.283,765.168 437.891,706.504 470,684C502.109,661.496 589.04,656.267 600,551C600,551 617.484,542.547 613,530C607.916,515.772 593,517 593,517C593,517 566.159,439.964 497,376C389.465,276.543 414,235 414,235Z" fill='#FFF' />
        </g>
      </g>
    </svg>
  );
}