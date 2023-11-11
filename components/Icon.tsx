import React, { FunctionComponent } from 'react';

interface CircularTextProps {
  className?: string;
}

interface GithubIconProps {
    className?: string;
  }

interface TwitterIconProps {
    className?: string;
}

interface LinkedInIconProps {
    className?: string;
}

export const GithubIcon:FunctionComponent<GithubIconProps> = ({ className, ...rest }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...rest}
      className={`w-full h-auto ${className}`}
    >
      <path fill="none" d="M0 0h512v512H0z" />
      <path
        fill="currentColor"
        d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32Z"
      />
    </svg>
  );



const CircularText: FunctionComponent<CircularTextProps> = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 1080 1080 "
    className={`${className}`}
    {...rest}
  >
<g transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)"
stroke="none">
<path d="M6205 9098 c-2 -7 -71 -220 -153 -473 -164 -502 -165 -505 -160 -505
2 0 43 -14 92 -30 49 -17 93 -30 98 -30 12 0 38 64 83 200 59 183 74 217 115
254 41 37 105 55 137 38 19 -11 25 -12 47 -12 7 0 30 -15 50 -34 56 -53 52
-100 -30 -347 -36 -109 -63 -203 -59 -208 3 -6 44 -22 91 -38 99 -32 109 -29
131 37 8 25 17 52 20 60 3 8 7 20 8 26 2 6 24 75 50 155 60 182 68 269 35 347
-58 135 -247 220 -398 179 -40 -11 -52 -11 -48 -2 16 44 106 328 104 331 -4 4
-193 64 -202 64 -4 0 -8 -6 -11 -12z"/>
<path d="M5476 9047 c-3 -12 -6 -48 -6 -79 0 -83 -2 -85 -64 -80 -53 4 -53 4
-60 -28 -3 -18 -6 -57 -6 -86 l0 -54 56 0 55 0 -8 -132 c-15 -239 -11 -297 20
-351 30 -50 76 -85 142 -107 51 -18 178 -18 228 -1 44 15 46 29 17 111 l-19
55 -63 -3 c-52 -3 -68 0 -88 16 -24 20 -25 24 -22 134 2 62 4 124 6 138 2 14
4 46 4 73 l2 47 94 -6 94 -7 7 65 c10 95 7 103 -40 105 -22 2 -62 5 -90 8
l-50 6 0 91 0 92 -30 2 c-167 14 -173 14 -179 -9z"/>
<path d="M5163 8903 l-91 -15 -36 -148 c-19 -81 -47 -200 -62 -264 -15 -64
-31 -116 -35 -116 -9 0 -229 355 -229 369 0 5 -4 11 -8 13 -4 2 -18 20 -31 41
-15 25 -29 36 -40 33 -16 -5 -70 -13 -126 -20 -40 -6 -65 -16 -65 -28 0 -5 16
-34 35 -64 19 -30 35 -58 35 -63 0 -5 3 -11 8 -13 10 -4 62 -85 62 -97 0 -5 4
-11 8 -13 4 -1 70 -101 146 -221 135 -214 137 -218 126 -252 -6 -19 -25 -46
-43 -61 -28 -23 -37 -26 -92 -22 -33 3 -67 8 -76 12 -14 6 -21 -5 -39 -61 -13
-37 -25 -73 -27 -80 -7 -19 52 -43 120 -50 125 -11 258 48 312 140 28 49 75
220 180 652 42 171 78 318 81 328 6 20 11 20 -113 0z"/>
<path d="M4015 8616 c-90 -28 -163 -86 -198 -157 l-26 -50 -17 33 c-9 18 -18
35 -20 37 -5 6 -184 -82 -184 -91 0 -4 20 -49 45 -100 80 -166 221 -460 273
-573 69 -149 121 -245 133 -245 20 0 179 85 179 96 0 6 -28 67 -61 135 -91
183 -92 164 15 164 80 0 98 4 150 29 73 35 145 107 182 183 38 76 40 198 6
287 -45 116 -132 209 -228 246 -63 23 -185 26 -249 6z m130 -187 c76 -21 155
-133 155 -221 0 -37 -25 -96 -53 -126 -80 -86 -222 -80 -291 11 -78 103 -71
235 16 300 60 44 107 54 173 36z"/>
<path d="M7028 8331 c-74 -29 -118 -64 -173 -136 -56 -73 -70 -119 -70 -230 0
-89 3 -106 28 -156 147 -301 554 -351 719 -89 54 85 63 116 63 215 -1 103 -18
153 -85 241 -44 59 -150 133 -224 158 -68 22 -197 21 -258 -3z m252 -194 c106
-56 139 -161 83 -267 -70 -133 -207 -167 -309 -77 -88 76 -90 189 -7 286 67
79 153 100 233 58z"/>
<path d="M3394 7909 c-82 -67 -150 -124 -152 -128 -3 -8 97 -131 107 -131 8 0
159 120 256 204 l49 43 -54 67 c-29 36 -54 66 -55 66 -1 0 -69 -54 -151 -121z"/>
<path d="M2900 7843 c-39 -60 -64 -145 -57 -190 l6 -34 -37 32 -36 32 -63 -69
c-34 -38 -63 -74 -63 -81 0 -17 35 -51 182 -175 69 -59 132 -113 140 -120 7
-7 56 -49 108 -92 52 -44 103 -87 113 -95 18 -15 23 -12 74 44 31 33 62 70 71
83 17 26 35 6 -186 196 -68 59 -120 112 -132 136 -36 70 -24 136 39 219 l25
34 -39 34 c-22 18 -57 47 -77 64 l-38 30 -30 -48z"/>
<path d="M7635 7634 c-154 -118 -288 -223 -299 -233 -18 -18 -18 -20 5 -52 13
-18 31 -40 40 -49 8 -9 22 -25 30 -36 38 -51 40 -51 134 24 225 178 296 220
357 208 79 -15 151 -93 151 -165 0 -55 -32 -100 -111 -160 -37 -28 -74 -57
-82 -64 -8 -8 -42 -34 -75 -58 -100 -74 -125 -99 -116 -118 14 -24 112 -146
121 -149 5 -2 55 33 112 77 57 45 108 84 113 89 164 126 227 193 251 265 30
91 -1 215 -75 300 -39 43 -132 102 -179 112 l-34 7 32 27 32 26 -57 75 c-32
41 -60 78 -64 82 -4 4 -132 -89 -286 -208z"/>
<path d="M2538 7216 c-177 -63 -290 -240 -275 -433 9 -116 75 -223 177 -288
211 -133 461 -47 580 199 34 71 42 97 47 168 4 54 1 97 -6 120 l-12 35 -77
-21 -77 -22 -2 -69 c-3 -151 -97 -265 -218 -265 -25 0 -45 2 -45 4 0 2 58 118
129 257 112 219 127 256 115 267 -8 8 -46 24 -84 38 -79 27 -190 32 -252 10z
m135 -183 c3 -5 -32 -82 -78 -173 l-83 -165 -31 34 c-36 38 -55 99 -45 144 15
71 62 135 114 156 30 12 117 14 123 4z"/>
<path d="M8153 6868 c-35 -17 -63 -36 -63 -42 1 -20 148 -340 158 -344 20 -6
142 56 142 74 0 9 -18 60 -41 113 -78 183 -102 231 -118 230 -9 0 -44 -14 -78
-31z"/>
<path d="M8690 6424 c-129 -36 -302 -82 -385 -104 -82 -22 -185 -49 -228 -61
l-79 -22 5 -31 c3 -17 13 -64 23 -103 17 -66 21 -73 44 -73 14 0 117 24 230
54 522 136 686 180 693 186 11 10 -43 220 -57 219 -6 -1 -117 -30 -246 -65z"/>
<path d="M2227 6397 c-83 -32 -159 -102 -198 -183 -28 -56 -34 -81 -37 -154
-4 -86 1 -107 46 -192 2 -4 -16 -6 -39 -5 -37 2 -42 -1 -45 -23 -2 -14 -9 -56
-15 -94 -9 -55 -9 -70 2 -77 11 -7 40 -13 164 -34 53 -9 476 -86 610 -110 222
-41 223 -41 229 -14 20 93 36 183 32 186 -4 4 -313 63 -331 63 -5 0 7 17 27
38 21 20 50 64 65 97 23 50 28 74 28 140 0 100 -17 159 -64 221 -79 105 -181
155 -331 161 -70 3 -95 -1 -143 -20z m249 -227 c68 -34 99 -86 99 -170 0 -55
-5 -73 -27 -107 -81 -122 -298 -106 -365 27 -51 99 -10 213 92 262 51 24 136
19 201 -12z"/>
<path d="M8110 5908 l0 -114 104 -39 103 -39 6 -85 c3 -47 6 -151 6 -231 l2
-146 -43 -18 c-24 -11 -72 -32 -107 -47 l-64 -29 7 -112 c4 -62 8 -114 10
-115 2 -2 52 20 112 48 60 27 127 59 149 69 22 10 102 48 178 84 77 36 140 66
142 66 3 0 189 88 323 153 l63 30 -3 114 -3 115 -60 24 c-33 14 -78 33 -100
43 -22 10 -76 33 -120 51 -44 18 -102 42 -130 55 -83 37 -539 228 -557 233
-16 4 -18 -6 -18 -110z m584 -342 c97 -38 173 -73 169 -76 -4 -4 -53 -27 -108
-50 -55 -23 -133 -58 -173 -76 -40 -19 -75 -34 -77 -34 -3 0 -5 70 -5 156 0
86 4 154 8 152 5 -1 88 -34 186 -72z"/>
<path d="M2230 5465 c-159 -45 -264 -175 -277 -344 -15 -194 75 -369 225 -439
50 -24 69 -27 162 -27 93 0 112 3 162 27 143 67 233 219 227 382 -7 171 -98
320 -234 382 -69 32 -188 40 -265 19z m185 -216 c76 -21 135 -107 135 -194 -1
-137 -181 -230 -318 -164 -132 64 -137 269 -7 337 61 31 126 39 190 21z"/>
<path d="M8387 4903 c-17 -33 -90 -351 -84 -366 5 -13 115 -47 150 -47 10 0
25 48 50 163 53 237 55 217 -28 238 -81 21 -82 22 -88 12z"/>
<path d="M2670 4608 c-63 -21 -119 -41 -125 -42 -5 -2 -17 -6 -25 -9 -8 -4
-152 -54 -320 -111 -341 -116 -373 -128 -379 -132 -1 -1 11 -46 29 -98 25 -75
36 -96 50 -96 10 0 218 68 462 151 244 83 458 155 476 161 32 9 34 12 28 43
-9 48 -59 168 -71 171 -5 1 -62 -16 -125 -38z"/>
<path d="M7993 4508 c-6 -7 -30 -49 -53 -92 l-43 -79 21 -18 c22 -17 128 -77
367 -208 72 -39 128 -71 125 -72 -3 0 -174 -33 -380 -72 l-374 -72 -44 -78
c-24 -44 -40 -83 -36 -87 8 -8 154 -90 324 -183 30 -16 152 -83 272 -148 133
-74 227 -119 245 -119 25 0 32 9 72 86 24 47 42 87 40 88 -10 9 -149 88 -294
168 -49 27 -97 53 -105 58 -8 4 -37 21 -65 36 l-50 28 310 57 c421 79 425 79
451 103 22 20 90 144 83 150 -15 10 -131 76 -135 76 -4 0 -323 174 -434 237
-175 99 -288 152 -297 141z"/>
<path d="M2805 4270 c-9 -14 -44 -123 -45 -137 0 -6 20 -21 45 -33 133 -65
192 -256 107 -352 -14 -17 -21 -8 -94 115 -43 72 -83 139 -88 147 -5 8 -32 53
-59 100 -28 47 -55 91 -60 99 -13 20 -100 -30 -155 -89 -112 -120 -134 -276
-60 -428 39 -80 124 -166 202 -204 60 -30 75 -33 157 -33 80 0 97 4 157 32
224 105 291 340 165 578 -42 78 -122 159 -189 190 -58 27 -74 30 -83 15z
m-119 -436 c47 -80 87 -153 88 -162 2 -27 -92 -29 -143 -2 -99 50 -133 198
-65 280 14 16 27 30 29 30 2 0 43 -66 91 -146z"/>
<path d="M7452 3559 c-113 -22 -282 -158 -337 -272 -32 -67 -46 -157 -24 -157
8 -1 46 -3 84 -6 l71 -6 13 51 c18 72 76 142 146 176 46 23 65 27 111 23 30
-3 62 -11 70 -20 13 -13 8 -20 -43 -65 -32 -28 -125 -116 -208 -197 l-150
-146 60 -56 c87 -84 148 -109 260 -109 82 0 97 3 159 34 87 43 164 120 207
208 32 63 34 74 34 168 -1 90 -3 105 -29 154 -33 65 -126 160 -181 189 -75 37
-158 48 -243 31z m256 -346 c21 -55 23 -73 12 -113 -22 -80 -109 -150 -187
-150 -37 0 -108 28 -108 42 0 8 257 248 266 248 4 0 11 -12 17 -27z"/>
<path d="M3410 3528 c-14 -7 -43 -19 -65 -29 -516 -220 -605 -260 -623 -273
-10 -7 1 -23 45 -68 32 -33 65 -64 75 -69 18 -10 58 2 151 45 134 61 360 156
363 153 2 -2 -41 -116 -95 -253 l-99 -249 71 -72 c39 -40 77 -73 84 -73 6 0
39 71 73 158 33 86 65 166 69 177 5 11 28 70 51 130 23 61 48 126 55 145 8 19
22 59 32 88 l18 54 -77 74 c-43 41 -83 74 -90 73 -7 0 -24 -5 -38 -11z"/>
<path d="M6960 3185 c-25 -14 -68 -37 -96 -52 l-52 -26 -17 -106 c-9 -58 -18
-113 -20 -121 -2 -8 -4 -25 -4 -38 -1 -22 -7 -20 -127 43 l-127 67 -103 -53
c-57 -30 -104 -58 -104 -62 0 -5 93 -54 208 -109 114 -55 208 -101 209 -102 1
-1 -15 -102 -35 -224 -24 -136 -34 -222 -28 -222 6 0 52 21 102 47 l92 47 17
100 c9 56 18 108 20 116 2 8 4 25 4 37 1 22 8 20 126 -39 l124 -62 106 54
c101 53 104 56 83 70 -12 8 -105 55 -207 103 -102 49 -187 89 -187 90 -1 1 7
49 17 107 11 58 22 121 25 140 3 19 12 70 20 114 22 122 23 120 -46 81z"/>
<path d="M3798 3114 c-22 -7 -22 -12 -2 -99 l17 -71 71 0 c54 0 82 -6 116 -23
53 -27 106 -75 127 -115 15 -29 23 -109 11 -121 -3 -3 -25 4 -48 17 -197 108
-436 228 -454 228 -11 0 -28 -23 -49 -67 -29 -62 -32 -77 -32 -163 0 -83 3
-102 27 -151 74 -149 254 -251 418 -235 129 12 259 107 318 233 23 50 27 71
27 153 0 85 -3 101 -29 155 -40 82 -123 161 -227 215 -80 42 -88 44 -179 46
-52 2 -103 0 -112 -2z m106 -458 c193 -102 187 -97 145 -129 -94 -72 -237 -39
-288 66 -27 55 -28 137 -3 137 2 0 68 -34 146 -74z"/>
<path d="M5943 2779 c-34 -12 -76 -34 -94 -49 l-33 -27 27 -44 c15 -24 36 -55
47 -67 l20 -24 27 20 c73 51 141 33 167 -45 36 -112 77 -296 67 -303 -6 -3
-44 -14 -86 -25 -68 -17 -75 -21 -75 -43 0 -18 27 -130 34 -139 0 -1 37 7 81
18 102 24 102 24 110 -8 27 -113 36 -133 61 -133 31 0 165 37 177 49 5 5 0 40
-12 86 -12 42 -19 80 -16 85 3 4 22 11 43 15 63 10 65 14 47 87 -24 93 -23 93
-84 78 -29 -7 -53 -11 -55 -9 -1 2 -21 76 -44 164 -51 193 -81 258 -140 300
-39 27 -53 30 -125 33 -63 1 -97 -3 -144 -19z"/>
<path d="M4710 2749 c-60 -12 -155 -59 -206 -103 -163 -139 -206 -441 -90
-625 40 -62 108 -126 179 -165 78 -44 170 -69 357 -99 14 -3 85 -15 158 -27
73 -13 134 -21 136 -19 3 3 49 255 63 344 3 23 53 319 78 465 2 14 7 43 10 65
3 22 8 52 11 66 5 26 4 27 -88 44 -51 9 -104 19 -118 21 -45 7 -85 14 -110 19
-123 24 -295 31 -380 14z m326 -195 c65 -11 108 -23 111 -31 6 -15 -86 -574
-96 -586 -11 -11 -262 38 -313 63 -54 25 -122 95 -146 148 -10 24 -16 64 -15
112 1 135 59 235 165 285 61 29 154 31 294 9z"/>
<path d="M5577 2415 c-81 -6 -150 -15 -153 -18 -12 -11 7 -158 21 -163 13 -6
373 21 379 27 2 2 1 41 -2 87 l-5 82 -46 -1 c-25 -1 -112 -7 -194 -14z"/>
</g>
</svg>



);

