'use client'

export default function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/*<path
        d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z"
        fill="#F3F4F6"
      />*/}
      <path
        d="M15.04 8H16.96V15.04H24V16.96H16.96V24H15.04V16.96H8V15.04H15.04V8Z"
        fill="black"
      />
    </svg>
  );
}
