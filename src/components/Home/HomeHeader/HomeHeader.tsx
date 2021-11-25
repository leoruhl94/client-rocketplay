import React from "react";
import "./homeHeader.scss"

export const HomeHeader: React.FC = () => {
    return (
        <div className="headerContainer"> {/* Red container */}
                <svg
                className="curve-bg"
                width={375}
                height={673}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d={`M0 0h375v587C169 568 139.033 689.187 0 670V0z`}
                        fill="url(#prefix__paint0_linear_100_5529)"
                    />
                    <defs>
                        <linearGradient
                        id="prefix__paint0_linear_100_5529"
                        x1={187.5}
                        y1={0}
                        x2={187.5}
                        y2={672.067}
                        gradientUnits="userSpaceOnUse"
                        >
                        <stop stopColor="#6835A5" />
                        <stop offset={1} stopColor="#1983FF" />
                        </linearGradient>
                    </defs>
                </svg>
            <div className="headerSubContainer"> {/* Red sub container */}
                <div className="logo"> {/* Logo div */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2023.07 2023.38"
                    >
                    <defs>
                        <style>{".prefix__cls-1{fill:#fff}"}</style>
                    </defs>
                    <g id="prefix__Capa_2" data-name="Capa 2">
                        <g id="prefix__Dark-BW">
                        <path
                            className="prefix__cls-1"
                            d="M1049.74 1330.09a35 35 0 01-24.75-10.25L390.15 685a35 35 0 015.73-54.13c67.59-43.74 146.12-64.34 227.17-59.57a386.05 386.05 0 0183.06 14c95.28-87 189.88-161.35 281.44-221 80.31-52.33 159.09-94 234.15-123.72 135.26-53.64 223.88-55 255.71-53a48.06 48.06 0 0145.06 45c1.91 31.83.58 120.46-53 255.71-29.77 75.06-71.39 153.84-123.72 234.15-59.66 91.56-134 186.16-221 281.44a385.54 385.54 0 0114 83.06c4.77 81-15.82 159.59-59.56 227.17a35 35 0 01-25.69 15.79 35.38 35.38 0 01-3.76.19zM757.07 952.92l284.6 284.6c20.71-44.66 29.87-92.89 27.28-143.9-2.51-49.33-15.66-83.35-16.33-85a34.63 34.63 0 016.72-37.07c352.9-380.57 391.51-633 393.53-714.39-81.38 2-333.79 40.61-714.39 393.53a34.64 34.64 0 01-37.06 6.73c-1.66-.66-35.7-13.82-85.06-16.33-51-2.59-99.24 6.56-143.9 27.27l284.61 284.56zM201.94 1446.56c15.52-29.12 32.46-56.1 47.58-83.88l5.87-10.23 5.56-10.37 5.61-10.3 2.83-5.1 1.42-2.55 1.32-2.61q5.3-10.39 10.69-20.64c1.84-3.39 3.48-6.89 5.17-10.35s3.35-6.93 5.07-10.37 3.46-6.84 5.06-10.33l4.77-10.45 4.84-10.37c.4-.87.82-1.73 1.2-2.6l1.11-2.64 2.26-5.25 4.53-10.48 2.3-5.21 2.11-5.31c2.77-7.08 5.79-14 8.48-21.14l8-21.33 7.42-21.59 6.8-21.87 6.28-22.14 5.85-22.4 5.49-22.69 2.66-11.45 1.34-5.73.67-2.86.42-1.71.49-1.9a147.18 147.18 0 0111.23-30.29 131.16 131.16 0 0119-28l2.91-3.17c1-1.05 2-2 3-3.05 2-2.06 4.19-3.92 6.32-5.83a133.47 133.47 0 0113.62-10.24c2.34-1.61 4.76-3 7.16-4.43l3.66-2 1.83-1 1.85-.92a153.21 153.21 0 0115-6.48 168.74 168.74 0 0130.35-7.91 198.73 198.73 0 0129.93-2.67 220.43 220.43 0 0129 1.47 261.83 261.83 0 0155.15 12.5 259 259 0 0151.45 24.16 217.63 217.63 0 0124.08 17.29c3.88 3.29 7.72 6.68 11.45 10.39l8.66 8.66 4.22 4.24 4.4 4.46c3.69 3.75 7.06 7.61 10.32 11.51a215.4 215.4 0 0117.13 24.15 235.52 235.52 0 0113.46 25.28 270.35 270.35 0 0110.41 26.2 259.83 259.83 0 0112.2 55.06 211.54 211.54 0 01-1.42 58.56 169.42 169.42 0 01-8 30.12 147.19 147.19 0 01-6.47 14.84l-.92 1.83-1 1.82-2 3.61c-1.45 2.37-2.81 4.77-4.41 7.08a134.8 134.8 0 01-10.18 13.44c-1.9 2.1-3.76 4.24-5.79 6.22l-3 3-3.15 2.86a129.26 129.26 0 01-27.77 18.75 146.12 146.12 0 01-30 11l-1.88.47-1.7.42-2.87.65-5.74 1.32-11.48 2.62-22.73 5.42-22.42 5.76c-59.72 15.57-115.77 38.43-171.06 65.52l-10.35 5.14c-3.47 1.7-7 3.35-10.34 5.24q-10.25 5.46-20.61 10.84L385 1438l-2.55 1.43-5.09 2.86c-3.4 1.92-6.84 3.79-10.26 5.69l-10.33 5.66-10.18 6-10.28 5.91-5.18 2.93c-1.72 1-3.47 1.93-5.15 3q-10.15 6.19-20.56 12.23l-5.22 3c-1.75 1-3.52 2-5.21 3l-5.14 3.16-5.2 3.1c-6.93 4.14-14 8.22-21.24 12.12 4.53-6.82 9.28-13.45 14.14-20l3.65-4.94 3.71-4.88c2.47-3.26 5.13-6.34 7.74-9.48q7.88-9.36 16-18.61c5.48-6.06 11.25-11.85 16.95-17.74l8.66-8.76q4.49-4.2 9-8.35c3-2.76 6.06-5.55 9.13-8.29l4.6-4.12 2.31-2.06c.78-.67 1.59-1.31 2.38-2q9.54-7.83 19.25-15.56c3.21-2.62 6.58-5 9.93-7.44l10.14-7.26a563.51 563.51 0 0186.26-49.89 834.73 834.73 0 0192.74-36l23.49-7.39c7.81-2.31 15.64-4.67 23.45-6.92l11.69-3.27 5.85-1.64 2.92-.81.69-.2.5-.16 1-.31a71.25 71.25 0 0014.51-6.17 53.25 53.25 0 0019.9-19.48 68.27 68.27 0 006.11-13.7 92.66 92.66 0 003.57-16.21 120.46 120.46 0 001-17.92 153.84 153.84 0 00-1.47-18.82 180.31 180.31 0 00-3.74-19.07 212.26 212.26 0 00-5.76-18.81 181.32 181.32 0 00-16.99-34.83 133.38 133.38 0 00-10.67-14.7c-1.89-2.17-3.78-4.31-5.71-6.21l-8.27-8.22-8.26-8.22c-1.92-1.91-4.07-3.78-6.26-5.65a135.82 135.82 0 00-14.77-10.51 177.54 177.54 0 00-34.78-16.55c-6.18-2.15-12.44-4.08-18.77-5.63a181.88 181.88 0 00-19-3.57c-12.63-1.62-25.12-1.88-36.46-.27a92.19 92.19 0 00-16 3.64 71.51 71.51 0 00-7 2.74l-.85.37-.8.41-1.63.79c-1 .61-2.11 1.11-3.06 1.75a56.18 56.18 0 00-5.64 3.89c-.84.74-1.76 1.4-2.55 2.19-.4.38-.84.73-1.23 1.13l-1.18 1.19a55 55 0 00-8.22 11.06 69.42 69.42 0 00-6 14.22l-.3 1-.15.49-.2.68-.8 2.93-1.61 5.86-3.24 11.7-6.85 23.49-7.31 23.56-7.9 23.51-8.59 23.39-9.31 23.2c-3.26 7.68-6.75 15.28-10.14 22.9a557.3 557.3 0 01-50.3 86.35c-2.41 3.38-4.87 6.73-7.32 10.08s-4.84 6.72-7.51 9.9c-5.18 6.47-10.43 12.87-15.69 19.22s-11.05 12.29-16.6 18.36c-2.82 3-5.59 6-8.44 9l-8.85 8.61c-3 2.84-5.92 5.69-8.91 8.5s-5.9 5.67-9 8.33q-9.33 8-18.82 15.83l-4.75 3.87c-1.59 1.28-3.15 2.59-4.82 3.79q-4.95 3.67-9.95 7.25c-6.69 4.79-13.4 9.47-20.31 13.91z"
                        />
                        <path
                            className="prefix__cls-1"
                            d="M1135.71 699.68a125.41 125.41 0 1188.67-36.68 124.58 124.58 0 01-88.67 36.68zm0-180.81a55.41 55.41 0 1039.17 94.58 55.41 55.41 0 00-39.17-94.58z"
                        />
                        <path
                            d="M175.67 2023.38A176.16 176.16 0 010 1847.44V175.93A175.79 175.79 0 01254.39 18.7L893.28 342a10.27 10.27 0 011.12 17.73l-57 38a10.25 10.25 0 01-10.09.74L212.57 102.35c-26.07-13-55.25-11.73-80 3.6s-39 40.82-39 70v1671.49c0 29.15 14.23 54.65 39 70s54 16.65 80 3.6l1671.51-835.75c28.47-14.24 45.47-41.75 45.47-73.58 0-30.22-29.74-59.46-49.85-75.77L1427 714.4a10.24 10.24 0 01-4.3-14.47c6.62-11.07 13.25-23 19.74-35.88q7-13.9 12.81-27.1a10.25 10.25 0 0113.88-5.08l460.97 224.69 3.7 2.89c58.4 45.68 89.27 98.32 89.27 152.23a174.83 174.83 0 01-97.17 157.23L254.39 2004.67a175.88 175.88 0 01-78.72 18.71z"
                            fill="#fcfcfc"
                        />
                        </g>
                    </g>
                    </svg>
                </div>
                <div> {/* h1 and h2 */}
                    <h1 className="title">Rocket Play</h1>
                    <h2 className="subtitle">The best classroom in your hand</h2>
                </div>
                <div className="descriptionContainer"> {/* description */}
                    <p>Rocket play provides the best tools for your enterprise in a single and compact platform.</p>
                </div>
            </div>
        </div>
    )
}