export default CircularText;



export const TwitterIcon : FunctionComponent<TwitterIconProps> = ({ className, ...rest }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 209"
      {...rest}
      className={`w-full h-auto ${className}`}
    >
      <path fill="none" d="M0 0h256v209H0z" />
      <path
        fill="#55acee"
        d="M256 25.45a105.04 105.04 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52 0 4.117.465 8.125 1.36 11.97-43.65-2.191-82.35-23.1-108.255-54.876-4.52 7.757-7.11 16.78-7.11 26.404 0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661 0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475-17.975 14.086-40.622 22.483-65.228 22.483-4.24 0-8.42-.249-12.529-.734 23.243 14.902 50.85 23.597 80.51 23.597 96.607 0 149.434-80.031 149.434-149.435 0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45"
      />
    </svg>
  );
  // #0A66C2
export const LinkedInIcon:FunctionComponent<LinkedInIconProps> = ({ className, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 256 256"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
  <path fill="none" d="M0 0h256v256H0z" />
    <g fill="none">
      <rect width={256} height={256} fill="#fff" rx={60} />
      <rect width={256} height={256} fill="#0A66C2" rx={60} />
      <path
        fill="#fff"
        d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82 19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4ZM38 59.627c0 11.865 9.767 21.627 21.632 21.627 11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38 47.762 38 38 47.763 38 59.627Zm6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4Z"
      />
    </g>
  </svg>
  );


