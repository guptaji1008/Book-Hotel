import ResetPassword from "@/components/ResetPassword"

const page = ({ params }: {params: { token: string }}) => {
  return <ResetPassword token={params?.token}/>
}

export default page
