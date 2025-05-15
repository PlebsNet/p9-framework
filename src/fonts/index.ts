import localFont from 'next/font/local';

export const inter = localFont({
  src: [
    {
      path: './InterRegular-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './InterItalic-Variable.woff2',
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
      path: './CommitMono-Variable.woff2',
      weight: '200 700',
      style: 'normal',
    },
  ],
  variable: '--font-commitmono',
  display: "swap",
});
