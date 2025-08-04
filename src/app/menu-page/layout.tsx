const MenuLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col w-full h-full">
      {children}
    </div>
  )
}

export default MenuLayout
