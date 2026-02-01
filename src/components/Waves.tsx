'use client'

export default function Waves() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="waves">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(14, 233, 88, 0.05)"
            className="animate-wave"
          >
            <animate
              attributeName="x"
              from="48"
              to="10"
              dur="7s"
              repeatCount="indefinite"
            />
          </use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(14, 233, 88, 0.1)"
          >
            <animate
              attributeName="x"
              from="48"
              to="0"
              dur="10s"
              repeatCount="indefinite"
            />
          </use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(14, 233, 88, 0.07)"
          >
            <animate
              attributeName="x"
              from="48"
              to="20"
              dur="13s"
              repeatCount="indefinite"
            />
          </use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill="rgba(14, 233, 88, 0.03)"
          >
            <animate
              attributeName="x"
              from="48"
              to="15"
              dur="20s"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </svg>
    </div>
  )
}
