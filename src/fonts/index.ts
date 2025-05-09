import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    {
      path: '../fonts/InterRegular-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../fonts/InterItalic-Variable.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: "swap",
});

export const commitmono = localFont({
  src: [
    {
      path: '../fonts/CommitMono-Variable.woff2',
      weight: '200 700',
      style: 'normal',
    },
  ],
  variable: '--font-commitmono',
  display: "swap",
});
