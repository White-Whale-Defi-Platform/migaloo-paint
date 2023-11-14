'use client'
import { FC, ReactNode } from "react"
import Navigation from "./navigation/Navigation"
import Footer from "./footer/Footer"
import Provider from "./provider/Provider"
import { ModalManager } from "@/components/modals"

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <Provider>
    <div className="flex flex-col items-center h-screen justify-between p-4">
      <Navigation />
      <main className="h-[80vh]">
        {children}
        <ModalManager />
      </main>
      <Footer />
    </div>
  </Provider>
)

export default Layout
