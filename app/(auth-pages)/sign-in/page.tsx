import { signInAction } from "@/app/actions"
import { SubmitButton } from "@/components/submit-button"

const page = () => {
  return (
    <form>
        <SubmitButton formAction={signInAction} >email</SubmitButton>
    </form>
  )
}

export default page
