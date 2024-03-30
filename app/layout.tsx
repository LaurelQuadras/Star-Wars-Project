import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "./styles/styles.scss";
import StoreProvider from "./StoreProvider";

const latoFont = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Star Wars Project",
  description:
    "This application displays a list of planets from star wars universe in Planets page. User is able to sort it based on diameter or population column. User is also able to click on a record to see more detail information. Finally, User is able to save / remove some planets as favorites and view them in Favorites page, where user can also remove planets from favorites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={latoFont.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
