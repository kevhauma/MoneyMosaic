import { Layout } from '@/layouts';

export const metadata = {
  title: 'Net Worth',
  description: 'Graphs of your net worth',
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
