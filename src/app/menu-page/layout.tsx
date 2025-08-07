import { MenuProvider } from "../../Components/Menu/context/MenuContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <div>
        <MenuProvider>
          {children}
        </MenuProvider>
      </div>
  );
}
