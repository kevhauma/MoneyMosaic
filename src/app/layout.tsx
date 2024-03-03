import { Layout } from '@/layouts';

export const metadata = {
  title: 'Money Mosaic',
  description: 'A mosaic of graphs for your bank transaction data',
};
type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
