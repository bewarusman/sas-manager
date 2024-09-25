'use server';

import InteractiveDashboard from "./layout";

export default async function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InteractiveDashboard>
        {children}
      </InteractiveDashboard>
    </>
  )
}
