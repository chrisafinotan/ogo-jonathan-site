
type Props  = {
    params: { projectId: string }
  }
  
export default function AdminProjectPage({ params: { projectId } }: Props) {
    return (
      <div>Admin Project Page for {projectId}</div>
    )
  }
  