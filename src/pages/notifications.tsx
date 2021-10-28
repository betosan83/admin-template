import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Notifications() {
  const {toggleTheme} = useAppData()
  return (
    <Layout title="Notifications" 
       subtitle="Manage your notifications.">
      <button onClick={toggleTheme}>Click</button>
    </Layout>
  )
}
