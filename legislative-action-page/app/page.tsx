import Header from './components/Header'
import ActionCards from './components/ActionCards'
import UserInfoForm from './components/UserInfoForm'
import { UserInfoProvider } from './contexts/UserInfoContext'

export default function Home() {
  return (
    <UserInfoProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <UserInfoForm />
          <main>
            <ActionCards />
          </main>
        </div>
      </div>
    </UserInfoProvider>
  )
}

