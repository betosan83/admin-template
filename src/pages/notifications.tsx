import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Notifications() {
  const data = useAppData()
  return (
    <Layout title="Notifications" 
       subtitle="Manage your notifications.">
      <h3>{data.theme}</h3>
    </Layout>
  )
}
